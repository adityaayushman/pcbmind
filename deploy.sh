#!/bin/bash

# PCBMind AI - Vercel + Railway Deployment Script
# Quick setup for publishing to production

set -e

echo "🚀 PCBMind AI - Production Deployment Helper"
echo "=============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if user is logged in to git
check_git_auth() {
    echo -e "${BLUE}📋 Checking Git authentication...${NC}"
    if ! git config --global user.email &> /dev/null; then
        echo -e "${RED}❌ Git not configured. Please run:${NC}"
        echo "   git config --global user.name 'Your Name'"
        echo "   git config --global user.email 'your@email.com'"
        exit 1
    fi
    echo -e "${GREEN}✅ Git configured${NC}"
}

# Verify project structure
check_project_structure() {
    echo ""
    echo -e "${BLUE}📂 Checking project structure...${NC}"
    
    required_dirs=("frontend" "backend" "docs")
    for dir in "${required_dirs[@]}"; do
        if [ ! -d "$dir" ]; then
            echo -e "${RED}❌ Missing directory: $dir${NC}"
            exit 1
        fi
    done
    
    echo -e "${GREEN}✅ Project structure is valid${NC}"
}

# Check environment files
check_env_files() {
    echo ""
    echo -e "${BLUE}🔐 Checking environment files...${NC}"
    
    if [ ! -f "backend/.env.example" ]; then
        echo -e "${RED}❌ backend/.env.example not found${NC}"
        exit 1
    fi
    
    if [ ! -f "frontend/.env.local.example" ]; then
        echo -e "${RED}❌ frontend/.env.local.example not found${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Environment templates found${NC}"
}

# Install dependencies
install_dependencies() {
    echo ""
    echo -e "${BLUE}📦 Installing dependencies...${NC}"
    
    # Frontend
    echo -e "${YELLOW}→ Installing frontend dependencies...${NC}"
    cd frontend
    npm install --silent
    cd ..
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
    
    # Backend
    echo -e "${YELLOW}→ Installing backend dependencies...${NC}"
    cd backend
    if [ ! -d "venv" ]; then
        python3 -m venv venv
    fi
    source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null
    pip install -q -r requirements.txt
    cd ..
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
}

# Build frontend
build_frontend() {
    echo ""
    echo -e "${BLUE}🔨 Building frontend...${NC}"
    cd frontend
    npm run build
    cd ..
    echo -e "${GREEN}✅ Frontend build complete${NC}"
}

# Verify Docker setup
check_docker() {
    echo ""
    echo -e "${BLUE}🐳 Checking Docker setup...${NC}"
    
    if ! command -v docker &> /dev/null; then
        echo -e "${YELLOW}⚠️  Docker not found (optional)${NC}"
        return
    fi
    
    if [ ! -f "docker-compose.yml" ]; then
        echo -e "${YELLOW}⚠️  docker-compose.yml not found${NC}"
        return
    fi
    
    echo -e "${GREEN}✅ Docker is configured${NC}"
}

# Generate deployment checklist
generate_checklist() {
    echo ""
    echo -e "${BLUE}📋 Generating deployment checklist...${NC}"
    
    cat > DEPLOYMENT_CHECKLIST.md << 'EOF'
# Deployment Checklist

## Pre-Deployment

- [ ] All code is committed to git
- [ ] Tests pass locally
- [ ] Build completes without errors
- [ ] Environment variables documented
- [ ] Database migrations are ready
- [ ] API endpoints tested locally
- [ ] Frontend builds without errors

## Vercel Setup (Frontend)

- [ ] Create Vercel account at vercel.com
- [ ] Connect GitHub repository
- [ ] Configure environment variables:
  - [ ] `NEXT_PUBLIC_API_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Deploy to production

## Railway Setup (Backend)

- [ ] Create Railway account at railway.app
- [ ] Create PostgreSQL database
- [ ] Create backend service from GitHub
- [ ] Configure environment variables:
  - [ ] `DATABASE_URL`
  - [ ] `SECRET_KEY`
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_KEY`
  - [ ] `OPENAI_API_KEY`
  - [ ] `ENVIRONMENT=production`
- [ ] Deploy backend

## Post-Deployment

- [ ] Verify frontend loads
- [ ] Verify backend is accessible
- [ ] Test authentication flow
- [ ] Test API endpoints
- [ ] Check database connection
- [ ] Monitor logs for errors
- [ ] Setup monitoring/alerts

## Custom Domain (Optional)

- [ ] Register domain
- [ ] Setup DNS records for Vercel
- [ ] Setup DNS records for Railway
- [ ] Enable HTTPS
- [ ] Verify SSL certificate

## Monitoring & Maintenance

- [ ] Setup error tracking (Sentry)
- [ ] Setup uptime monitoring (UptimeRobot)
- [ ] Configure automated backups
- [ ] Setup log aggregation
- [ ] Create incident response plan
EOF
    
    echo -e "${GREEN}✅ Checklist generated: DEPLOYMENT_CHECKLIST.md${NC}"
}

# Show next steps
show_next_steps() {
    echo ""
    echo -e "${GREEN}================================${NC}"
    echo -e "${GREEN}✅ Setup Complete!${NC}"
    echo -e "${GREEN}================================${NC}"
    echo ""
    echo -e "${BLUE}📚 Next Steps:${NC}"
    echo ""
    echo "1. Create Vercel Account:"
    echo "   → Go to https://vercel.com"
    echo "   → Sign up with GitHub"
    echo "   → Import your PCBMind repository"
    echo ""
    echo "2. Create Railway Account:"
    echo "   → Go to https://railway.app"
    echo "   → Sign up with GitHub"
    echo "   → Create PostgreSQL database"
    echo "   → Create backend service"
    echo ""
    echo "3. Configure Environment Variables:"
    echo "   → Backend (.env):"
    echo "     DATABASE_URL, SECRET_KEY, SUPABASE_URL, etc."
    echo "   → Frontend (.env.local):"
    echo "     NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SUPABASE_*, etc."
    echo ""
    echo "4. Deploy:"
    echo "   → Push to main branch"
    echo "   → Vercel auto-deploys frontend"
    echo "   → Railway auto-deploys backend"
    echo ""
    echo -e "${BLUE}📖 Full Guide:${NC}"
    echo "   → See docs/PUBLISHING_GUIDE.md"
    echo ""
    echo -e "${BLUE}✅ Checklist:${NC}"
    echo "   → See DEPLOYMENT_CHECKLIST.md"
    echo ""
}

# Main execution
main() {
    check_git_auth
    check_project_structure
    check_env_files
    check_docker
    
    echo ""
    echo -e "${YELLOW}Would you like to:${NC}"
    echo "1) Install dependencies & build"
    echo "2) Just show deployment guide"
    echo "3) Generate deployment checklist only"
    echo ""
    read -p "Choose option (1-3): " choice
    
    case $choice in
        1)
            install_dependencies
            build_frontend
            generate_checklist
            show_next_steps
            ;;
        2)
            echo ""
            echo -e "${BLUE}📖 Full Deployment Guide:${NC}"
            echo "    → docs/PUBLISHING_GUIDE.md"
            echo ""
            echo "For Vercel + Railway (recommended):"
            echo "  1. Create Vercel account: https://vercel.com"
            echo "  2. Create Railway account: https://railway.app"
            echo "  3. Follow the guide in docs/PUBLISHING_GUIDE.md"
            ;;
        3)
            generate_checklist
            ;;
        *)
            echo -e "${RED}Invalid choice${NC}"
            exit 1
            ;;
    esac
}

main "$@"
