const mongoose = require('mongoose');

const GalleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Packing',
        'Loading',
        'Transportation',
        'Unloading',
        'House Shifting',
        'Office Shifting',
        'Vehicle Moving',
        'Completed Projects',
      ],
      default: 'House Shifting',
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL or file is required'],
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

GalleryItemSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model('GalleryItem', GalleryItemSchema, 'galleryItems');
