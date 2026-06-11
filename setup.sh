#!/bin/bash

# PCBMind AI - Setup Script

set -e

echo "🚀 PCBMind AI - Setup Script"
echo "=============================="

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python 3.10+"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker not found. Some features require Docker."
fi

echo "✅ Prerequisites check passed"

# Setup backend
echo ""
echo "📦 Setting up Backend..."

cd backend

# Create virtual environment
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "✅ Virtual environment created"
fi

# Activate venv
source venv/bin/activate

# Install dependencies
pip install -q -r requirements.txt
echo "✅ Backend dependencies installed"

# Create .env if not exists
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "⚠️  Created .env file - Please configure it"
fi

cd ..

# Setup frontend
echo ""
echo "📦 Setting up Frontend..."

cd frontend

# Install dependencies
npm install -q
echo "✅ Frontend dependencies installed"

# Create .env.local if not exists
if [ ! -f ".env.local" ]; then
    cp .env.local.example .env.local
    echo "⚠️  Created .env.local file"
fi

cd ..

# Database setup (optional)
echo ""
echo "🗄️  Database Setup"
read -p "Do you want to set up PostgreSQL? (y/n) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v createdb &> /dev/null; then
        echo "Creating database 'pcbmind'..."
        createdb pcbmind 2>/dev/null || echo "Database might already exist"
        echo "✅ Database created"
    else
        echo "⚠️  PostgreSQL client not found. Install it or use Docker Compose."
    fi
fi

# Docker setup (optional)
echo ""
echo "🐳 Docker Setup (Optional)"
read -p "Do you want to use Docker Compose for development? (y/n) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v docker-compose &> /dev/null; then
        echo "Building Docker images..."
        docker-compose build
        echo "✅ Docker images built"
        echo ""
        echo "To start services, run: docker-compose up"
    else
        echo "❌ Docker Compose not found"
    fi
fi

# Summary
echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo "=========================================="
echo ""
echo "📚 Quick Start Commands:"
echo ""
echo "Backend (Terminal 1):"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  python -m uvicorn app.main:app --reload"
echo ""
echo "Frontend (Terminal 2):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Or use Docker:"
echo "  docker-compose up"
echo ""
echo "🌐 Access the Application:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8000"
echo "  API Docs: http://localhost:8000/docs"
echo "  PgAdmin:  http://localhost:5050 (if using docker-compose)"
echo ""
echo "📖 Documentation:"
echo "  - docs/QUICKSTART.md"
echo "  - docs/BACKEND.md"
echo "  - docs/FRONTEND.md"
echo "  - docs/API.md"
echo ""
echo "Happy coding! 🎉"
