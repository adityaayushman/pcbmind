# PCBMind AI

**From Defect Detection to Defect Prediction.**

A production-grade AI SaaS platform for Industry 4.0 Manufacturing Intelligence, designed for PCB manufacturers, electronics startups, hardware labs, EMS providers, and industrial quality assurance teams.

## 🎯 Vision

PCBMind AI combines:
- **Computer Vision** - Advanced defect detection
- **Deep Learning** - YOLOv8-based component recognition
- **Generative AI** - Intelligent explanations & copilot assistance
- **Predictive Analytics** - Future failure forecasting
- **Multi-Agent AI** - Specialized agents for inspection, diagnosis, prediction
- **Manufacturing Intelligence** - Industry 4.0 digital twins
- **Explainable AI** - Transparency in AI decisions

## 📊 Core Capabilities

1. **Smart PCB Inspection** - Upload images, get instant AI analysis
2. **Defect Detection** - Missing components, misplacement, polarity, solder defects
3. **Root Cause Analysis** - AI-generated explanations with probability scores
4. **Predictive Failure Engine** - Forecast defects before they happen
5. **Manufacturing Copilot** - Ask questions, get manufacturing insights
6. **Digital Twin Dashboard** - Interactive PCB visualization with component health
7. **Multi-Agent System** - Inspector, Diagnosis, Prediction, Reporting agents
8. **Enterprise Reporting** - PDF/JSON export with detailed analytics

## 🏗️ Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 18 (Stable)
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts (visualizations)

### Backend
- FastAPI (Python)
- PostgreSQL
- Supabase (Auth + Storage)
- SQLAlchemy ORM
- Pydantic

### AI/ML
- YOLOv8 (object detection)
- OpenCV (image processing)
- PyTorch
- Scikit-learn (predictions)
- LangChain (LLM integration)

### Deployment
- Vercel (Frontend)
- Railway (Backend)

## 📁 Project Structure

```
pcb/
├── frontend/              # Next.js 15 application
│   ├── app/              # App router pages
│   ├── components/       # Reusable React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities & API clients
│   ├── styles/           # Global styles
│   └── public/           # Static assets
├── backend/              # FastAPI application
│   ├── app/              # Main FastAPI app
│   ├── api/              # API route handlers
│   ├── models/           # Database models
│   ├── schemas/          # Pydantic schemas
│   ├── services/         # Business logic
│   ├── agents/           # Multi-agent AI system
│   ├── ml/               # ML pipelines & models
│   └── core/             # Configuration & utilities
├── shared/               # Shared types & constants
└── docs/                 # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
# Runs on http://localhost:8000
```

## 📋 Features Roadmap

- [x] Project structure
- [ ] Authentication (Login, Register, Email Verification)
- [ ] Landing page with hero section
- [ ] Dashboard with KPIs
- [ ] PCB image upload workflow
- [ ] Defect detection engine
- [ ] Root cause analysis AI
- [ ] Manufacturing copilot
- [ ] Predictive failure engine
- [ ] Digital twin visualization
- [ ] Multi-agent AI system
- [ ] Explainable AI heatmaps
- [ ] PDF reporting system
- [ ] Admin panel
- [ ] Database & API

## 🎨 Design System

- **Theme**: Industrial AI + Cyber Manufacturing
- **Mode**: Dark Mode Premium SaaS
- **Style**: Glassmorphism with futuristic animations
- **Colors**: Electric Blue, Cyan, White, Dark Slate
- **Inspiration**: Siemens, Tesla Manufacturing, Palantir Foundry

## 📚 Documentation

- [Frontend Documentation](docs/FRONTEND.md)
- [Backend Documentation](docs/BACKEND.md)
- [Database Schema](docs/DATABASE.md)
- [API Documentation](docs/API.md)

## 🤝 Contributing

This is an internal development project. Please follow the contribution guidelines in CONTRIBUTING.md.

## 📞 Support

For issues and questions, please contact the development team

## 📄 License

Proprietary - All rights reserved.
