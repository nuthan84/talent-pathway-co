const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// NOTE: this writes to local disk. On Render's free tier the filesystem is
// ephemeral — anything written here is wiped on every redeploy or restart.
// Fine for a demo/interview; a real deployment should swap this storage
// engine for S3 / Cloudinary and keep the rest of the code unchanged.
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${req.user.id}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      return cb(new Error('Only JPG, PNG, or PDF files are allowed'));
    }
    cb(null, true);
  },
});

module.exports = upload;
