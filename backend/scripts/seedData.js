// scripts/seedData.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectMongoDB } from '../src/config/db.js';
import User from '../src/models/User.js';
import Alert from '../src/models/Alert.js';
import Setting from '../src/models/Setting.js';
import Metric from '../src/models/Metric.js';
import SystemStatus from '../src/models/SystemStatus.js';
import SIEMService from '../src/services/siemService.js';

const seedData = async () => {
  await connectMongoDB();

  // Create Admin User
  const hashedPassword = await bcrypt.hash('password123', 12);
  await User.create({
    username: 'admin',
    email: 'admin@company.com',
    password: hashedPassword,
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
  });

  console.log('✅ Admin created: admin@company.com / password123');

  // Create Settings for Admin
  await Setting.create({
    userId: (await User.findOne({ email: 'admin@company.com' }))._id,
  });

  // Generate Sample Alerts
  await SIEMService.generateSampleData(25);

  // Create Sample Metrics
  await Metric.create({
    type: 'system',
    uptime: 99.9,
    totalEvents: 1250,
    threatsBlocked: 15,
  });

  // Create System Status
  await SystemStatus.create({});

  console.log('✅ SEED DATA COMPLETE!');
  process.exit(0);
};

seedData().catch(console.error);