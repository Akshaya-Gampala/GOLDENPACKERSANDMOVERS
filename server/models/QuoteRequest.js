const mongoose = require('mongoose');

const QuoteRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    movingFrom: {
      type: String,
      required: [true, 'Pickup location is required'],
      trim: true,
    },
    movingTo: {
      type: String,
      required: [true, 'Destination location is required'],
      trim: true,
    },
    movingDate: {
      type: String,
      required: [true, 'Moving date is required'],
    },
    propertyType: {
      type: String,
      default: 'Apartment',
    },
    rooms: {
      type: String,
      default: '2 BHK',
    },
    service: {
      type: String,
      required: [true, 'Required service is required'],
      default: 'Household Shifting',
    },
    items: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Progress', 'Completed', 'Cancelled'],
      default: 'New',
    },
    notes: {
      type: String,
      default: '',
    }
  },
  {
    timestamps: true,
  }
);

QuoteRequestSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('QuoteRequest', QuoteRequestSchema, 'quoteRequests');
