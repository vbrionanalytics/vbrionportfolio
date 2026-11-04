const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const servicesSeedPath = path.join(__dirname, '../seeds/services.json');
let cachedServices = [];

try {
  cachedServices = JSON.parse(fs.readFileSync(servicesSeedPath, 'utf8'));
} catch (err) {
  console.warn('[ServiceRoutes] Error loading services seed:', err.message);
}

// GET /api/services
router.get('/', (req, res) => {
  const { division } = req.query;
  if (division) {
    const filtered = cachedServices.filter(s => s.division.toLowerCase().includes(division.toLowerCase()));
    return res.json({ success: true, count: filtered.length, data: filtered });
  }
  return res.json({ success: true, count: cachedServices.length, data: cachedServices });
});

// GET /api/services/:id
router.get('/:id', (req, res) => {
  const service = cachedServices.find(s => s.id === req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, error: 'Service not found' });
  }
  return res.json({ success: true, data: service });
});

module.exports = router;
