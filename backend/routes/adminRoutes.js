const express = require('express');
const { listProviders, getProvider, updateStatus } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Every route here requires a logged-in admin.
router.use(protect, authorize('admin'));

router.get('/providers', listProviders);
router.get('/providers/:id', getProvider);
router.put('/providers/:id/status', updateStatus);

module.exports = router;
