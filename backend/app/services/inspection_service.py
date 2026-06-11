"""
Inspection service - orchestrates detection and analysis
"""

from sqlalchemy.orm import Session
from datetime import datetime
import os

from app.models import Inspection, Defect, Agent
from app.ml.defect_detection import DefectDetectionEngine, DefectAnalyzer

class InspectionService:
    """Service to handle PCB inspections"""
    
    def __init__(self):
        self.detector = DefectDetectionEngine()
        self.analyzer = DefectAnalyzer()
    
    async def run_inspection(self, inspection_data: dict, db: Session) -> dict:
        """Run complete inspection pipeline"""
        
        image_path = inspection_data.get("image_path")
        user_id = inspection_data.get("user_id", 1)
        factory_id = inspection_data.get("factory_id", 1)
        production_line_id = inspection_data.get("production_line_id")
        pcb_template_id = inspection_data.get("pcb_template_id")
        
        # Create inspection record
        inspection = Inspection(
            user_id=user_id,
            factory_id=factory_id,
            production_line_id=production_line_id,
            pcb_template_id=pcb_template_id,
            image_url=image_path,
            status="processing"
        )
        
        db.add(inspection)
        db.commit()
        db.refresh(inspection)
        
        try:
            # Step 1: Component Detection (Inspector Agent)
            inspector_agent = await self._run_inspector_agent(inspection, image_path, db)
            
            # Step 2: Defect Detection
            defect_data = await self.detector.detect_defects(image_path)
            
            # Step 3: Root Cause Analysis (Diagnosis Agent)
            diagnosis_agent = await self._run_diagnosis_agent(inspection, defect_data, db)
            
            # Step 4: Store defects
            defects_found = 0
            quality_score = 100.0
            
            for defect in defect_data:
                # Analyze each defect
                analysis = await self.analyzer.analyze_defect(defect)
                
                # Create defect record
                db_defect = Defect(
                    inspection_id=inspection.id,
                    defect_type=defect.get("defect_type"),
                    component_type=defect.get("component_type"),
                    component_name=defect.get("component_name"),
                    x=defect.get("x", 0),
                    y=defect.get("y", 0),
                    width=defect.get("width", 0),
                    height=defect.get("height", 0),
                    confidence=defect.get("confidence", 0),
                    severity=defect.get("severity", "low"),
                    possible_cause=analysis.get("possible_cause"),
                    cause_probability=analysis.get("cause_probability"),
                    recommended_action=analysis.get("recommended_action")
                )
                
                db.add(db_defect)
                defects_found += 1
                
                # Adjust quality score based on severity
                severity_impact = {
                    "critical": -25,
                    "high": -15,
                    "medium": -8,
                    "low": -3
                }
                quality_score += severity_impact.get(defect.get("severity", "low"), 0)
            
            # Step 5: Prediction Agent
            prediction_agent = await self._run_prediction_agent(inspection, defect_data, db)
            
            # Step 6: Update inspection
            inspection.defects_found = defects_found
            inspection.quality_score = max(0, quality_score)
            inspection.status = "completed"
            
            db.commit()
            db.refresh(inspection)
            
            return {
                "id": inspection.id,
                "image_url": inspection.image_url,
                "annotated_image_url": inspection.annotated_image_url,
                "total_components": len(defect_data) or 45,
                "defects_found": defects_found,
                "quality_score": inspection.quality_score,
                "status": "completed",
                "created_at": inspection.created_at,
                "defects": defect_data
            }
        
        except Exception as e:
            inspection.status = "failed"
            db.commit()
            raise e
    
    async def _run_inspector_agent(self, inspection: Inspection, image_path: str, db: Session) -> Agent:
        """Run inspector agent - detects components"""
        
        import time
        start = time.time()
        
        detection_result = await self.detector.detect_components(image_path)
        
        execution_time = time.time() - start
        
        agent = Agent(
            inspection_id=inspection.id,
            agent_name="inspector",
            status="completed",
            input_data={"image_path": image_path},
            output_data=detection_result,
            execution_time=execution_time
        )
        
        db.add(agent)
        db.commit()
        
        return agent
    
    async def _run_diagnosis_agent(self, inspection: Inspection, defects: list, db: Session) -> Agent:
        """Run diagnosis agent - analyzes root causes"""
        
        import time
        start = time.time()
        
        diagnoses = []
        for defect in defects:
            analysis = await self.analyzer.analyze_defect(defect)
            diagnoses.append(analysis)
        
        execution_time = time.time() - start
        
        agent = Agent(
            inspection_id=inspection.id,
            agent_name="diagnosis",
            status="completed",
            input_data={"defects": defects},
            output_data={"diagnoses": diagnoses},
            execution_time=execution_time
        )
        
        db.add(agent)
        db.commit()
        
        return agent
    
    async def _run_prediction_agent(self, inspection: Inspection, defects: list, db: Session) -> Agent:
        """Run prediction agent - forecasts future failures"""
        
        import time
        start = time.time()
        
        # Mock prediction logic
        failure_probability = 0.35
        risk_score = len(defects) * 2.5
        
        execution_time = time.time() - start
        
        agent = Agent(
            inspection_id=inspection.id,
            agent_name="prediction",
            status="completed",
            input_data={"inspection_id": inspection.id},
            output_data={
                "failure_probability": failure_probability,
                "risk_score": risk_score
            },
            execution_time=execution_time
        )
        
        db.add(agent)
        db.commit()
        
        return agent
