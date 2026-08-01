const mongoose = require('mongoose');

// Mirrors ApplicationStatus in src/types/index.ts on the frontend.
const APPLICATION_STATUSES = ['draft', 'submitted', 'under_review', 'documents_verified', 'approved', 'rejected'];
const DOCUMENT_STATUSES = ['missing', 'uploaded', 'verifying', 'verified', 'rejected'];

const DocumentSchema = new mongoose.Schema(
  {
    label: { type: String, required: true }, // e.g. "Aadhaar Card"
    hint: { type: String, default: '' },
    required: { type: Boolean, default: true },
    status: { type: String, enum: DOCUMENT_STATUSES, default: 'missing' },
    fileName: { type: String },
    filePath: { type: String }, // server-relative path under /uploads
    type: { type: String, enum: ['image', 'pdf'], default: 'image' },
  },
  { _id: false }
);

const ProviderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

    // Step 1: personal details
    city: { type: String, default: '' },
    state: { type: String, default: '' },

    // Step 2 + 3: category, skills, experience
    category: { type: String, default: '' },
    skills: { type: [String], default: [] },
    experienceYears: { type: Number, default: 0 },
    bio: { type: String, default: '' },
    languages: { type: [String], default: [] },

    // Step 4: service area (kept simple — a radius in km around city)
    serviceRadiusKm: { type: Number, default: 5 },

    // Step 5: documents
    documents: { type: [DocumentSchema], default: [] },

    // Step 6: bank details (masked on the way out — see toJSON below)
    bankAccountNumber: { type: String, default: '' },
    bankIfsc: { type: String, default: '' },

    // Application status
    status: { type: String, enum: APPLICATION_STATUSES, default: 'draft' },
    rejectionRemarks: { type: String, default: '' },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Never return a full bank account number in an API response — mask it.
ProviderSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  if (obj.bankAccountNumber) {
    obj.bankAccountNumber = `••••${obj.bankAccountNumber.slice(-4)}`;
  }
  return obj;
};

module.exports = mongoose.model('Provider', ProviderSchema);
module.exports.APPLICATION_STATUSES = APPLICATION_STATUSES;
module.exports.DOCUMENT_STATUSES = DOCUMENT_STATUSES;
