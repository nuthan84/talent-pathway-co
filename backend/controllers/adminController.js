const Provider = require('../models/Provider');
const { APPLICATION_STATUSES } = require('../models/Provider');

// GET /api/admin/providers?status=submitted&category=Electrician&search=ramesh
async function listProviders(req, res) {
  const { status, category, search } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (category) filter.category = category;

  let providers = await Provider.find(filter).populate('user', 'name email phone');

  // Simple in-memory search on populated name/email — fine at this data volume,
  // would move to a Mongo text index or Atlas Search if this grew significantly.
  if (search) {
    const term = search.toLowerCase();
    providers = providers.filter(
      (p) =>
        p.user?.name?.toLowerCase().includes(term) ||
        p.user?.email?.toLowerCase().includes(term)
    );
  }

  res.json(providers);
}

// GET /api/admin/providers/:id
async function getProvider(req, res) {
  const provider = await Provider.findById(req.params.id).populate('user', 'name email phone');
  if (!provider) return res.status(404).json({ error: 'Provider not found' });
  res.json(provider);
}

// PUT /api/admin/providers/:id/status
async function updateStatus(req, res) {
  const { status, remarks } = req.body;

  if (!APPLICATION_STATUSES.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${APPLICATION_STATUSES.join(', ')}` });
  }

  const provider = await Provider.findByIdAndUpdate(
    req.params.id,
    { status, rejectionRemarks: status === 'rejected' ? (remarks || '') : '' },
    { new: true }
  ).populate('user', 'name email phone');

  if (!provider) return res.status(404).json({ error: 'Provider not found' });
  res.json(provider);
}

module.exports = { listProviders, getProvider, updateStatus };
