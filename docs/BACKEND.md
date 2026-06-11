"""Backend documentation"""

# PCBMind AI - Backend Documentation

## Overview

FastAPI backend providing AI-powered PCB inspection, defect detection, and manufacturing intelligence APIs.

## Architecture

### Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application
│   ├── core/
│   │   ├── config.py        # Configuration
│   │   ├── database.py      # Database setup
│   │   ├── security.py      # Auth utilities
│   │   └── __init__.py
│   ├── models/              # SQLAlchemy models
│   ├── schemas/             # Pydantic schemas
│   ├── api/                 # API routes
│   │   ├── auth.py
│   │   ├── inspections.py
│   │   ├── dashboard.py
│   │   ├── agents.py
│   │   ├── predictions.py
│   │   ├── reports.py
│   │   └── __init__.py
│   ├── services/            # Business logic
│   │   ├── inspection_service.py
│   │   ├── copilot.py
│   │   └── __init__.py
│   ├── ml/                  # ML models
│   │   ├── defect_detection.py
│   │   └── __init__.py
│   └── agents/              # Multi-agent system
└── requirements.txt
```

## Database Models

### Core Tables

- **users**: User authentication and profiles
- **factories**: Manufacturing facilities
- **production_lines**: Production line configuration
- **pcb_templates**: Reference PCB layouts
- **inspections**: PCB inspection records
- **defects**: Detected defects with analysis
- **predictions**: Failure predictions
- **reports**: Generated reports
- **agents**: AI agent activity logs
- **activity_logs**: User action audit trail

## API Endpoints

### Authentication

```
POST /api/auth/register          - Register new user
POST /api/auth/login             - Login user
GET  /api/auth/me                - Get current user
```

### Inspections

```
POST /api/inspections/upload     - Upload PCB image
POST /api/inspections/inspect    - Run defect detection
GET  /api/inspections/{id}       - Get inspection details
GET  /api/inspections/           - List inspections
```

### Dashboard

```
GET  /api/dashboard/metrics      - Get KPI metrics
GET  /api/dashboard/trends       - Get defect trends
GET  /api/dashboard/overview     - Complete overview
```

### Agents

```
GET  /api/agents/{inspection_id} - Get agents for inspection
POST /api/agents/{inspection_id}/run - Trigger agents
GET  /api/agents/                - List recent activities
```

### Predictions

```
GET  /api/predictions/{inspection_id}     - Get predictions
POST /api/predictions/{inspection_id}/generate - Generate predictions
GET  /api/predictions/                    - List predictions
```

### Reports

```
POST /api/reports/generate       - Generate report
GET  /api/reports/{report_id}    - Get report
GET  /api/reports/               - List reports
GET  /api/reports/inspection/{id} - Get inspection reports
```

## AI/ML Components

### Defect Detection Engine

Uses YOLOv8 for component detection and defect identification:

```python
from app.ml.defect_detection import DefectDetectionEngine

detector = DefectDetectionEngine()
results = await detector.detect_components(image_path)
defects = await detector.detect_defects(image_path)
```

### Defect Analysis

Provides root cause analysis with probability scoring:

```python
from app.ml.defect_detection import DefectAnalyzer

analyzer = DefectAnalyzer()
analysis = await analyzer.analyze_defect(defect)
# Returns: possible_cause, probability, recommended_action
```

### Multi-Agent System

Four specialized AI agents:

1. **Inspector Agent** - Component detection
2. **Diagnosis Agent** - Root cause analysis
3. **Prediction Agent** - Failure forecasting
4. **Reporting Agent** - Report generation

### Manufacturing Copilot

LLM-based assistant for manufacturing questions:

```python
from app.services.copilot import ManufacturingCopilot

copilot = ManufacturingCopilot()
response = await copilot.ask("Why did this board fail?", context)
```

## Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Role-based access control
- Input validation with Pydantic

## Configuration

Environment variables in `.env`:

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/pcbmind
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

SUPABASE_URL=...
SUPABASE_KEY=...

OPENAI_API_KEY=...

CORS_ORIGINS=["http://localhost:3000"]
DEBUG=True
```

## Running Backend

```bash
# Install dependencies
pip install -r requirements.txt

# Run development server
python -m uvicorn app.main:app --reload

# Run production
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Database Migrations

Using Alembic for migrations:

```bash
# Create migration
alembic revision --autogenerate -m "Add new table"

# Apply migrations
alembic upgrade head

# Downgrade
alembic downgrade -1
```

## Testing

```bash
# Run tests
pytest

# With coverage
pytest --cov=app
```

## Deployment

### Railway

```bash
# Create railway.json
# Deploy to Railway
railway up
```

### Docker

```dockerfile
FROM python:3.10

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Performance Optimization

- Database connection pooling
- Async/await for I/O operations
- Caching with Redis
- Background tasks with Celery
- Model quantization for inference

## Monitoring

- Structured logging
- Error tracking with Sentry
- Performance monitoring
- Health check endpoints

## API Documentation

Auto-generated by FastAPI:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Future Enhancements

- [ ] WebSocket for real-time updates
- [ ] GraphQL API
- [ ] Advanced filtering and search
- [ ] Batch processing
- [ ] Model versioning
- [ ] A/B testing framework
