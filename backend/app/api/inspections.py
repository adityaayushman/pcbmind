"""
PCB Inspection endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
import shutil
import os

from app.core.database import get_db
from app.models import Inspection, Defect
from app.schemas import InspectionResponse, InspectionDetailResponse
from app.services.inspection_service import InspectionService

router = APIRouter()

@router.post("/upload", response_model=dict)
async def upload_pcb_image(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Upload PCB image for inspection"""
    
    try:
        # Create uploads directory if not exists
        os.makedirs("uploads", exist_ok=True)
        
        # Save file
        file_path = f"uploads/{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        return {
            "success": True,
            "filename": file.filename,
            "path": file_path,
            "message": "File uploaded successfully"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/inspect", response_model=InspectionDetailResponse)
async def inspect_pcb(
    inspection_data: dict,
    db: Session = Depends(get_db)
):
    """Run defect detection on PCB image"""
    
    try:
        service = InspectionService()
        result = await service.run_inspection(inspection_data, db)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Inspection failed: {str(e)}"
        )

@router.get("/{inspection_id}", response_model=InspectionDetailResponse)
async def get_inspection(inspection_id: int, db: Session = Depends(get_db)):
    """Get inspection details"""
    
    inspection = db.query(Inspection).filter(Inspection.id == inspection_id).first()
    if not inspection:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inspection not found"
        )
    
    return inspection

@router.get("/")
async def list_inspections(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """List all inspections with pagination"""
    
    inspections = db.query(Inspection).offset(skip).limit(limit).all()
    total = db.query(Inspection).count()
    
    return {
        "items": inspections,
        "total": total,
        "skip": skip,
        "limit": limit
    }
