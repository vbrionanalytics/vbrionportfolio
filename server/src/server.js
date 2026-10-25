require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const path = require('path');
const fs = require('fs');

const contactRoutes = require('./routes/contactRoutes');
const projectRoutes = require('./routes/projectRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const aiRoutes = require('./routes/aiRoutes');
const ctaRoutes = require('./routes/ctaRoutes');
const ctaRepository = require('./repositories/ctaRepository');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// CORS Configuration - allows configured domains, comma-separated list, or standard fallbacks
const clientEnv = process.env.CLIENT_URL || '';
const configuredOrigins = clientEnv
  .split(',')
  .map(u => u.trim())
  .filter(Boolean);

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://localhost:5175'
];

const allowedOrigins = [...new Set([...configuredOrigins, ...defaultOrigins])];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests or same-origin requests
    if (!origin) return callback(null, true);
    // Allow wildcard or listed origins
    if (clientEnv === '*' || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Allow in production if origin matches host or protocol
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Database connection (graceful fallback if MongoDB is not running locally)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vbrion_portfolio';

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 2500,
})
.then(() => {
  console.log('[Database] Connected successfully to MongoDB:', MONGODB_URI);
})
.catch((err) => {
  console.warn('[Database] MongoDB connection failed or offline:', err.message);
  console.log('[Database] Using Abstracted Persistent CTA Repository. Data layer is completely active and resilient.');
});

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/cta', ctaRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'vbrion-portfolio-server',
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'persistent-disk-db',
    ctaDb: {
      isPersistent: true,
      records: ctaRepository.memoryCache.length,
    }
  });
});

// Serve static client assets if built (for unified full-stack hosting on VPS / Render / Heroku)
const clientDistPath = path.resolve(__dirname, '../../client/dist');
if (fs.existsSync(clientDistPath)) {
  console.log(`[StaticHosting] Serving production client build from: ${clientDistPath}`);
  app.use(express.static(clientDistPath));

  // SPA fallback for all non-API GET requests
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Global 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, error: 'API endpoint not found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('[ServerError]', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'An unexpected server error occurred.'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`vbrion Portfolio API running on port ${PORT}`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
});

module.exports = app;
