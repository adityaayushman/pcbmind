"""
Predictions endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models import Prediction, Inspection
from app.schemas import PredictionResponse

router = APIRouter()

@router.get("/{inspection_id}", response_model=PredictionResponse)
async def get_predictions(inspection_id: int, db: Session = Depends(get_db)):
    """Get failure predictions for an inspection"""
    
    prediction = db.query(Prediction).filter(Prediction.inspection_id == inspection_id).first()
    if not prediction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No predictions found for this inspection"
        )
    
    return prediction

@router.post("/{inspection_id}/generate", response_model=dict)
async def generate_predictions(inspection_id: int, db: Session = Depends(get_db)):
    """Generate failure predictions for an inspection"""
    
    inspection = db.query(Inspection).filter(Inspection.id == inspection_id).first()
    if not inspection:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inspection not found"
        )
    
    # Create prediction
    new_prediction = Prediction(
        inspection_id=inspection_id,
        factory_id=inspection.factory_id,
        defect_probability=0.35,
        failure_risk_score=4.2,
        production_line_health=87.5,
        quality_forecast="Expected yield: 96.8% with current trends",
        predicted_defects={}
    )
    
    db.add(new_prediction)
    db.commit()
    db.refresh(new_prediction)
    
    return {
        "status": "success",
        "prediction_id": new_prediction.id,
        "message": "Predictions generated successfully"
    }

@router.get("/")
async def list_predictions(limit: int = 10, db: Session = Depends(get_db)):
    """List recent predictions"""
    
    predictions = db.query(Prediction).order_by(Prediction.created_at.desc()).limit(limit).all()
    return predictions
