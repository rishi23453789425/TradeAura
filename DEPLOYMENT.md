# 🚀 TradeAura Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (Easiest - Free)

#### Step 1: Push to GitHub (Already Done ✅)

#### Step 2: Deploy Backend on Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repo "TradeAura"
4. Set Root Directory to `backend`
5. Click "Deploy"
6. Backend URL: `https://your-project.vercel.app`

#### Step 3: Deploy Frontend on Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repo "TradeAura"
4. Set Root Directory to `frontend`
5. Set `VITE_API_URL` to your backend URL
6. Click "Deploy"
7. Frontend URL: `https://your-frontend.vercel.app`

---

### Option 2: Heroku (Free tier ended - Paid)

```bash
heroku login
heroku create tradeaura
git push heroku main
```

---

### Option 3: Render (Free)

1. Go to https://render.com
2. New > Web Service
3. Connect GitHub repo
4. Set Build Command: `cd backend && npm install && npm run build`
5. Set Start Command: `npm start`
6. Deploy

---

### Option 4: Railway (Paid - $5/month)

```bash
npm i -g railway
railway login
railway init
railway deploy
```

---

### Option 5: AWS (Free tier - 1 year)

1. Create EC2 instance
2. Install Node.js and PostgreSQL
3. Clone repo
4. Run: `npm run build && npm start`
5. Access via Public IP

---

## Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=your_postgres_url
REDIS_URL=your_redis_url
JWT_SECRET=your_secret_key
VITE_API_URL=your_backend_url
VITE_WS_URL=your_backend_url
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

---

## Direct URLs (After Deployment)

- Frontend: `https://your-domain.vercel.app`
- Backend: `https://your-api.vercel.app`
- API Health: `https://your-api.vercel.app/api/health`

