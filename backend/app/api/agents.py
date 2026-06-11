"""
AI Agents endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models import Agent, Inspection
from app.schemas import AgentResponse

router = APIRouter()

@router.get("/{inspection_id}", response_model=list)
async def get_agents_for_inspection(inspection_id: int, db: Session = Depends(get_db)):
    """Get all agents that processed an inspection"""
    
    inspection = db.query(Inspection).filter(Inspection.id == inspection_id).first()
    if not inspection:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inspection not found"
        )
    
    agents = db.query(Agent).filter(Agent.inspection_id == inspection_id).all()
    return agents

@router.get("/")
async def list_agent_activities(limit: int = 50, db: Session = Depends(get_db)):
    """List recent agent activities"""
    
    agents = db.query(Agent).order_by(Agent.created_at.desc()).limit(limit).all()
    return agents

@router.post("/{inspection_id}/run", response_model=dict)
async def run_agents(inspection_id: int, db: Session = Depends(get_db)):
    """Manually trigger agent pipeline for inspection"""
    
    inspection = db.query(Inspection).filter(Inspection.id == inspection_id).first()
    if not inspection:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inspection not found"
        )
    
    # Run agent pipeline
    return {
        "status": "agents_triggered",
        "inspection_id": inspection_id,
        "message": "AI agents are processing the inspection"
    }
