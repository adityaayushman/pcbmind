# 🚀 PCBMind AI - Publishing & Deployment Guide

**Complete step-by-step guide to publish PCBMind AI to production.**

---

## 📋 Quick Deployment Options

| Option | Frontend | Backend | Database | Cost | Setup Time |
|--------|----------|---------|----------|------|------------|
| **Vercel + Railway** | Vercel | Railway | Railway PostgreSQL | ~$10-30/mo | 15 mins ⭐ |
| **Heroku + Heroku** | Heroku | Heroku | Heroku PostgreSQL | ~$14/mo | 15 mins |
| **AWS (Full)** | CloudFront+S3 | ECS/Fargate | RDS | $30-100+/mo | 1-2 hours |
| **Docker + VPS** | Nginx | Docker | PostgreSQL | $5-20/mo | 30 mins |
| **DigitalOcean App Platform** | App Platform | App Platform | Managed DB | $12+/mo | 20 mins |

**Recommended: Vercel + Railway** ⭐ (Best for startups, easiest setup)

---

## 🎯 Option 1: Vercel + Railway (Recommended)

### A. Frontend Deployment (Vercel)

#### Step 1: Prepare Your Repository

```bash
# From project root
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

#### Step 2: Create Vercel Account & Connect

1. Go to **vercel.com**
2. Click "Sign Up" → Choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub
4. Click "New Project"
5. Select your PCBMind repository
6. Click "Import"

#### Step 3: Configure Environment Variables

In Vercel dashboard:

1. Go to **Settings → Environment Variables**
2. Add these variables:

```
NEXT_PUBLIC_API_URL=https://your-railway-backend.railway.app
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Step 4: Configure Build Settings

1. Go to **Settings → Build & Development**
2. Set:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

#### Step 5: Deploy!

1. Click the **"Deploy"** button
2. Wait for build to complete (2-5 minutes)
3. Get your live URL: `https://your-project.vercel.app`

✅ **Frontend is now live!**

---

### B. Backend Deployment (Railway)

#### Step 1: Create Railway Account

1. Go to **railway.app**
2. Click "Start Project"
3. Click "Deploy from GitHub"
4. Authorize Railway

#### Step 2: Create PostgreSQL Database

1. In Railway dashboard, click "New Project"
2. Click "Provision PostgreSQL"
3. Set username: `postgres`, password: (auto-generated)
4. Note the `DATABASE_URL` shown in variables

#### Step 3: Create Backend Service

1. In Railway, click "New"
2. Select "GitHub repo"
3. Choose your repository
4. Configure:
   - **Root Directory**: `backend`
   - **Python Version**: `3.10`

#### Step 4: Set Environment Variables

Click your backend service → Variables tab → Add:

```
DATABASE_URL=postgresql://postgres:[password]@[host]:[port]/railway
SECRET_KEY=your-secret-key-here-min-32-chars
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_api_key
ENVIRONMENT=production
```

#### Step 5: Configure Deployment

1. Go to **Deployments** tab
2. Set **Deployment Trigger**: GitHub push
3. Add **Health Check URL**: `/docs` or `/health`

#### Step 6: Deploy!

1. Railway will auto-deploy on git push
2. Or manually click "Deploy" button
3. Wait for deployment to complete
4. Get your backend URL from domain section

✅ **Backend is now live!**

---

### C. Update Frontend with Backend URL

1. Go to Vercel dashboard
2. Go to **Settings → Environment Variables**
3. Update `NEXT_PUBLIC_API_URL` to your Railway backend URL
4. Click "Redeploy" to update frontend

✅ **Everything is connected!**

---

## 🎯 Option 2: Heroku (Single Platform)

### Prerequisites
- Heroku CLI: `npm install -g heroku`

### Step 1: Login to Heroku

```bash
heroku login
```

### Step 2: Create Applications

```bash
# Frontend app
heroku create pcbmind-frontend
heroku buildpacks:add heroku/nodejs -a pcbmind-frontend

# Backend app
heroku create pcbmind-backend
heroku buildpacks:add heroku/python -a pcbmind-backend

# Database
heroku addons:create heroku-postgresql:mini -a pcbmind-backend
```

### Step 3: Deploy Backend

```bash
cd backend

# Set environment variables
heroku config:set \
  SECRET_KEY=your-secret-key \
  SUPABASE_URL=your_url \
  SUPABASE_KEY=your_key \
  OPENAI_API_KEY=your_key \
  -a pcbmind-backend

# Deploy
git subtree push --prefix backend heroku main

# Run migrations (if needed)
heroku run python -m alembic upgrade head -a pcbmind-backend
```

### Step 4: Deploy Frontend

```bash
cd frontend

# Set API URL
heroku config:set \
  NEXT_PUBLIC_API_URL=https://pcbmind-backend.herokuapp.com \
  NEXT_PUBLIC_SUPABASE_URL=your_url \
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  -a pcbmind-frontend

# Deploy
git subtree push --prefix frontend heroku main
```

### Step 5: Monitor

```bash
heroku logs -a pcbmind-backend
heroku logs -a pcbmind-frontend
```

---

## 🎯 Option 3: Docker + VPS (DigitalOcean/Linode)

### Step 1: Create VPS

1. Create droplet on DigitalOcean (Ubuntu 22.04, 2GB RAM)
2. SSH into server:
   ```bash
   ssh root@your_server_ip
   ```

### Step 2: Install Dependencies

```bash
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Step 3: Deploy with Docker Compose

```bash
# Clone your repo
git clone https://github.com/yourusername/pcbmind-ai.git
cd pcbmind-ai

# Create .env file
cp .env.example .env

# Edit .env with your values
nano .env

# Start services
docker-compose up -d

# Check status
docker-compose ps
```

### Step 4: Setup Nginx Reverse Proxy

```bash
# Install Nginx
sudo apt install nginx -y

# Create config
sudo nano /etc/nginx/sites-available/pcbmind

# Add this config:
upstream backend {
    server 127.0.0.1:8000;
}

upstream frontend {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
    }

    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
    }
}

# Enable config
sudo ln -s /etc/nginx/sites-available/pcbmind /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL (Let's Encrypt)
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

---

## 📊 Post-Deployment Checklist

### Security

- [ ] Set `ENVIRONMENT=production` in backend
- [ ] Enable HTTPS on all services
- [ ] Configure CORS properly (match frontend domain)
- [ ] Set strong `SECRET_KEY` (minimum 32 characters)
- [ ] Store API keys in environment variables (not code)
- [ ] Enable database backups
- [ ] Setup rate limiting on API endpoints
- [ ] Enable request logging/monitoring

### Performance

- [ ] Enable CDN for static assets (Vercel does this)
- [ ] Setup image optimization (Next.js default)
- [ ] Enable database connection pooling
- [ ] Configure caching headers
- [ ] Setup monitoring/alerting
- [ ] Load test your API

### Data & Backups

- [ ] Configure automated database backups
- [ ] Test backup restoration process
- [ ] Setup log aggregation (Sentry, LogRocket)
- [ ] Enable database query logging
- [ ] Monitor disk space

### Maintenance

- [ ] Setup auto-deployment on git push
- [ ] Configure branch protection rules
- [ ] Setup CI/CD pipeline
- [ ] Document deployment process
- [ ] Create runbook for incidents
- [ ] Schedule regular security audits

---

## 🔗 Custom Domain Setup

### For Vercel Frontend

1. Go to Vercel **Settings → Domains**
2. Enter your domain: `yourdomain.com`
3. Add DNS records (Vercel will show you which ones)
4. Wait for verification (usually 5-10 minutes)

### For Railway Backend

1. Go to Railway service **Settings**
2. Under "Domains", add your backend domain
3. Update DNS records
4. Backend will be at `https://api.yourdomain.com`

---

## 🐛 Troubleshooting

### Frontend Won't Build on Vercel

```bash
# Check build locally
npm run build

# Look for TypeScript errors
npm run type-check

# Check environment variables are set
vercel env list
```

### Backend Returns 502

```bash
# Check Railway logs
# Go to Railway dashboard → Logs tab

# Common issues:
# 1. DATABASE_URL not set
# 2. Port not exposed (should be 8000)
# 3. Dependency missing in requirements.txt
```

### API Connection Fails

```bash
# Verify frontend can reach backend
curl https://your-railway-url/docs

# Check CORS settings in backend
# Should allow your Vercel domain

# Check environment variables:
# NEXT_PUBLIC_API_URL should be set correctly
```

### Database Connection Issues

```bash
# Test connection locally
psql $DATABASE_URL

# Check if migrations ran
# Railway may need manual migration command

# Verify credentials in environment variables
```

---

## 📈 Monitoring & Maintenance

### Setup Monitoring

1. **Vercel Analytics** (included)
   - Dashboard → Analytics tab
   - Real-time metrics, error tracking

2. **Railway Monitoring**
   - Deployment tab shows CPU/Memory
   - Logs tab shows application output

3. **External Monitoring**
   - Setup UptimeRobot for alerts
   - Setup Sentry for error tracking
   - Setup Datadog for APM

### Regular Maintenance

```bash
# Weekly: Check logs for errors
# Daily: Monitor uptime
# Monthly: Review performance metrics
# Quarterly: Security audit
# Annually: Plan scaling/infrastructure updates
```

---

## 💰 Cost Estimation

### Vercel + Railway

- **Vercel**: $0-20/mo (depends on traffic)
- **Railway**: $5-50/mo (PostgreSQL + backend)
- **Storage**: $0-10/mo (file uploads)
- **Total**: ~$10-30/mo for MVP

### Scaling (As You Grow)

- **100K users**: $50-100/mo
- **1M users**: $200-500/mo
- **10M users**: $1000+/mo

---

## 🚀 Next Steps After Publishing

1. **Setup CI/CD Pipeline**
   ```bash
   # GitHub Actions auto-deploys on push
   # Both Vercel & Railway support this
   ```

2. **Setup Monitoring & Alerts**
   - Track errors with Sentry
   - Monitor uptime with UptimeRobot
   - Performance with Datadog

3. **Plan Scaling**
   - Database optimization
   - Caching strategy
   - Load testing

4. **Launch Marketing**
   - Website is live!
   - Share with beta users
   - Collect feedback

---

## 📞 Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **FastAPI Docs**: https://fastapi.tiangolo.com
- **Next.js Docs**: https://nextjs.org/docs

---

**Congratulations! Your PCBMind AI platform is now published! 🎉**
