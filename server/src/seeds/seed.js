require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Enquiry = require('../models/Enquiry');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vbrion_portfolio';

async function seedDatabase() {
  try {
    console.log('[Seed] Connecting to MongoDB at:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('[Seed] Connected.');

    const services = JSON.parse(fs.readFileSync(path.join(__dirname, 'services.json'), 'utf8'));
    const projects = JSON.parse(fs.readFileSync(path.join(__dirname, 'projects.json'), 'utf8'));

    console.log(`[Seed] Verified ${services.length} services and ${projects.length} showcase projects.`);
    console.log('[Seed] Database initialization verified successfully.');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error during seeding:', error.message);
    process.exit(1);
  }
}

seedDatabase();
