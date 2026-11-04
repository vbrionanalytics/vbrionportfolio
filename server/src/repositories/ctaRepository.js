const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const CtaSubmission = require('../models/CtaSubmission');

const DB_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DB_DIR, 'cta_database.json');

class CtaRepository {
  constructor() {
    this.memoryCache = [];
    this.isInitialized = false;
    this.initLocalDb();
  }

  /**
   * Initializes local disk-backed persistent storage
   */
  initLocalDb() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        this.memoryCache = JSON.parse(raw);
        console.log(`[CtaRepository] Loaded ${this.memoryCache.length} existing CTA records from disk: ${DB_FILE}`);
      } else {
        this.memoryCache = [];
        this.saveToDisk();
        console.log(`[CtaRepository] Initialized empty persistent database on disk: ${DB_FILE}`);
      }
      this.isInitialized = true;
    } catch (err) {
      console.error('[CtaRepository] Error initializing persistent file database:', err.message);
      this.memoryCache = [];
    }
  }

  /**
   * Atomic write to disk to ensure ACID-like persistence without corruptions
   */
  saveToDisk() {
    try {
      const tempPath = `${DB_FILE}.tmp.${Date.now()}`;
      fs.writeFileSync(tempPath, JSON.stringify(this.memoryCache, null, 2), 'utf8');
      fs.renameSync(tempPath, DB_FILE);
    } catch (err) {
      console.error('[CtaRepository] Failed to write CTA database to disk:', err.message);
    }
  }

  /**
   * Store a new CTA submission / lead
   */
  async create(data) {
    const timestamp = new Date();
    const id = 'cta_' + timestamp.getTime() + '_' + Math.random().toString(36).substring(2, 8);

    const record = {
      _id: id,
      ctaType: data.ctaType || 'contact_form',
      name: (data.name || '').trim(),
      email: (data.email || '').trim().toLowerCase(),
      phone: (data.phone || '').trim(),
      company: (data.company || '').trim(),
      service: (data.service || 'General Strategic Advisory').trim(),
      engagementType: data.engagementType || 'general',
      message: (data.message || '').trim(),
      ctaSource: (data.ctaSource || 'website').trim(),
      ctaLabel: (data.ctaLabel || '').trim(),
      metadata: data.metadata || {},
      ipAddress: data.ipAddress || '',
      userAgent: data.userAgent || '',
      status: data.status || 'new',
      notes: data.notes || [],
      createdAt: timestamp.toISOString(),
      updatedAt: timestamp.toISOString()
    };

    // 1. Always persist to disk
    this.memoryCache.unshift(record);
    this.saveToDisk();
    console.log(`[CtaRepository] Persisted CTA lead "${record._id}" (${record.ctaType} | ${record.email || 'anonymous'}) to disk DB. Total: ${this.memoryCache.length}`);

    // 2. Also persist to MongoDB if connection is ready
    if (mongoose.connection.readyState === 1) {
      try {
        const mongoDoc = new CtaSubmission({
          ...record,
          createdAt: timestamp,
          updatedAt: timestamp
        });
        const savedMongo = await mongoDoc.save();
        return savedMongo.toObject();
      } catch (mongoErr) {
        console.warn('[CtaRepository] Mongo sync failed, disk record preserved:', mongoErr.message);
      }
    }

    return record;
  }

  /**
   * Retrieve records with flexible filtering, search, and pagination
   */
  async getAll({ ctaType, status, search, limit = 50, skip = 0, sortBy = 'createdAt', order = 'desc' } = {}) {
    let results = [...this.memoryCache];

    // Filter by CTA type
    if (ctaType && ctaType !== 'all') {
      results = results.filter((item) => item.ctaType === ctaType);
    }

    // Filter by lead status
    if (status && status !== 'all') {
      results = results.filter((item) => item.status === status);
    }

    // Full text search across name, email, company, service, and message
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      results = results.filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(q)) ||
          (item.email && item.email.toLowerCase().includes(q)) ||
          (item.company && item.company.toLowerCase().includes(q)) ||
          (item.service && item.service.toLowerCase().includes(q)) ||
          (item.message && item.message.toLowerCase().includes(q)) ||
          (item.ctaLabel && item.ctaLabel.toLowerCase().includes(q))
      );
    }

    // Sort
    results.sort((a, b) => {
      const valA = a[sortBy] || '';
      const valB = b[sortBy] || '';
      if (order === 'asc') return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });

    const total = results.length;
    const paginated = results.slice(Number(skip), Number(skip) + Number(limit));

    return {
      total,
      limit: Number(limit),
      skip: Number(skip),
      data: paginated
    };
  }

  /**
   * Get single CTA lead by ID
   */
  async getById(id) {
    const item = this.memoryCache.find((r) => String(r._id) === String(id));
    return item || null;
  }

  /**
   * Update lead status or append notes
   */
  async updateStatus(id, newStatus, noteText = null) {
    const index = this.memoryCache.findIndex((r) => String(r._id) === String(id));
    if (index === -1) return null;

    const record = this.memoryCache[index];
    record.status = newStatus;
    record.updatedAt = new Date().toISOString();

    if (noteText) {
      record.notes = record.notes || [];
      record.notes.push({
        text: noteText,
        author: 'Admin',
        createdAt: new Date().toISOString()
      });
    }

    this.memoryCache[index] = record;
    this.saveToDisk();

    // Sync to Mongo if active
    if (mongoose.connection.readyState === 1) {
      try {
        await CtaSubmission.findByIdAndUpdate(id, {
          status: newStatus,
          updatedAt: new Date(),
          ...(noteText ? { $push: { notes: { text: noteText, author: 'Admin' } } } : {})
        });
      } catch (err) {
        console.warn('[CtaRepository] Mongo status update failed:', err.message);
      }
    }

    return record;
  }

  /**
   * Delete record
   */
  async delete(id) {
    const index = this.memoryCache.findIndex((r) => String(r._id) === String(id));
    if (index === -1) return false;

    this.memoryCache.splice(index, 1);
    this.saveToDisk();

    if (mongoose.connection.readyState === 1) {
      try {
        await CtaSubmission.findByIdAndDelete(id);
      } catch (err) {
        console.warn('[CtaRepository] Mongo delete failed:', err.message);
      }
    }

    return true;
  }

  /**
   * Compute aggregate analytics & funnel statistics
   */
  async getStats() {
    const total = this.memoryCache.length;
    const byType = {};
    const byStatus = {};
    const byService = {};
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    let last24Hours = 0;

    for (const r of this.memoryCache) {
      byType[r.ctaType] = (byType[r.ctaType] || 0) + 1;
      byStatus[r.status] = (byStatus[r.status] || 0) + 1;
      if (r.service) {
        byService[r.service] = (byService[r.service] || 0) + 1;
      }
      if (new Date(r.createdAt) >= oneDayAgo) {
        last24Hours++;
      }
    }

    return {
      total,
      last24Hours,
      byType,
      byStatus,
      byService,
      databaseLocation: DB_FILE,
      isPersistent: true,
      mongoConnected: mongoose.connection.readyState === 1
    };
  }

  /**
   * Export all CTA records in CSV format
   */
  async exportCsv() {
    const headers = [
      'ID',
      'Created At',
      'CTA Type',
      'Name',
      'Email',
      'Phone',
      'Company',
      'Service',
      'Engagement Type',
      'CTA Source',
      'CTA Label',
      'Status',
      'Message'
    ];

    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = this.memoryCache.map((r) => [
      escapeCsv(r._id),
      escapeCsv(r.createdAt),
      escapeCsv(r.ctaType),
      escapeCsv(r.name),
      escapeCsv(r.email),
      escapeCsv(r.phone),
      escapeCsv(r.company),
      escapeCsv(r.service),
      escapeCsv(r.engagementType),
      escapeCsv(r.ctaSource),
      escapeCsv(r.ctaLabel),
      escapeCsv(r.status),
      escapeCsv(r.message)
    ]);

    return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  }
}

module.exports = new CtaRepository();
