const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const enquiryRepository = require('../repositories/enquiryRepository');
const ctaRepository = require('../repositories/ctaRepository');
const { sendEnquiryEmail } = require('../services/emailService');

// Strict rate limiting on contact form to protect against spam / DOS
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 submissions per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many enquiries submitted from this network. Please wait a few moments or email info@vbrion.com directly.'
  }
});

const VALID_SERVICES = [
  'Risk & Governance',
  'Legal Compliances',
  'Business Solutions',
  'Career Consulting',
  'Placement Consulting',
  'Technology Consulting',
  'Fintech Solutions',
  'Healthcare Analytics',
  'Banking Solutions',
  'Education Analytics',
  'Business Development Analytics',
  'General Enquiry'
];

router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, phone, service, message, engagementType = 'general', ctaSource = 'contact_form', ctaLabel, metadata, honeypot } = req.body;

    // 1. Honeypot check (hidden field to trap spam bots)
    if (honeypot && honeypot.trim() !== '') {
      console.warn('[Security] Honeypot triggered by bot submission.');
      // Return 200 OK so bots believe it succeeded
      return res.status(200).json({
        success: true,
        message: 'Your message has been received.'
      });
    }

    // 2. Field validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please provide a valid full name.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }

    if (!message || message.trim().length < 10) {
      return res.status(400).json({ success: false, error: 'Please provide a message with at least 10 characters.' });
    }

    const cleanService = (service && service.trim()) || 'General Enquiry';
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';

    // 3. Persist in legacy enquiry repository
    const savedEnquiry = await enquiryRepository.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      service: cleanService,
      message: message.trim(),
      ipAddress
    });

    // 4. Persist in unified CTA database
    await ctaRepository.create({
      ctaType: 'contact_form',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      service: cleanService,
      engagementType,
      message: message.trim(),
      ctaSource,
      ctaLabel: ctaLabel || 'Client Contact Submission',
      metadata,
      ipAddress,
      userAgent,
      status: 'new'
    });

    // 5. Asynchronously dispatch notification email to info@vbrion.com
    sendEnquiryEmail({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : '',
      service: cleanService,
      message: message.trim()
    }).catch(err => console.error('[ContactRoute] Async email failed:', err.message));

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to vbrion analytics. Our team will review your inquiry and connect with you promptly.',
      referenceId: savedEnquiry._id
    });
  } catch (error) {
    console.error('[ContactRoute] Error processing enquiry:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your request. Please try again or reach out at info@vbrion.com.'
    });
  }
});

// Newsletter subscription route
router.post('/newsletter', contactLimiter, async (req, res) => {
  const { email, ctaSource = 'newsletter_box' } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || '';

  // Save as general newsletter interest
  await enquiryRepository.create({
    name: 'Newsletter Subscriber',
    email: cleanEmail,
    service: 'Newsletter Subscription',
    message: 'User opted into vbrion analytics monthly foresight briefing.'
  });

  // Save in CTA Database
  await ctaRepository.create({
    ctaType: 'newsletter',
    name: 'Newsletter Subscriber',
    email: cleanEmail,
    service: 'Executive Foresight Memo',
    engagementType: 'newsletter',
    message: 'User subscribed to monthly foresight intelligence memo.',
    ctaSource,
    ctaLabel: 'Subscribe to Monthly Horizon Intelligence',
    ipAddress,
    userAgent,
    status: 'new'
  });

  return res.status(200).json({
    success: true,
    message: 'Thank you for subscribing to vbrion foresight insights.'
  });
});

module.exports = router;
