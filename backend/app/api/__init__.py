"""
Reporting endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models import Report, Inspection
from app.schemas import ReportResponse, ReportRequest

router = APIRouter()

@router.post("/generate", response_model=ReportResponse)
async def generate_report(request: ReportRequest, db: Session = Depends(get_db)):
    """Generate inspection report"""
    
    inspection = db.query(Inspection).filter(Inspection.id == request.inspection_id).first()
    if not inspection:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inspection not found"
        )
    
    # Create report
    new_report = Report(
        inspection_id=request.inspection_id,
        report_type=request.report_type,
        file_url=f"reports/report_{request.inspection_id}_{request.report_type}.pdf",
        content={
            "inspection_id": request.inspection_id,
            "defects": inspection.defects_found,
            "quality_score": inspection.quality_score,
            "timestamp": inspection.created_at.isoformat()
        }
    )
    
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    
    return new_report

@router.get("/{report_id}", response_model=ReportResponse)
async def get_report(report_id: int, db: Session = Depends(get_db)):
    """Get report details"""
    
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )
    
    return report

@router.get("/")
async def list_reports(limit: int = 10, db: Session = Depends(get_db)):
    """List recent reports"""
    
    reports = db.query(Report).order_by(Report.created_at.desc()).limit(limit).all()
    return reports

@router.get("/inspection/{inspection_id}")
async def get_inspection_reports(inspection_id: int, db: Session = Depends(get_db)):
    """Get all reports for an inspection"""
    
    reports = db.query(Report).filter(Report.inspection_id == inspection_id).all()
    return reports
