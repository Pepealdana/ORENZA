import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Activity from '../models/Activity.js';

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

const demoActivities = [
  {
    activityId: 'emociones-basicas',
    title: 'Reconociendo mis emociones',
    description: 'Actividad introductoria para identificar y nombrar emociones.',
    category: 'emocional',
    instructions: 'Identifica la emoción que mejor representa cómo te sientes y registra una breve reflexión.',
    estimatedTime: 10,
    order: 1,
    active: true,
  },
  {
    activityId: 'autoconocimiento',
    title: 'Conociéndome mejor',
    description: 'Ejercicio de reflexión orientado al autoconocimiento.',
    category: 'personal',
    instructions: 'Responde las preguntas de reflexión con honestidad y respeto por tu propio proceso.',
    estimatedTime: 15,
    order: 2,
    active: true,
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

for (const activity of demoActivities) {
  await Activity.findOneAndUpdate(
    { activityId: activity.activityId },
    activity,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}

console.log('Usuarios demo listos:');
for (const item of demoUsers) {
  console.log(`- ${item.role}: ${item.email} / ${item.password}`);
}

console.log('Actividades demo listas:');
for (const item of demoActivities) {
  console.log(`- ${item.activityId}: ${item.title}`);
}

await mongoose.disconnect();
