# 🎯 Quick Deploy Commands

**One-command deployment guides for PCBMind AI**

## ⚡ 30-Second TL;DR

```bash
# 1. Prepare repository
git add .
git commit -m "Ready for production"
git push origin main

# 2. Go to vercel.com → Import GitHub repo → Deploy ✅
# 3. Go to railway.app → New Project → Deploy ✅
# 4. Add environment variables in both platforms
# 5. Done! 🚀
```

---

## 🚀 Full One-Line Commands

### Local Testing Before Deploy

```bash
# Test build locally
npm run build --prefix frontend

# Test backend with Docker
docker-compose up
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend && vercel --prod

# Or login to vercel.com and connect GitHub repo
```

### Railway Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy backend
cd backend && railway up

# Or login to railway.app and connect GitHub repo
```

### Docker Compose (Self-Hosted)

```bash
# Build and start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

---

## 🔑 Required Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
SECRET_KEY=your-secret-key-32-characters-min
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-public-key
OPENAI_API_KEY=sk-...
ENVIRONMENT=production
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

---

## 📊 Recommended Stack

**Frontend:**
```bash
vercel deploy --prod
```
- Vercel automatic deployment
- Global CDN
- SSL included
- ~$20/month for hobbyist plan

**Backend:**
```bash
cd backend && railway up
```
- Railway PostgreSQL database
- Auto-scaling
- ~$5-50/month depending on usage

**Total: ~$10-30/month** ✅

---

## 🎬 Step-by-Step (5 Minutes)

### Step 1: Prepare Code (1 min)
```bash
git add .
git commit -m "Deploy: production build"
git push origin main
```

### Step 2: Deploy Frontend (2 min)
1. Visit https://vercel.com/new
2. Import repository
3. Set `NEXT_PUBLIC_API_URL` environment variable
4. Click Deploy
5. Wait for build (2 minutes)

### Step 3: Deploy Backend (2 min)
1. Visit https://railway.app
2. New Project → PostgreSQL
3. New Project → GitHub (select backend folder)
4. Set environment variables
5. Wait for deployment
6. Update frontend `NEXT_PUBLIC_API_URL` with backend URL

✅ **Done! Your site is live!**

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| **Build fails on Vercel** | Check `npm run build` works locally |
| **Backend 502 error** | Check `DATABASE_URL` environment variable |
| **Can't connect to database** | Verify PostgreSQL is running on Railway |
| **CORS errors** | Update backend `CORS_ORIGINS` to include Vercel domain |
| **API returns 404** | Check `NEXT_PUBLIC_API_URL` is set correctly |

---

## 📈 Performance Checklist

- [ ] Enable Vercel Analytics
- [ ] Setup Railway monitoring
- [ ] Configure database backups
- [ ] Enable HTTPS/SSL
- [ ] Setup error tracking (Sentry)
- [ ] Configure rate limiting
- [ ] Monitor API latency

---

## 🔗 Useful Links

- **Vercel CLI**: https://vercel.com/docs/cli
- **Railway Docs**: https://docs.railway.app
- **FastAPI Deployment**: https://fastapi.tiangolo.com/deployment
- **Next.js Production**: https://nextjs.org/docs/going-to-production

---

## 📞 Deployment Support

- **Vercel Support**: https://vercel.com/support
- **Railway Support**: https://railway.app/support
- **FastAPI Docs**: https://fastapi.tiangolo.com

---

**Your PCBMind AI is ready to go live! 🚀**

See `docs/PUBLISHING_GUIDE.md` for detailed instructions.
