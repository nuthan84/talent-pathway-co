const Provider = require('../models/Provider');

// Fields the onboarding wizard is allowed to update directly.
const EDITABLE_FIELDS = [
  'city', 'state', 'category', 'skills', 'experienceYears',
  'bio', 'languages', 'serviceRadiusKm', 'bankAccountNumber', 'bankIfsc',
];

// GET /api/provider/profile
async function getProfile(req, res) {
  const profile = await Provider.findOne({ user: req.user.id });
  if (!profile) return res.status(404).json({ error: 'Provider profile not found' });
  res.json(profile);
}

// PUT /api/provider/profile
async function updateProfile(req, res) {
  const profile = await Provider.findOne({ user: req.user.id });
  if (!profile) return res.status(404).json({ error: 'Provider profile not found' });

  // Only allow the wizard to update known, safe fields — never let the client
  // set status, rejectionRemarks, rating, or documents directly through this route.
  for (const field of EDITABLE_FIELDS) {
    if (req.body[field] !== undefined) {
      profile[field] = req.body[field];
    }
  }

  await profile.save();
  res.json(profile);
}

// POST /api/provider/documents  (multipart/form-data, field name: "document")
async function uploadDocument(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const { label } = req.body;
  if (!label) {
    return res.status(400).json({ error: 'A document label is required (e.g. "Aadhaar Card")' });
  }

  const profile = await Provider.findOne({ user: req.user.id });
  if (!profile) return res.status(404).json({ error: 'Provider profile not found' });

  const docType = req.file.mimetype === 'application/pdf' ? 'pdf' : 'image';
  const existingIndex = profile.documents.findIndex((d) => d.label === label);

  const docEntry = {
    label,
    hint: '',
    required: true,
    status: 'uploaded',
    fileName: req.file.originalname,
    filePath: `/uploads/${req.file.filename}`,
    type: docType,
  };

  if (existingIndex >= 0) {
    profile.documents[existingIndex] = docEntry;
  } else {
    profile.documents.push(docEntry);
  }

  await profile.save();
  res.status(201).json(profile);
}

// POST /api/provider/submit
async function submitApplication(req, res) {
  const profile = await Provider.findOne({ user: req.user.id });
  if (!profile) return res.status(404).json({ error: 'Provider profile not found' });

  if (profile.status !== 'draft') {
    return res.status(400).json({ error: `Application already ${profile.status}, cannot resubmit` });
  }

  profile.status = 'submitted';
  await profile.save();
  res.json(profile);
}

module.exports = { getProfile, updateProfile, uploadDocument, submitApplication };
