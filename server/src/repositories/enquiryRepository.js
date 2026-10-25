const mongoose = require('mongoose');
const Enquiry = require('../models/Enquiry');

// In-memory fallback storage in case MongoDB is offline or in development
const inMemoryStore = [];

class EnquiryRepository {
  async create(data) {
    if (mongoose.connection.readyState === 1) {
      const enquiry = new Enquiry(data);
      return await enquiry.save();
    } else {
      const mockRecord = {
        _id: 'mem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      inMemoryStore.push(mockRecord);
      console.log(`[EnquiryRepository] Stored in in-memory fallback (${inMemoryStore.length} total). DB state: ${mongoose.connection.readyState}`);
      return mockRecord;
    }
  }

  async getAll({ limit = 50, skip = 0 } = {}) {
    if (mongoose.connection.readyState === 1) {
      return await Enquiry.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    }
    return inMemoryStore.slice(skip, skip + limit);
  }

  async count() {
    if (mongoose.connection.readyState === 1) {
      return await Enquiry.countDocuments();
    }
    return inMemoryStore.length;
  }
}

module.exports = new EnquiryRepository();
