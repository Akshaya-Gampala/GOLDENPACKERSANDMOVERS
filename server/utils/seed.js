const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Admin = require('../models/Admin');
const GalleryItem = require('../models/GalleryItem');
const QuoteRequest = require('../models/QuoteRequest');

const seedData = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/golden_packers';
    console.log('Connecting to MongoDB for database seeding...');
    await mongoose.connect(uri);

    // 1. Seed Admin User
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@goldenpackers.com').toLowerCase();
    const adminExists = await Admin.findOne({ email: adminEmail });

    if (!adminExists) {
      const newAdmin = new Admin({
        name: process.env.ADMIN_NAME || 'Golden Admin',
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || 'GoldenPackers@2026',
        role: 'admin',
      });
      await newAdmin.save();
      console.log(`[Seed Success] Default Admin created with email: ${adminEmail}`);
    } else {
      console.log(`[Seed Info] Admin already exists: ${adminEmail}`);
    }

    // 2. Seed Sample Gallery Items if empty
    const galleryCount = await GalleryItem.countDocuments();
    if (galleryCount === 0) {
      const sampleGallery = [
        {
          title: 'Premium Household Furniture Packing',
          description: 'Multi-layer bubble wrapping and corrugated box packing for luxury sofa and wooden items.',
          category: 'Packing',
          imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
          date: '2026-08-15',
          isFeatured: true,
        },
        {
          title: 'Safe Container Truck Loading',
          description: 'Systematic loading using hydraulic ramp and heavy duty straps for zero-damage transit.',
          category: 'Loading',
          imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
          date: '2026-08-20',
          isFeatured: true,
        },
        {
          title: 'Inter-City Highway Transportation',
          description: 'GPS tracked closed-container moving vehicle on long-distance route.',
          category: 'Transportation',
          imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
          date: '2026-08-25',
          isFeatured: true,
        },
        {
          title: 'Careful Delicate Electronics Unloading',
          description: 'Professional unboxing and room-wise placement for OLED TVs and home appliances.',
          category: 'Unloading',
          imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
          date: '2026-09-01',
          isFeatured: false,
        },
        {
          title: '3BHK Villa House Relocation',
          description: 'End-to-end villa relocation completed in less than 8 hours with full setup.',
          category: 'House Shifting',
          imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
          date: '2026-09-05',
          isFeatured: true,
        },
        {
          title: 'Corporate IT Office Relocation',
          description: 'Desktop server rack relocation and workstation setup for 50+ employees.',
          category: 'Office Shifting',
          imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
          date: '2026-09-10',
          isFeatured: true,
        },
        {
          title: 'Enclosed Luxury Car Carrier Transport',
          description: 'Specialized hydraulic car carrier transport with scratch-proof covering.',
          category: 'Vehicle Moving',
          imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
          date: '2026-09-12',
          isFeatured: false,
        },
        {
          title: 'Completed Gated Community Project',
          description: '100% satisfied customer move into premium residential tower.',
          category: 'Completed Projects',
          imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
          date: '2026-09-14',
          isFeatured: true,
        },
      ];

      await GalleryItem.insertMany(sampleGallery);
      console.log('[Seed Success] 8 Sample Work Experience photos seeded into Gallery!');
    }

    // 3. Seed Sample Quote Requests if empty
    const quoteCount = await QuoteRequest.countDocuments();
    if (quoteCount === 0) {
      const sampleQuotes = [
        {
          name: 'Rajesh Sharma',
          phone: '+91 98765 43210',
          email: 'rajesh.sharma@example.com',
          movingFrom: 'HSR Layout, Bengaluru',
          movingTo: 'Banjara Hills, Hyderabad',
          movingDate: '2026-09-28',
          propertyType: '3 BHK Independent House',
          rooms: '3 BHK',
          service: 'Household Shifting',
          items: 'Sofa set, 3 Beds, Dining Table, Washing Machine, 2 TVs',
          message: 'Need urgent relocation with insurance coverage.',
          status: 'New',
        },
        {
          name: 'Priya Sundaram',
          phone: '+91 98123 76543',
          email: 'priya.s@example.com',
          movingFrom: 'Whitefield, Bengaluru',
          movingTo: 'Koramangala, Bengaluru',
          movingDate: '2026-10-02',
          propertyType: '2 BHK Apartment',
          rooms: '2 BHK',
          service: 'Local Shifting',
          items: 'Basic household furniture and kitchen boxes',
          message: 'Weekend shifting preferred.',
          status: 'Contacted',
        },
      ];

      await QuoteRequest.insertMany(sampleQuotes);
      console.log('[Seed Success] Sample quote requests created!');
    }

    console.log('[Seed Complete] Database seeding process finished successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Database seeding failed:', error.message);
    process.exit(1);
  }
};

seedData();
