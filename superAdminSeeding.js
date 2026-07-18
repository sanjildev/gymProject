const connectDB = require('./config/db');
const User = require('./models/User');

require('dotenv').config()

const seedSuperAdmin = async () => {
  await connectDB()
  const existingSuperAdmin = await User.findOne({ role: 'Super Admin' });
  if (existingSuperAdmin) {
    console.log('Super Admin already exists');
  } else {
    await User.create({
      name: process.env.SUPERADMIN_NAME,
      email: process.env.SUPERADMIN_EMAIL,
      password: process.env.SUPERADMIN_PASSWORD,
      role: 'Super Admin'
    })
    console.log('Super Admin created successfully')
  }
  process.exit();
}

seedSuperAdmin();