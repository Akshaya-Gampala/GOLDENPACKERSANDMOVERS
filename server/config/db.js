const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/golden_packers';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    console.log(`[MongoDB Atlas] Connected successfully to host: ${conn.connection.host}`);
    console.log(`[MongoDB Atlas] Database Name: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    isConnected = false;
    console.error('----------------------------------------------------');
    console.error('[MongoDB Error] Database connection failed:');
    console.error(`Message: ${error.message}`);
    console.error('Please verify your MONGODB_URI in server/.env file.');
    console.error('If using MongoDB Atlas:');
    console.error(' 1. Ensure IP address 0.0.0.0/0 is whitelisted in Network Access.');
    console.error(' 2. Verify database username and password in connection string.');
    console.error('----------------------------------------------------');
    return null;
  }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };
