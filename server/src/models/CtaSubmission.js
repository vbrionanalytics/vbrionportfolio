const mongoose = require('mongoose');

const CtaSubmissionSchema = new mongoose.Schema(
  {
    _id: {
      type: String
    },
    ctaType: {
      type: String,
      enum: ['contact_form', 'discovery_call', 'newsletter', 'deck_download', 'careers_apply', 'service_inquiry', 'quick_action', 'general_cta'],
      default: 'contact_form'
    },
    name: {
      type: String,
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [30, 'Phone cannot exceed 30 characters']
    },
    company: {
      type: String,
      trim: true,
      maxlength: [120, 'Company cannot exceed 120 characters']
    },
    service: {
      type: String,
      trim: true,
      default: 'General Strategic Advisory'
    },
    engagementType: {
      type: String,
      enum: ['rfp', 'governance', 'ai', 'talent', 'general', 'download', 'newsletter', 'custom'],
      default: 'general'
    },
    message: {
      type: String,
      trim: true,
      maxlength: [3000, 'Message cannot exceed 3000 characters']
    },
    ctaSource: {
      type: String,
      trim: true,
      default: 'website'
    },
    ctaLabel: {
      type: String,
      trim: true
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    ipAddress: {
      type: String
    },
    userAgent: {
      type: String
    },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'contacted', 'qualified', 'converted', 'archived'],
      default: 'new'
    },
    notes: [
      {
        text: String,
        author: { type: String, default: 'System' },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  {
    timestamps: true
  }
);

CtaSubmissionSchema.index({ email: 1 });
CtaSubmissionSchema.index({ ctaType: 1 });
CtaSubmissionSchema.index({ status: 1 });
CtaSubmissionSchema.index({ createdAt: -1 });

module.exports = mongoose.model('CtaSubmission', CtaSubmissionSchema);
