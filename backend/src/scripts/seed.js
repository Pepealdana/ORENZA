import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';

const demoUsers = [
  {
    name: 'Administrador ORENZA',
    email: process.env.SEED_ADMIN_EMAIL || 'admin@orenza.local',
    password: process.env.SEED_ADMIN_PASSWORD || 'Admin1234!',
    role: 'admin',
    institution: 'ORENZA Demo',
  },
  {
    name: 'Orientador ORENZA',
    email: process.env.SEED_COUNSELOR_EMAIL || 'orientador@orenza.local',
    password: process.env.SEED_COUNSELOR_PASSWORD || 'Orientador1234!',
    role: 'counselor',
    institution: 'ORENZA Demo',
  },
  {
    name: 'Estudiante Demo',
    email: process.env.SEED_STUDENT_EMAIL || 'estudiante@orenza.local',
    password: process.env.SEED_STUDENT_PASSWORD || 'Estudiante1234!',
    role: 'student',
    grade: '10°',
    institution: 'ORENZA Demo',
  },
];

await connectDB();

for (const item of demoUsers) {
  const password = await bcrypt.hash(item.password, 12);
  await User.findOneAndUpdate(
    { email: item.email.toLowerCase() },
    {
      ...item,
      email: item.email.toLowerCase(),
      password,
      active: true,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}

console.log('Usuarios demo listos:');
for (const item of demoUsers) {
  console.log(`- ${item.role}: ${item.email} / ${item.password}`);
}

await mongoose.disconnect();
