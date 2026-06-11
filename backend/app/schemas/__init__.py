"""
Pydantic schemas for API validation
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

# Authentication Schemas
class UserRole(str, Enum):
    ADMIN = "admin"
    MANAGER = "manager"
    ENGINEER = "engineer"
    OPERATOR = "operator"

class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: UserRole
    is_active: bool
    is_verified: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Factory Schemas
class FactoryCreate(BaseModel):
    name: str
    location: str
    description: Optional[str] = None
    industry: str

class FactoryResponse(BaseModel):
    id: int
    name: str
    location: str
    description: Optional[str]
    industry: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Inspection Schemas
class DefectData(BaseModel):
    defect_type: str
    component_type: str
    component_name: str
    x: float
    y: float
    width: float
    height: float
    confidence: float
    severity: str
    possible_cause: Optional[str] = None
    cause_probability: Optional[float] = None
    recommended_action: Optional[str] = None

class InspectionCreate(BaseModel):
    pcb_template_id: int
    production_line_id: Optional[int] = None

class InspectionResponse(BaseModel):
    id: int
    image_url: str
    annotated_image_url: Optional[str]
    total_components: int
    defects_found: int
    quality_score: float
    status: str
    created_at: datetime
    defects: List[DefectData] = []
    
    class Config:
        from_attributes = True

class InspectionDetailResponse(InspectionResponse):
    predictions: List[dict] = []

# Dashboard Schemas
class DashboardMetrics(BaseModel):
    total_inspections: int
    total_defects: int
    average_quality_score: float
    predicted_failures: int
    production_yield: float
    critical_alerts: int

class DefectTrend(BaseModel):
    date: str
    count: int
    category: str

class DashboardResponse(BaseModel):
    metrics: DashboardMetrics
    weekly_defects: List[DefectTrend]
    defect_categories: dict
    manufacturing_performance: dict

# Prediction Schemas
class PredictionResponse(BaseModel):
    id: int
    defect_probability: float
    failure_risk_score: float
    production_line_health: float
    quality_forecast: str
    predicted_defects: dict
    created_at: datetime
    
    class Config:
        from_attributes = True

# Report Schemas
class ReportRequest(BaseModel):
    inspection_id: int
    report_type: str  # inspection, quality, failure_analysis

class ReportResponse(BaseModel):
    id: int
    report_type: str
    file_url: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Agent Schemas
class AgentResponse(BaseModel):
    id: int
    agent_name: str
    status: str
    execution_time: float
    created_at: datetime
    
    class Config:
        from_attributes = True

# PCB Template Schemas
class PCBTemplateCreate(BaseModel):
    name: str
    description: str
    components: List[dict]

class PCBTemplateResponse(BaseModel):
    id: int
    name: str
    description: str
    components: List[dict]
    created_at: datetime
    
    class Config:
        from_attributes = True
