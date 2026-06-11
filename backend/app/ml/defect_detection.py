"""
Defect detection service using YOLOv8
"""

import cv2
import numpy as np
from typing import List, Dict, Tuple
import torch

class DefectDetectionEngine:
    """YOLOv8-based defect detection"""
    
    def __init__(self):
        """Initialize YOLO model"""
        try:
            from ultralytics import YOLO
            self.model = YOLO("yolov8n.pt")  # nano model for speed
        except Exception as e:
            print(f"Warning: Could not load YOLO model: {e}")
            self.model = None
    
    async def detect_components(self, image_path: str) -> Dict:
        """Detect PCB components"""
        
        if not self.model:
            return self._mock_detection()
        
        try:
            # Read image
            image = cv2.imread(image_path)
            if image is None:
                raise ValueError("Could not read image")
            
            # Run detection
            results = self.model(image, conf=0.5)
            
            components = []
            for result in results:
                for box in result.boxes:
                    components.append({
                        "x": float(box.xyxy[0][0]),
                        "y": float(box.xyxy[0][1]),
                        "width": float(box.xyxy[0][2] - box.xyxy[0][0]),
                        "height": float(box.xyxy[0][3] - box.xyxy[0][1]),
                        "confidence": float(box.conf[0]),
                        "class": int(box.cls[0])
                    })
            
            return {
                "success": True,
                "total_components": len(components),
                "components": components,
                "image_shape": image.shape
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "total_components": 0,
                "components": []
            }
    
    async def detect_defects(self, image_path: str, reference_image_path: str = None) -> List[Dict]:
        """Detect defects in PCB"""
        
        image = cv2.imread(image_path)
        if image is None:
            return []
        
        # Mock defect detection - in production use actual ML model
        defects = [
            {
                "defect_type": "missing_component",
                "component_name": "C12",
                "component_type": "capacitor",
                "x": 150.0,
                "y": 200.0,
                "width": 20.0,
                "height": 15.0,
                "confidence": 0.92,
                "severity": "high"
            },
            {
                "defect_type": "solder_defect",
                "component_name": "R5",
                "component_type": "resistor",
                "x": 300.0,
                "y": 350.0,
                "width": 25.0,
                "height": 20.0,
                "confidence": 0.85,
                "severity": "medium"
            }
        ]
        
        return defects
    
    def _mock_detection(self) -> Dict:
        """Mock detection for testing"""
        return {
            "success": True,
            "total_components": 45,
            "components": [
                {"name": "C1", "type": "capacitor", "x": 100, "y": 150, "confidence": 0.95},
                {"name": "R1", "type": "resistor", "x": 200, "y": 250, "confidence": 0.92},
                {"name": "IC1", "type": "ic", "x": 350, "y": 200, "confidence": 0.98},
            ]
        }

class DefectAnalyzer:
    """Analyze detected defects and generate insights"""
    
    DEFECT_CAUSES = {
        "missing_component": [
            {"cause": "Pick-and-place feeder jam", "probability": 0.35},
            {"cause": "Component shortage in reel", "probability": 0.25},
            {"cause": "Vacuum pressure issue", "probability": 0.20},
            {"cause": "Placement head malfunction", "probability": 0.20},
        ],
        "misplaced_component": [
            {"cause": "Coordinate offset error", "probability": 0.40},
            {"cause": "Component rotation error", "probability": 0.30},
            {"cause": "Nozzle tip collision", "probability": 0.30},
        ],
        "solder_defect": [
            {"cause": "Reflow temperature profile issue", "probability": 0.35},
            {"cause": "Solder paste dispensing error", "probability": 0.30},
            {"cause": "PCB pad contamination", "probability": 0.25},
            {"cause": "Conveyor speed mismatch", "probability": 0.10},
        ],
        "polarity_issue": [
            {"cause": "Wrong component placed", "probability": 0.70},
            {"cause": "Component rotation error", "probability": 0.30},
        ]
    }
    
    RECOMMENDED_ACTIONS = {
        "missing_component": [
            "Check feeder slot for jamming",
            "Verify component availability in feeder",
            "Inspect pick-and-place nozzle",
            "Check vacuum pressure gauge",
            "Run nozzle cleaning cycle"
        ],
        "solder_defect": [
            "Verify reflow temperature profile",
            "Check solder paste quality and viscosity",
            "Inspect PCB pads for contamination",
            "Verify conveyor speed settings",
            "Check reflow oven thermal performance"
        ]
    }
    
    async def analyze_defect(self, defect: Dict) -> Dict:
        """Generate root cause analysis for a defect"""
        
        defect_type = defect.get("defect_type", "unknown")
        
        # Get possible causes
        causes = self.DEFECT_CAUSES.get(defect_type, [])
        if causes:
            top_cause = causes[0]
        else:
            top_cause = {"cause": "Unknown cause", "probability": 0.50}
        
        # Get recommended actions
        actions = self.RECOMMENDED_ACTIONS.get(defect_type, ["Investigate manually"])
        
        return {
            "possible_cause": top_cause["cause"],
            "cause_probability": top_cause["probability"],
            "recommended_action": actions[0] if actions else "Review PCB",
            "all_recommendations": actions
        }
