# 🚀 TradeAura - Quick Start Guide

## One-Minute Setup

### Prerequisites
- **Docker & Docker Compose** (Recommended) - [Download](https://www.docker.com/products/docker-desktop)
- **OR** Node.js 16+, PostgreSQL 12+, Redis 6+

---

## Option 1: Docker Setup (Easiest - 1 Command)

### Step 1: Clone & Setup
```bash
git clone https://github.com/rishi23453789425/TradeAura.git
cd TradeAura
cp .env.example .env
```

### Step 2: Start Everything
```bash
docker-compose up --build
```

### Step 3: Access
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Database**: PostgreSQL on :5432
- **Cache**: Redis on :6379

---

## Option 2: Without Docker

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm run dev
```

---

## 📋 Default Login
- **Email**: test@test.com
- **Password**: test123
- **Username**: testuser

---

## 🧪 Test Endpoints

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","username":"testuser"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### Create Backtest
```bash
curl -X POST http://localhost:5000/api/backtest/create \
  -H "Content-Type: application/json" \
  -d '{"strategy_name":"RSI","market_type":"crypto","symbol":"BTC/USDT","timeframe":"1h","entry_price":45000,"exit_price":46000}'
```

### Get Backtests
```bash
curl http://localhost:5000/api/backtest/list
```

---

## 📁 File Structure

```
TradeAura/
├── backend/
│   ├── src/
│   │   ├── app.ts              # Express server
│   │   ├── config/
│   │   │   └── database.ts
│   │   └── migrations/
│   │       └── init.sql        # Database schema
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── index.html              # Single file frontend
│   ├── package.json
│   └── Dockerfile.dev
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🛑 Stop Services

```bash
# With Docker
docker-compose down

# Stop everything
docker-compose down -v
```

---

## 🐛 Troubleshooting

| Issue | Fix |
|-------|-----|
| Port 5000 in use | `lsof -i :5000` then `kill -9 <PID>` |
| Database error | Check PostgreSQL running: `psql -U postgres` |
| Build fails | Delete `node_modules` and `.npm` cache |
| Frontend not loading | Clear browser cache (Ctrl+Shift+Delete) |

---

## 📊 Features

✅ Forex & Crypto Backtesting
✅ TradingView-style Charts
✅ Real-time Market Data
✅ User Authentication
✅ Three Membership Plans (Free, Pro ₹399, Aura ₹799)
✅ Portfolio Analytics
✅ Fully Responsive Design

---

## 🌐 Next Steps

1. Register a new account
2. Create your first backtest
3. View results and analytics
4. Upgrade to Pro or Aura plan

---

**Happy Trading! 📈**
