"""Setup and quick start guide"""

# PCBMind AI - Quick Start Guide

## Installation (5 minutes)

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 13+
- Git

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env with your settings
# DATABASE_URL=postgresql://user:password@localhost:5432/pcbmind
# OPENAI_API_KEY=sk-...
```

### Database Setup

```bash
# Create database
createdb pcbmind

# Apply migrations (if using Alembic)
alembic upgrade head

# Or create schema directly
psql pcbmind < schema.sql
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local

# Edit .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Running Local Development

### Terminal 1: Backend API
```bash
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload
# API running at http://localhost:8000
```

### Terminal 2: Frontend App
```bash
cd frontend
npm run dev
# App running at http://localhost:3000
```

### Terminal 3 (Optional): Database
```bash
# If using local PostgreSQL
psql pcbmind
# Or use PgAdmin at http://localhost:5050
```

## Testing the Application

### API Endpoints
```bash
# Health check
curl http://localhost:8000/

# Register user
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123",
    "full_name": "Test User"
  }'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123"
  }'

# Get dashboard metrics
curl http://localhost:8000/api/dashboard/metrics \
  -H "Authorization: Bearer <token>"
```

### Frontend Navigation
1. Open http://localhost:3000
2. Click "Request Demo" or "Start Inspection"
3. Sign up or login with test credentials
4. Explore dashboard, inspections, and reports

## Project Structure Tour

```
pcb/
├── README.md                 # Project overview
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── main.py          # App entry point
│   │   ├── api/             # API routes
│   │   ├── ml/              # AI/ML models
│   │   ├── services/        # Business logic
│   │   └── models/          # Database models
│   ├── requirements.txt      # Dependencies
│   └── .env.example         # Environment template
├── frontend/                 # Next.js application
│   ├── app/
│   │   ├── page.tsx         # Landing page
│   │   ├── dashboard/       # Dashboard pages
│   │   └── auth/            # Auth pages
│   ├── lib/
│   │   ├── api.ts           # API client
│   │   └── hooks.ts         # React hooks
│   ├── styles/              # CSS & Tailwind
│   ├── package.json         # Dependencies
│   └── .env.local.example   # Environment template
├── docs/                     # Documentation
│   ├── FRONTEND.md          # Frontend guide
│   ├── BACKEND.md           # Backend guide
│   ├── DATABASE.md          # Schema
│   ├── API.md               # API reference
│   ├── ARCHITECTURE.md      # System design
│   └── DEPLOYMENT.md        # Deploy guide
└── shared/                  # Shared types
    └── constants.py         # Constants

```

## Common Commands

### Backend
```bash
# Run development server
python -m uvicorn app.main:app --reload

# Run tests
pytest

# Format code
black app/

# Type checking
mypy app/

# Database migrations
alembic revision --autogenerate -m "Description"
alembic upgrade head
```

### Frontend
```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Type checking
npm run type-check

# Lint
npm run lint
```

## Troubleshooting

### Backend Connection Issues
**Problem:** Cannot connect to database
```bash
# Check PostgreSQL is running
pg_isready -h localhost

# Verify connection string
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL
```

### Frontend API Errors
**Problem:** 404 errors from API
```bash
# Verify backend is running
curl http://localhost:8000

# Check NEXT_PUBLIC_API_URL in .env.local
cat frontend/.env.local

# Clear Next.js cache
rm -rf frontend/.next
npm run dev
```

### CORS Issues
**Problem:** Cross-origin errors
```python
# Check CORS_ORIGINS in backend .env
CORS_ORIGINS=["http://localhost:3000"]

# Verify in app/main.py
app.add_middleware(CORSMiddleware, allow_origins=settings.CORS_ORIGINS)
```

## Data Seeding (Optional)

Create sample data for testing:

```bash
cd backend
python scripts/seed_db.py
```

This creates:
- Test users with different roles
- Sample factories and production lines
- PCB templates
- Sample inspections and defects

## IDE Setup

### VS Code Extensions
```json
{
  "recommendations": [
    "ms-python.python",
    "ms-python.vscode-pylance",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss"
  ]
}
```

### Settings
```json
{
  "[python]": {
    "editor.defaultFormatter": "ms-python.python",
    "editor.formatOnSave": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
```

## Next Steps

1. **Explore the landing page**: http://localhost:3000
2. **Create an account**: Sign up as a new user
3. **Upload a test image**: Use `/inspection` page
4. **Check dashboard**: View metrics and trends
5. **Review API docs**: http://localhost:8000/docs

## Support & Resources

- **GitHub**: https://github.com/yourusername/pcbmind-ai
- **Documentation**: `/docs` folder
- **API Docs**: http://localhost:8000/docs (Swagger)
- **Discord**: [Community server link]
- **Email**: support@pcbmind.ai

## Performance Tips

### Development
- Use `--reload` for auto-reload on changes
- Check Vue DevTools for frontend debugging
- Use `django-extensions` for shell commands

### Production
- Use Gunicorn with multiple workers
- Enable Nginx caching
- Use CDN for static files
- Monitor with Datadog/New Relic

## Contributing

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes and commit: `git commit -am 'Add feature'`
3. Push: `git push origin feature/feature-name`
4. Open Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.
