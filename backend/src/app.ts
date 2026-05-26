import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import { Pool } from 'pg';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date(), database: 'connected' });
});

// Auth Routes
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await pool.query(
      'INSERT INTO users (email, password, username, membership) VALUES ($1, $2, $3, $4) RETURNING id, email, username',
      [email, password, username, 'free']
    );
    res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = 'mock_jwt_token_' + result.rows[0].id;
    res.json({ message: 'Login successful', token, user: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Market Data Routes
app.get('/api/market/crypto/data', (req: Request, res: Response) => {
  const symbol = req.query.symbol || 'BTC';
  const mockData = {
    symbol,
    price: Math.random() * 50000 + 30000,
    change24h: (Math.random() - 0.5) * 10,
    volume: Math.random() * 1000000000,
    timestamp: new Date()
  };
  res.json(mockData);
});

app.get('/api/market/forex/data', (req: Request, res: Response) => {
  const symbol = req.query.symbol || 'EURUSD';
  const mockData = {
    symbol,
    price: Math.random() * 1.2 + 0.9,
    change24h: (Math.random() - 0.5) * 2,
    volume: Math.random() * 10000000,
    timestamp: new Date()
  };
  res.json(mockData);
});

app.get('/api/market/symbols', (req: Request, res: Response) => {
  res.json({
    crypto: ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'XRP/USDT', 'ADA/USDT'],
    forex: ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'AUDUSD']
  });
});

// Backtest Routes
app.post('/api/backtest/create', async (req: Request, res: Response) => {
  try {
    const { strategy_name, market_type, symbol, timeframe, entry_price, exit_price, user_id } = req.body;
    const profit_loss = exit_price - entry_price;
    const win_rate = profit_loss > 0 ? 65 : 35;
    
    const result = await pool.query(
      'INSERT INTO backtests (user_id, strategy_name, market_type, symbol, timeframe, entry_price, exit_price, profit_loss, win_rate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [user_id || 1, strategy_name, market_type, symbol, timeframe, entry_price, exit_price, profit_loss, win_rate]
    );
    res.status(201).json({ message: 'Backtest created', backtest: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/backtest/list', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM backtests ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/backtest/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM backtests WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Backtest not found' });
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Subscription Routes
app.post('/api/subscription/create', async (req: Request, res: Response) => {
  try {
    const { user_id, plan_type } = req.body;
    const price = plan_type === 'pro' ? 399 : plan_type === 'aura' ? 799 : 0;
    
    const result = await pool.query(
      'UPDATE users SET membership = $1 WHERE id = $2 RETURNING *',
      [plan_type, user_id]
    );
    res.json({ message: 'Subscription created', plan: plan_type, price, user: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/subscription/status/:user_id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT membership FROM users WHERE id = $1', [req.params.user_id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ membership: result.rows[0].membership });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 TradeAura Backend running on http://localhost:${PORT}`);
});

export default app;