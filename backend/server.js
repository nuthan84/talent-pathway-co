const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const providerRoutes = require('./routes/providerRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// --- Middleware ---
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://talent-pathway-co.vercel.app',
  /\.vercel\.app$/, // Allows all Vercel preview URLs
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Serve uploaded documents statically. NOTE: ephemeral on Render free tier — see middleware/upload.js.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Routes ---
app.get('/', (req, res) => {
  res.send('Talent Pathway Backend API is running!');
});

app.get('/api/health', (req, res) => {
  res.json({ message: 'Talent Pathway API is running smoothly' });
});

app.use('/api/auth', authRoutes);
app.use('/api/provider', providerRoutes);
app.use('/api/admin', adminRoutes);

// --- Error handling ---
// Multer errors (bad file type, too large) land here if not caught upstream.
app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

// 404 fallback for unmatched API routes.
app.use((req, res) => {
  res.status(404).json({ error: `No route for ${req.method} ${req.originalUrl}` });
});

// --- Start ---
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
