# 🚀 TradeAura Complete Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Quick Start with Docker](#quick-start-with-docker)
3. [Manual Setup](#manual-setup)
4. [Testing](#testing)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Option 1: Docker Setup (Recommended)
- **Docker Desktop**: [Download](https://www.docker.com/products/docker-desktop)
- **Git**: [Download](https://git-scm.com/)
- **RAM**: Minimum 4GB
- **Disk Space**: Minimum 5GB

### Option 2: Manual Setup
- **Node.js 16+**: [Download](https://nodejs.org/)
- **PostgreSQL 12+**: [Download](https://www.postgresql.org/download/)
- **Redis 6+**: [Download](https://redis.io/download)
- **Git**: [Download](https://git-scm.com/)
- **npm or yarn**: Comes with Node.js

---

## ⚡ Quick Start with Docker (Easiest)

### Step 1: Clone Repository

```bash
git clone https://github.com/rishi23453789425/TradeAura.git
cd TradeAura
```

### Step 2: Create Environment File

```bash
cp .env.example .env
```

### Step 3: Start Everything

```bash
docker-compose up --build
```

**Wait for all services to start...**

```
✅ postgres is running
✅ redis is running
✅ backend is running on http://localhost:5000
✅ frontend is running on http://localhost:3000
```

### Step 4: Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Docs**: http://localhost:5000/api-docs
- **Database**: localhost:5432
- **Redis**: localhost:6379

### Step 5: Stop Everything

```bash
docker-compose down
```

To remove all data:

```bash
docker-compose down -v
```

---

## 🛠 Manual Setup (Without Docker)

### Step 1: Install Dependencies

#### macOS
```bash
brew install postgresql redis node
```

#### Ubuntu/Linux
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib redis-server nodejs npm
```

#### Windows
- Download and install each from their official websites
- Add to PATH

### Step 2: Start PostgreSQL

#### macOS
```bash
brew services start postgresql
```

#### Ubuntu/Linux
```bash
sudo systemctl start postgresql
sudo systemctl start redis-server
```

#### Windows
- Start PostgreSQL and Redis from Services

### Step 3: Create Database

```bash
# Login to PostgreSQL
psql -U postgres

# In PostgreSQL shell:
CREATE USER tradeaura WITH PASSWORD 'tradeaura_pass';
CREATE DATABASE tradeaura OWNER tradeaura;
\q
```

### Step 4: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your settings
nano .env  # or use your favorite editor

# Run database migrations
npm run migrate

# Start backend
npm run dev
```

**Backend running**: http://localhost:5000

### Step 5: Setup Frontend (New Terminal)

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start frontend
npm run dev
```

**Frontend running**: http://localhost:5173

---

## 🧪 Testing

### 1. Test Backend API

```bash
cd backend

# Run all tests
npm test

# Run specific test file
npm test -- auth.test.ts

# Run with coverage
npm run test:coverage
```

### 2. Test Frontend

```bash
cd frontend

# Run tests
npm test

# Run with coverage
npm run test:coverage
```

### 3. Manual API Testing with cURL

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "username": "testuser"
  }'
```

#### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Create Backtest
```bash
curl -X POST http://localhost:5000/api/backtest/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "strategy_name": "RSI Strategy",
    "market_type": "crypto",
    "symbol": "BTC/USDT",
    "timeframe": "1h",
    "entry_price": 45000,
    "exit_price": 46000
  }'
```

#### Get Market Data
```bash
curl http://localhost:5000/api/market/crypto/data?symbol=BTC
```

### 4. Test with Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Import collection from `backend/postman-collection.json`
3. Set environment variables
4. Run requests

---

## 🔍 Verify Installation

### Docker Compose Check

```bash
docker-compose ps
```

Expected output:
```
NAME                    STATUS
tradeaura_postgres      Up (healthy)
tradeaura_redis         Up (healthy)
tradeaura_backend       Up
tradeaura_frontend      Up
```

### Health Checks

```bash
# Backend health
curl http://localhost:5000/api/health

# Expected response:
# {"status":"ok","timestamp":"2024-01-15T10:30:00Z"}
```

### Database Connection

```bash
psql -U tradeaura -d tradeaura -h localhost

# In psql:
\dt                    # List tables
\du                    # List users
\q                     # Quit
```

### Redis Connection

```bash
redis-cli ping
# Expected: PONG
```

---

## 🐛 Troubleshooting

### Issue: "Port already in use"

```bash
# Find process on port 5000
lsof -i :5000

# Kill process (macOS/Linux)
kill -9 <PID>

# On Windows, use Task Manager or:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: "Database connection failed"

```bash
# Check PostgreSQL is running
psql -U postgres

# If not running:
# macOS: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Check connection string in .env
echo $DATABASE_URL
```

### Issue: "Redis connection failed"

```bash
# Check Redis is running
redis-cli ping

# If not running:
# macOS: brew services start redis
# Linux: sudo systemctl start redis-server
```

### Issue: "Module not found" errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or with Docker:
docker-compose down
docker-compose up --build --force-recreate
```

### Issue: "Cannot find module 'typescript'"

```bash
npm install -g typescript
npm install --save-dev typescript
```

### Issue: "Frontend not loading"

1. Check VITE_API_URL in `.env`
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check console for errors (F12)
4. Verify backend is running

### Issue: Docker container keeps restarting

```bash
# Check logs
docker-compose logs backend

# Rebuild without cache
docker-compose up --build --no-cache
```

---

## 📊 Database Management

### Backup Database

```bash
pg_dump -U tradeaura -d tradeaura > backup.sql
```

### Restore Database

```bash
psql -U tradeaura -d tradeaura < backup.sql
```

### Reset Database

```bash
# Drop and recreate
psql -U postgres -c "DROP DATABASE tradeaura;"
psql -U postgres -c "CREATE DATABASE tradeaura OWNER tradeaura;"
```

---

## 🚀 Production Deployment

### Using Heroku

```bash
# Install Heroku CLI
brew install heroku/brew/heroku  # macOS

# Login
heroku login

# Create app
heroku create tradeaura

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Using DigitalOcean

1. Create Droplet (4GB RAM, Ubuntu 20.04)
2. SSH into droplet
3. Clone repository
4. Install dependencies
5. Setup systemd services
6. Configure Nginx reverse proxy

### Using AWS

1. Create EC2 instance
2. Setup RDS for PostgreSQL
3. Setup ElastiCache for Redis
4. Deploy with Docker
5. Setup CloudFront CDN
6. Configure Route53 DNS

---

## 📚 Next Steps

1. ✅ Verify installation
2. 📝 Read API documentation: `backend/API.md`
3. 🎨 Explore frontend components: `frontend/README.md`
4. 🧪 Run tests
5. 📖 Check database schema
6. 🚀 Deploy to production

---

## 💬 Need Help?

- 📧 Email: support@tradeaura.com
- 💻 GitHub Issues: [Create Issue](https://github.com/rishi23453789425/TradeAura/issues)
- 📚 Documentation: [Read Docs](https://tradeaura.com/docs)

---

**Happy Trading! 📈**
