const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const ctaRepository = require('../repositories/ctaRepository');
const { sendEnquiryEmail } = require('../services/emailService');

// Gentle rate limiting to prevent spam
const ctaLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many CTA requests submitted from this network. Please try again shortly.'
  }
});

/**
 * POST /api/cta
 * Record a client CTA interaction or lead
 */
router.post('/', ctaLimiter, async (req, res) => {
  try {
    const {
      ctaType = 'contact_form',
      name,
      email,
      phone,
      company,
      service,
      engagementType,
      message,
      ctaSource,
      ctaLabel,
      metadata,
      honeypot
    } = req.body;

    // Honeypot bot protection
    if (honeypot && String(honeypot).trim() !== '') {
      console.warn('[Security] Bot trapped by honeypot on /api/cta');
      return res.status(200).json({ success: true, message: 'CTA logged.' });
    }

    // Email validation if email was provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(String(email).trim())) {
        return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
      }
    }

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';

    const savedRecord = await ctaRepository.create({
      ctaType,
      name,
      email,
      phone,
      company,
      service,
      engagementType,
      message,
      ctaSource,
      ctaLabel,
      metadata,
      ipAddress,
      userAgent
    });

    // If it's a contact or high-intent lead with an email, dispatch asynchronous notification email
    if (email && ['contact_form', 'discovery_call', 'careers_apply', 'service_inquiry'].includes(ctaType)) {
      sendEnquiryEmail({
        name: name || 'Prospective Client',
        email,
        phone: phone || '',
        service: service || 'CTA Discovery',
        message: message || `Client triggered CTA: ${ctaLabel || ctaType} from ${ctaSource || 'website'}`
      }).catch((err) => console.error('[CtaRoute] Notification email dispatch failed:', err.message));
    }

    return res.status(201).json({
      success: true,
      message: 'CTA interaction recorded successfully in database.',
      referenceId: savedRecord._id,
      data: savedRecord
    });
  } catch (err) {
    console.error('[CtaRoute] Error capturing CTA:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to record CTA data in database.'
    });
  }
});

/**
 * GET /api/cta
 * Query client CTA submissions with filtering, search, and pagination
 */
router.get('/', async (req, res) => {
  try {
    const { ctaType, status, search, limit, skip, sortBy, order } = req.query;
    const result = await ctaRepository.getAll({
      ctaType,
      status,
      search,
      limit,
      skip,
      sortBy,
      order
    });

    return res.json({
      success: true,
      ...result
    });
  } catch (err) {
    console.error('[CtaRoute] Error retrieving CTA records:', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch CTA records.' });
  }
});

/**
 * GET /api/cta/stats
 * Aggregate dashboard statistics on CTA conversions
 */
router.get('/stats', async (req, res) => {
  try {
    const stats = await ctaRepository.getStats();
    return res.json({
      success: true,
      stats
    });
  } catch (err) {
    console.error('[CtaRoute] Error getting stats:', err);
    return res.status(500).json({ success: false, error: 'Failed to calculate CTA stats.' });
  }
});

/**
 * GET /api/cta/export
 * Download all records as CSV spreadsheet
 */
router.get('/export', async (req, res) => {
  try {
    const csvData = await ctaRepository.exportCsv();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="vbrion-client-cta-leads-${Date.now()}.csv"`);
    return res.send(csvData);
  } catch (err) {
    console.error('[CtaRoute] Error exporting CSV:', err);
    return res.status(500).json({ success: false, error: 'Failed to export CSV.' });
  }
});

/**
 * GET /api/cta/:id
 * Retrieve specific CTA lead details
 */
router.get('/:id', async (req, res) => {
  try {
    const item = await ctaRepository.getById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'CTA record not found' });
    }
    return res.json({ success: true, data: item });
  } catch (err) {
    console.error('[CtaRoute] Error getting record by id:', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch record' });
  }
});

/**
 * PATCH /api/cta/:id
 * Update status or append notes to a CTA lead
 */
router.patch('/:id', async (req, res) => {
  try {
    const { status, note } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, error: 'New status is required' });
    }

    const updated = await ctaRepository.updateStatus(req.params.id, status, note);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'CTA record not found' });
    }

    return res.json({
      success: true,
      message: `Status updated to ${status}`,
      data: updated
    });
  } catch (err) {
    console.error('[CtaRoute] Error updating record:', err);
    return res.status(500).json({ success: false, error: 'Failed to update record' });
  }
});

/**
 * DELETE /api/cta/:id
 * Delete a CTA record
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ctaRepository.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'CTA record not found' });
    }
    return res.json({ success: true, message: 'CTA record removed' });
  } catch (err) {
    console.error('[CtaRoute] Error deleting record:', err);
    return res.status(500).json({ success: false, error: 'Failed to delete record' });
  }
});

module.exports = router;
