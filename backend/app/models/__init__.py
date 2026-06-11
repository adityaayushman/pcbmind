"""
Database models for PCBMind AI
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, Text, JSON, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

from app.core.database import Base

class User(Base):
    """User model"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    role = Column(String, default="operator")  # admin, manager, engineer, operator
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    factory_id = Column(Integer, ForeignKey("factories.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    factory = relationship("Factory", back_populates="users")
    inspections = relationship("Inspection", back_populates="user")

class Factory(Base):
    """Factory model"""
    __tablename__ = "factories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    location = Column(String)
    description = Column(Text)
    industry = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    users = relationship("User", back_populates="factory")
    production_lines = relationship("ProductionLine", back_populates="factory")

class ProductionLine(Base):
    """Production Line model"""
    __tablename__ = "production_lines"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    factory_id = Column(Integer, ForeignKey("factories.id"))
    line_type = Column(String)  # SMT, THT, Wave, etc.
    status = Column(String, default="operational")
    capacity = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    factory = relationship("Factory", back_populates="production_lines")
    inspections = relationship("Inspection", back_populates="production_line")

class PCBTemplate(Base):
    """PCB Template model - reference PCBs"""
    __tablename__ = "pcb_templates"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(Text)
    factory_id = Column(Integer, ForeignKey("factories.id"))
    reference_image_url = Column(String)
    components = Column(JSON)  # Component list
    created_at = Column(DateTime, default=datetime.utcnow)

class Inspection(Base):
    """PCB Inspection model"""
    __tablename__ = "inspections"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    factory_id = Column(Integer, ForeignKey("factories.id"))
    production_line_id = Column(Integer, ForeignKey("production_lines.id"))
    pcb_template_id = Column(Integer, ForeignKey("pcb_templates.id"))
    
    image_url = Column(String)
    annotated_image_url = Column(String, nullable=True)
    
    # Results
    total_components = Column(Integer, default=0)
    defects_found = Column(Integer, default=0)
    quality_score = Column(Float, default=100.0)
    
    # Status
    status = Column(String, default="completed")  # pending, processing, completed, failed
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="inspections")
    defects = relationship("Defect", back_populates="inspection")
    predictions = relationship("Prediction", back_populates="inspection")

class Defect(Base):
    """Detected Defects model"""
    __tablename__ = "defects"
    
    id = Column(Integer, primary_key=True, index=True)
    inspection_id = Column(Integer, ForeignKey("inspections.id"))
    
    defect_type = Column(String)  # missing_component, misplaced, polarity, solder, orientation
    component_type = Column(String)  # resistor, capacitor, ic, led, etc.
    component_name = Column(String)  # C12, R5, etc.
    
    # Location and confidence
    x = Column(Float)  # Bounding box coordinates
    y = Column(Float)
    width = Column(Float)
    height = Column(Float)
    confidence = Column(Float)  # 0-1
    
    severity = Column(String, default="medium")  # low, medium, high, critical
    
    # Root cause analysis
    possible_cause = Column(Text, nullable=True)
    cause_probability = Column(Float, nullable=True)
    recommended_action = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    inspection = relationship("Inspection", back_populates="defects")

class Prediction(Base):
    """Predictive Analytics model"""
    __tablename__ = "predictions"
    
    id = Column(Integer, primary_key=True, index=True)
    inspection_id = Column(Integer, ForeignKey("inspections.id"))
    factory_id = Column(Integer, ForeignKey("factories.id"))
    
    # Prediction data
    defect_probability = Column(Float)
    failure_risk_score = Column(Float)
    production_line_health = Column(Float)
    quality_forecast = Column(Text)
    
    # Predicted issues
    predicted_defects = Column(JSON)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    inspection = relationship("Inspection", back_populates="predictions")

class Report(Base):
    """Report generation model"""
    __tablename__ = "reports"
    
    id = Column(Integer, primary_key=True, index=True)
    inspection_id = Column(Integer, ForeignKey("inspections.id"))
    
    report_type = Column(String)  # inspection, quality, failure_analysis
    file_url = Column(String)
    content = Column(JSON)
    
    created_at = Column(DateTime, default=datetime.utcnow)

class Agent(Base):
    """AI Agent Activity Tracking"""
    __tablename__ = "agents"
    
    id = Column(Integer, primary_key=True, index=True)
    inspection_id = Column(Integer, ForeignKey("inspections.id"))
    
    agent_name = Column(String)  # inspector, diagnosis, prediction, reporting
    status = Column(String)  # running, completed, failed
    
    input_data = Column(JSON)
    output_data = Column(JSON)
    
    execution_time = Column(Float)
    
    created_at = Column(DateTime, default=datetime.utcnow)

class ActivityLog(Base):
    """Activity log for auditing"""
    __tablename__ = "activity_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    action = Column(String)
    resource = Column(String)
    details = Column(JSON)
    
    created_at = Column(DateTime, default=datetime.utcnow)
