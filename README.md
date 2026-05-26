# TradeAura - Advanced Backtesting Trading Platform

A modern, high-performance backtesting platform for Forex and Cryptocurrency trading with TradingView-style charts.

## 🎯 Features

- 📊 Professional TradingView-style charts
- ⚡ Ultra-fast backtesting engine
- 📈 Real-time market data streaming
- 💼 Portfolio analytics
- 🎯 Strategy builder
- 📱 Fully responsive design
- 💳 Integrated payment system (Razorpay)

## 💰 Membership Plans

| Feature | Free | Pro (₹399/mo) | Aura (₹799/mo) |
|---------|------|---------------|----------------|
| Backtests/month | 5 | 100 | Unlimited |
| Chart timeframes | 4 | 12 | All |
| Strategy templates | 3 | 15 | Unlimited |
| Advanced analytics | ❌ | ✅ | ✅ |
| API access | ❌ | ✅ | ✅ |
| Priority support | ❌ | ❌ | ✅ |
| Custom indicators | ❌ | ✅ | ✅ |

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL
- **Charts**: TradingView Lightweight Charts
- **Real-time**: WebSocket (Socket.io)
- **Authentication**: JWT
- **Payment**: Razorpay
- **Containerization**: Docker

## 📋 Prerequisites

- Node.js 16+ ([Download](https://nodejs.org/))
- PostgreSQL 12+ ([Download](https://www.postgresql.org/download/))
- Docker & Docker Compose ([Download](https://www.docker.com/products/docker-desktop))
- Git ([Download](https://git-scm.com/))
- npm or yarn

## 🚀 Quick Start (Using Docker - Recommended)

### 1. Clone Repository

```bash
git clone https://github.com/rishi23453789425/TradeAura.git
cd TradeAura
```

### 2. Setup Environment

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```bash
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://tradeaura:tradeaura_pass@postgres:5432/tradeaura
JWT_SECRET=your_super_secret_jwt_key_change_this
VITE_API_URL=http://localhost:5000
VITE_WS_URL=ws://localhost:5000
```

### 3. Start with Docker Compose

```bash
docker-compose up --build
```

This will start:
- ✅ PostgreSQL Database (Port 5432)
- ✅ Redis Cache (Port 6379)
- ✅ Backend API (Port 5000)
- ✅ Frontend (Port 3000)

**Access the application**: Open http://localhost:3000

---

## 🏃 Manual Setup (Without Docker)

### Step 1: Setup Database

```bash
# Create PostgreSQL database
createdb tradeaura

# Or using psql
psql -U postgres
create database tradeaura;
```

### Step 2: Setup Backend

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Run migrations
npm run migrate

# Start backend
npm run dev
```

Backend runs on: http://localhost:5000

### Step 3: Setup Frontend

```bash
cd ../frontend
npm install

# Create .env file
cp .env.example .env

# Start frontend
npm run dev
```

Frontend runs on: http://localhost:5173

---

## 📁 Project Structure

```
TradeAura/
├── backend/                 # Node.js API Server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth, validation
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helpers
│   │   └── app.ts          # Express app
│   ├── migrations/         # Database migrations
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                # React Application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API calls
│   │   ├── hooks/          # Custom hooks
│   │   ├── types/          # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile.dev
│   ├── vite.config.ts
│   └── package.json
│
├── docker-compose.yml      # Docker orchestration
├── .env.example            # Environment template
└── README.md               # This file
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Backtesting
- `POST /api/backtest/create` - Create backtest
- `GET /api/backtest/:id` - Get backtest results
- `GET /api/backtest/list` - List all backtests
- `DELETE /api/backtest/:id` - Delete backtest

### Market Data
- `GET /api/market/forex/data` - Get forex data
- `GET /api/market/crypto/data` - Get crypto data
- `GET /api/market/symbols` - Get available symbols

### Subscriptions
- `POST /api/subscription/create` - Create subscription
- `GET /api/subscription/status` - Get subscription status
- `POST /api/subscription/cancel` - Cancel subscription

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd ../frontend
npm run test
```

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  membership ENUM('free', 'pro', 'aura') DEFAULT 'free',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Backtests Table
```sql
CREATE TABLE backtests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  strategy_name VARCHAR(255),
  market_type ENUM('forex', 'crypto'),
  symbol VARCHAR(50),
  timeframe VARCHAR(20),
  entry_price DECIMAL(12,8),
  exit_price DECIMAL(12,8),
  profit_loss DECIMAL(12,8),
  win_rate DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔑 Environment Variables

Create `.env` file in root:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/tradeaura

# JWT
JWT_SECRET=your_super_secret_key_here_change_this
JWT_EXPIRE=30d

# Frontend
VITE_API_URL=http://localhost:5000
VITE_WS_URL=ws://localhost:5000

# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Market Data APIs
ALPHAVANTAGE_KEY=your_alpha_vantage_key
COINGECKO_API_KEY=your_coingecko_key
```

---

## 🚢 Deployment

### Using Heroku

```bash
heroku login
heroku create tradeaura
git push heroku main
```

### Using DigitalOcean

```bash
doctl auth init
doctl apps create --spec app.yaml
```

### Using AWS

```bash
aws ecr get-login-password | docker login --username AWS --password-stdin
docker tag tradeaura:latest YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/tradeaura:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/tradeaura:latest
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📞 Support

- 📧 Email: support@tradeaura.com
- 💬 Discord: [Join Community](https://discord.gg/tradeaura)
- 📖 Docs: [Full Documentation](https://docs.tradeaura.com)

---

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ❤️ for traders**
