// One-time script to create an admin account.
// There's no admin self-registration route on purpose — you don't want
// random people signing up as admin through a public form.
//
// Usage (from the backend/ folder, with MONGO_URI and JWT_SECRET set in .env):
//   node seed-admin.js "Admin Name" admin@example.com "SomeStrongPassword123" "+919999999999"

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function run() {
  const [, , name, email, password, phone] = process.argv;

  if (!name || !email || !password || !phone) {
    console.error('Usage: node seed-admin.js "Name" email@example.com password "+91XXXXXXXXXX"');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    console.log(`A user with email ${email} already exists (role: ${existing.role}). No changes made.`);
    process.exit(0);
  }

  const admin = await User.create({ name, email, password, phone, role: 'admin' });
  console.log(`Admin account created: ${admin.email} (id: ${admin._id})`);
  process.exit(0);
}

run().catch((err) => {
  console.error('Failed to seed admin:', err.message);
  process.exit(1);
});
