const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Allowed Origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://talent-pathway-co.vercel.app',
  /\.vercel\.app$/ // Allows all Vercel preview URLs
];

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Talent Pathway Backend API is running!');
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/talent_pathway';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Provider Schema
const ProviderSchema = new mongoose.Schema({
  name: String,
  email: String,
  category: String,
  skills: [String],
  experienceYears: Number,
  location: String,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  rejectionRemarks: String,
  createdAt: { type: Date, default: Date.now }
});

const Provider = mongoose.model('Provider', ProviderSchema);

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'Talent Pathway API is running smoothly' });
});

// Admin: Get all providers
app.get('/api/admin/providers', async (req, res) => {
  try {
    const providers = await Provider.find();
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update provider status
app.put('/api/admin/providers/:id/status', async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      { status, rejectionRemarks: remarks },
      { new: true }
    );
    res.json(provider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
