const express = require('express');
const {
  getProfile,
  updateProfile,
  uploadDocument,
  submitApplication,
} = require('../controllers/providerController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Every route here requires a logged-in provider.
router.use(protect, authorize('provider'));

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/documents', upload.single('document'), uploadDocument);
router.post('/submit', submitApplication);

module.exports = router;
