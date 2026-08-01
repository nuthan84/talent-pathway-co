const mongoose = require('mongoose');

async function connectDB() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/talent_pathway';
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    // Fail loudly on startup instead of silently running with no DB.
    process.exit(1);
  }
}

module.exports = connectDB;
