import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Activity from '../models/Activity.js';
import Institution from '../models/Institution.js';
import demoActivities from '../data/activities.seed.js';

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

await Institution.findOneAndUpdate(
  { code: 'ORENZA-DEMO' },
  { name: 'ORENZA Demo', code: 'ORENZA-DEMO', active: true },
  { upsert: true, new: true, setDefaultsOnInsert: true }
);

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

// Limpia únicamente datos de prueba generados por el smoke test.
await User.deleteMany({ email: /^smoke-.*@orenza\.local$/i });
await Activity.deleteMany({ activityId: /^smoke-activity-/i });

const demoActivityIds = demoActivities.map((activity) => activity.id);

// El seed representa un estado demo limpio: cualquier actividad fuera del catálogo
// oficial queda inactiva para no contaminar el catálogo activo de 28 experiencias.
await Activity.updateMany(
  { activityId: { $nin: demoActivityIds } },
  { $set: { active: false } }
);

await Activity.updateMany(
  { activityId: { $in: ['emociones-basicas', 'autoconocimiento'] } },
  { $set: { active: false } }
);

for (const [index, activity] of demoActivities.entries()) {
  await Activity.findOneAndUpdate(
    { activityId: activity.id },
    {
      activityId: activity.id,
      title: activity.title,
      description: activity.description,
      purpose: activity.purpose,
      type: activity.type,
      category: activity.competencies?.primary || 'general',
      instructions: activity.purpose || activity.description,
      estimatedTime: activity.estimatedTime,
      ageRange: activity.ageRange,
      competencies: activity.competencies,
      emotions: activity.emotions,
      difficulty: activity.difficulty,
      repeatable: activity.repeatable,
      steps: activity.steps,
      order: index + 1,
      version: 1,
      active: true,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}

console.log('Usuarios demo listos:');
for (const item of demoUsers) {
  console.log(`- ${item.role}: ${item.email} / ${item.password}`);
}

console.log('Actividades demo listas:');
for (const item of demoActivities) {
  console.log(`- ${item.id}: ${item.title}`);
}

await mongoose.disconnect();
