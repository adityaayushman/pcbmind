"""
Configuration settings for PCBMind AI Backend
"""

from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    """Application settings"""
    
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/pcbmind"
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Supabase
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    
    # OpenAI
    OPENAI_API_KEY: str = ""
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:3001"]
    
    # Environment
    DEBUG: bool = True
    LOG_LEVEL: str = "INFO"
    
    # File uploads
    MAX_UPLOAD_SIZE: int = 10 * 1024 * 1024  # 10MB
    UPLOAD_DIR: str = "uploads"
    
    class Config:
        env_file = ".env"

settings = Settings()
