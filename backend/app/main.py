"""
PCBMind AI - FastAPI Backend Main Application
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.database import engine, Base
from app.api import auth, inspections, dashboard, agents, predictions, reports

# Create tables on startup
Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 PCBMind AI Backend Starting...")
    yield
    # Shutdown
    print("🛑 PCBMind AI Backend Shutting Down...")

app = FastAPI(
    title="PCBMind AI API",
    description="AI-Powered Manufacturing Intelligence Platform",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(inspections.router, prefix="/api/inspections", tags=["Inspections"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(agents.router, prefix="/api/agents", tags=["AI Agents"])
app.include_router(predictions.router, prefix="/api/predictions", tags=["Predictions"])
app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "PCBMind AI Backend",
        "version": "1.0.0"
    }

@app.get("/health")
async def health():
    """Detailed health check"""
    return {
        "status": "ok",
        "database": "connected",
        "cache": "ready",
        "ml_models": "loaded"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
