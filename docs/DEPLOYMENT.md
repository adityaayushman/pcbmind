"""Deployment guide"""

# PCBMind AI - Deployment Guide

## Prerequisites

- Docker & Docker Compose
- Git
- Domain name (for production)
- SSL certificate

## Environment Setup

### Local Development

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/pcbmind-ai.git
   cd pcbmind-ai
   ```

2. **Backend setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Frontend setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Create environment files**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   
   # Frontend
   cp frontend/.env.local.example frontend/.env.local
   ```

5. **Configure databases**
   ```bash
   # Create PostgreSQL database
   createdb pcbmind
   
   # Run migrations (if using Alembic)
   cd backend
   alembic upgrade head
   ```

6. **Start services**
   ```bash
   # Terminal 1: Backend
   cd backend
   python -m uvicorn app.main:app --reload
   
   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

## Docker Deployment

### Build Images

```bash
# Backend
docker build -t pcbmind-backend:latest backend/

# Frontend
docker build -t pcbmind-frontend:latest frontend/
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: pcbmind
      POSTGRES_PASSWORD: secure_password
      POSTGRES_DB: pcbmind
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://pcbmind:secure_password@postgres:5432/pcbmind
      SECRET_KEY: ${SECRET_KEY}
      SUPABASE_URL: ${SUPABASE_URL}
      SUPABASE_KEY: ${SUPABASE_KEY}
      OPENAI_API_KEY: ${OPENAI_API_KEY}
    ports:
      - "8000:8000"
    depends_on:
      - postgres
    command: uvicorn app.main:app --host 0.0.0.0

  frontend:
    build: ./frontend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8000
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
```

Run:
```bash
docker-compose up
```

## Cloud Deployment

### Vercel (Frontend)

1. **Connect repository**
   ```bash
   vercel login
   vercel link
   ```

2. **Configure environment**
   ```bash
   vercel env add NEXT_PUBLIC_API_URL
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

3. **Deploy**
   ```bash
   vercel deploy --prod
   ```

### Railway (Backend)

1. **Create account** at railway.app

2. **Connect repository**
   - Link GitHub account
   - Select repository

3. **Configure environment**
   ```
   DATABASE_URL: postgresql://...
   SECRET_KEY: your-secret-key
   SUPABASE_URL: your-url
   SUPABASE_KEY: your-key
   OPENAI_API_KEY: your-key
   ```

4. **Deploy**
   - Push to main branch
   - Railway auto-deploys

### AWS Deployment

**Backend (ECS/Fargate)**
```bash
# Create ECR repository
aws ecr create-repository --repository-name pcbmind-backend

# Push image
docker tag pcbmind-backend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/pcbmind-backend:latest
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/pcbmind-backend:latest

# Deploy to ECS
# Use AWS Console or AWS CLI
```

**Frontend (CloudFront + S3)**
```bash
# Build
npm run build

# Deploy to S3
aws s3 sync out/ s3://pcbmind-frontend/

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"
```

**Database (RDS)**
```bash
# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier pcbmind-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password <secure-password>
```

## Database Migrations

### Initial Setup

```bash
cd backend
alembic init migrations
```

### Create Migration

```bash
alembic revision --autogenerate -m "Initial schema"
```

### Apply Migrations

```bash
alembic upgrade head
```

### On Deployment

Add to deployment script:
```bash
alembic upgrade head
```

## SSL/TLS

### Let's Encrypt (Certbot)

```bash
sudo certbot certonly --standalone -d pcbmind.ai

# Auto-renewal
sudo systemctl enable certbot.timer
```

### Nginx Configuration

```nginx
server {
    listen 443 ssl;
    server_name pcbmind.ai;
    
    ssl_certificate /etc/letsencrypt/live/pcbmind.ai/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pcbmind.ai/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
    }
    
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
    }
}
```

## Monitoring & Logging

### Application Monitoring

```python
# backend/app/core/monitoring.py
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)
```

### Error Tracking (Sentry)

```python
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn="your-sentry-dsn",
    integrations=[FastApiIntegration()]
)
```

### Logging (ELK Stack)

```yaml
version: '3'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.10.0
  
  kibana:
    image: docker.elastic.co/kibana/kibana:7.10.0
    ports:
      - "5601:5601"
  
  logstash:
    image: docker.elastic.co/logstash/logstash:7.10.0
```

## Backup Strategy

### Database Backup

```bash
# Automated backup
pg_dump pcbmind > backup_$(date +%Y%m%d).sql

# Schedule with cron
0 2 * * * pg_dump pcbmind > /backups/backup_$(date +\%Y\%m\%d).sql
```

### S3 Backup

```bash
aws s3 sync /backups/ s3://pcbmind-backups/
```

## Performance Optimization

### Frontend

- Enable Next.js ISR (Incremental Static Regeneration)
- Implement image optimization
- Use CDN (CloudFront, Cloudflare)
- Enable gzip compression

### Backend

- Enable database connection pooling
- Implement caching (Redis)
- Use async workers (Gunicorn + Uvicorn)
- Monitor with New Relic/DataDog

### Infrastructure

```bash
# Backend (4 workers)
gunicorn app.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker

# Frontend (behind Nginx)
upstream frontend {
    server localhost:3000;
    server localhost:3001;
}
```

## Post-Deployment Checklist

- [ ] SSL certificate installed and valid
- [ ] Database backed up
- [ ] Monitoring configured
- [ ] Alerts set up
- [ ] API endpoints tested
- [ ] Frontend load tested
- [ ] Security scan passed
- [ ] Documentation updated
- [ ] Team trained
- [ ] Rollback plan documented

## Rollback Plan

```bash
# Tag current version
git tag -a v1.0.0 -m "Production v1.0.0"

# Rollback to previous
docker pull pcbmind-backend:v0.9.9
docker tag pcbmind-backend:v0.9.9 pcbmind-backend:latest
docker push pcbmind-backend:latest
```

## Support

For deployment issues, contact: devops@pcbmind.ai
