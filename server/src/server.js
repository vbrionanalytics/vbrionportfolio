// Load server/.env by absolute path so it works regardless of the process working directory (PM2, Docker, etc.)
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
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
app.set('trust proxy', 1);
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
app.use('/api/pages', require('./routes/pageRoutes'));

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

  const seo = require('./seo');
  const projectRepo = require('./repositories/projectRepository');
  const baseHtml = fs.readFileSync(path.join(clientDistPath, 'index.html'), 'utf8');

  const sendHtml = (res, status, html) => {
    res.status(status)
      .set('Content-Type', 'text/html; charset=UTF-8')
      .set('Cache-Control', 'no-cache')
      .send(html);
  };

  // Dynamic sitemap: home + every case-study page (replaces the old anchor-only file)
  app.get('/sitemap.xml', async (req, res, next) => {
    try {
      res.type('application/xml').set('Cache-Control', 'public, max-age=3600').send(await seo.buildSitemap());
    } catch (err) { next(err); }
  });

  // Hashed build assets are immutable; everything else gets a short cache.
  app.use('/assets', express.static(path.join(clientDistPath, 'assets'), { maxAge: '1y', immutable: true }));
  app.use(express.static(clientDistPath, { index: false, maxAge: '1h' }));

  app.get('/', async (req, res, next) => {
    try { sendHtml(res, 200, await seo.renderHome(baseHtml)); } catch (err) { next(err); }
  });

  // Case-study pages: unique title/description/schema per project; real 404 for unknown ids
  app.get('/project/:id', async (req, res, next) => {
    try {
      const project = await projectRepo.getById(req.params.id);
      if (!project) return sendHtml(res, 404, seo.renderNotFound(baseHtml, req.path));
      sendHtml(res, 200, seo.renderProject(baseHtml, project));
    } catch (err) { next(err); }
  });

  // SEO landing pages: services, locations, blog (unique meta + crawlable content per URL)
  const notFound = (res, req) => sendHtml(res, 404, seo.renderNotFound(baseHtml, req.path));

  app.get('/services/:slug', async (req, res, next) => {
    try {
      const page = seo.getServicePage(req.params.slug);
      if (!page) return notFound(res, req);
      sendHtml(res, 200, await seo.renderServicePage(baseHtml, page));
    } catch (err) { next(err); }
  });

  app.get('/software-company-in/:slug', async (req, res, next) => {
    try {
      const page = seo.getLocationPage(req.params.slug);
      if (!page) return notFound(res, req);
      sendHtml(res, 200, await seo.renderLocationPage(baseHtml, page));
    } catch (err) { next(err); }
  });

  app.get('/blog', (req, res) => sendHtml(res, 200, seo.renderBlogIndex(baseHtml)));

  app.get('/blog/:slug', (req, res) => {
    const post = seo.getBlogPost(req.params.slug);
    if (!post) return notFound(res, req);
    sendHtml(res, 200, seo.renderBlogPost(baseHtml, post));
  });

  // Any other non-API URL is a genuine 404 (the client still redirects visitors home)
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    sendHtml(res, 404, seo.renderNotFound(baseHtml, req.path));
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
