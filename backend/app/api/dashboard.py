"""
Dashboard endpoints
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.core.database import get_db
from app.models import Inspection, Defect
from app.schemas import DashboardResponse, DashboardMetrics

router = APIRouter()

@router.get("/metrics", response_model=DashboardMetrics)
async def get_dashboard_metrics(db: Session = Depends(get_db)):
    """Get dashboard KPI metrics"""
    
    total_inspections = db.query(Inspection).count()
    total_defects = db.query(Defect).count()
    
    # Calculate average quality score
    inspections = db.query(Inspection).all()
    avg_quality = sum(i.quality_score for i in inspections) / len(inspections) if inspections else 100.0
    
    # Predictions
    predicted_failures = 0  # Will be populated by prediction engine
    
    # Production yield
    production_yield = avg_quality
    
    # Critical alerts
    critical_alerts = db.query(Defect).filter(Defect.severity == "critical").count()
    
    return DashboardMetrics(
        total_inspections=total_inspections,
        total_defects=total_defects,
        average_quality_score=avg_quality,
        predicted_failures=predicted_failures,
        production_yield=production_yield,
        critical_alerts=critical_alerts
    )

@router.get("/trends", response_model=dict)
async def get_defect_trends(days: int = 7, db: Session = Depends(get_db)):
    """Get defect trends over time"""
    
    cutoff_date = datetime.utcnow() - timedelta(days=days)
    
    # Get defects from past N days
    recent_defects = db.query(Defect).filter(Defect.created_at >= cutoff_date).all()
    
    # Group by date and type
    trends = {}
    for defect in recent_defects:
        date_key = defect.created_at.strftime("%Y-%m-%d")
        if date_key not in trends:
            trends[date_key] = {}
        
        defect_type = defect.defect_type
        if defect_type not in trends[date_key]:
            trends[date_key][defect_type] = 0
        
        trends[date_key][defect_type] += 1
    
    return {"trends": trends}

@router.get("/overview", response_model=DashboardResponse)
async def get_dashboard_overview(db: Session = Depends(get_db)):
    """Get complete dashboard overview"""
    
    metrics = await get_dashboard_metrics(db)
    trends_data = await get_defect_trends(7, db)
    
    # Category breakdown
    defects_by_category = {}
    all_defects = db.query(Defect).all()
    for defect in all_defects:
        category = defect.defect_type
        defects_by_category[category] = defects_by_category.get(category, 0) + 1
    
    return DashboardResponse(
        metrics=metrics,
        weekly_defects=[],
        defect_categories=defects_by_category,
        manufacturing_performance={
            "efficiency": 95.5,
            "utilization": 87.2,
            "downtime": 2.1
        }
    )
