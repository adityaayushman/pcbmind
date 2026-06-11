"""
Authentication API endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta

from app.core.database import get_db
from app.core.security import hash_password, verify_password, create_access_token
from app.models import User
from app.schemas import UserRegister, UserLogin, UserResponse, TokenResponse

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(user: UserRegister, db: Session = Depends(get_db)):
    """Register a new user"""
    
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    new_user = User(
        email=user.email,
        full_name=user.full_name,
        hashed_password=hash_password(user.password),
        is_verified=False
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

@router.post("/login", response_model=TokenResponse)
async def login(user: UserLogin, db: Session = Depends(get_db)):
    """Login user and get access token"""
    
    # Find user
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    if not db_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )
    
    # Create token
    access_token = create_access_token(data={"sub": str(db_user.id)})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": db_user
    }

@router.get("/me", response_model=UserResponse)
async def get_current_user(db: Session = Depends(get_db)):
    """Get current user info"""
    # This would typically get user from token in real implementation
    return {"id": 1, "email": "test@example.com", "full_name": "Test User"}
