import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Activity from '../models/Activity.js';
import ActivityProgress from '../models/ActivityProgress.js';
import CheckIn from '../models/CheckIn.js';

const API = process.env.API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const response = await fetch(API + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`${options.method || 'GET'} ${path} -> ${response.status}: ${data.message || 'error'}`);
  return data;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const unique = Date.now();
const studentEmail = `smoke-${unique}@orenza.local`;
const otherStudentEmail = `smoke-other-${unique}@orenza.local`;
const otherInstitutionCode = `SMOKE-${unique}`;

async function cleanup() {
  try {
    await connectDB();
    const smokeUsers = await User.find({ email: { $in: [studentEmail, otherStudentEmail] } }).select('_id');
    for (const smokeUser of smokeUsers) {
      await Promise.all([
        CheckIn.deleteMany({ user: smokeUser._id }),
        ActivityProgress.deleteMany({ user: smokeUser._id }),
        User.deleteOne({ _id: smokeUser._id }),
      ]);
    }
    await mongoose.connection.collection('institutions').deleteMany({ code: otherInstitutionCode });
    await Activity.deleteMany({ activityId: { $regex: `^smoke-activity-${unique}` } });
  } catch (error) {
    console.error('No fue posible limpiar los datos del smoke test:', error.message);
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

async function run() {
  const health = await request('/health');
  assert(health.ok === true, 'Health check falló');

  const registered = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Smoke Student',
      email: studentEmail,
      password: 'Smoke1234!',
      grade: '10°',
    }),
  });
  assert(registered.token && registered.user.role === 'student', 'Registro/JWT falló');

  const token = registered.token;
  const smokeStudentId = registered.user.id;
  const auth = { Authorization: `Bearer ${token}` };

  const me = await request('/auth/me', { headers: auth });
  assert(me.user.email === studentEmail, 'GET /me falló');

  const profile = await request('/student/profile', { headers: auth });
  assert(profile.user.email === studentEmail, 'Perfil no consultable');

  const updatedProfile = await request('/student/profile', {
    method: 'PATCH',
    headers: auth,
    body: JSON.stringify({ name: 'Smoke Student Updated', institution: 'ORENZA Test' }),
  });
  assert(updatedProfile.user.name === 'Smoke Student Updated', 'Perfil no actualizable');

  const date = new Date().toISOString().slice(0, 10);
  const checkIn = await request('/student/check-ins', {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({
      date,
      mood: 'good',
      emotion: 'tranquilidad',
      intensity: 4,
      note: 'Prueba de integración',
    }),
  });
  assert(checkIn.item && checkIn.item.date === date, 'Check-in no creado');

  const checkInOne = await request(`/student/check-ins/${checkIn.item._id}`, { headers: auth });
  assert(checkInOne.item._id === checkIn.item._id, 'GET check-in individual falló');

  const updatedCheckIn = await request(`/student/check-ins/${checkIn.item._id}`, {
    method: 'PATCH',
    headers: auth,
    body: JSON.stringify({ mood: 'regular', intensity: 3 }),
  });
  assert(updatedCheckIn.item.mood === 'regular' && updatedCheckIn.item.intensity === 3, 'Check-in no actualizable');

  const checkIns = await request('/student/check-ins', { headers: auth });
  assert(checkIns.items.some((item) => item._id === checkIn.item._id), 'Check-in no consultable');

  const activityCatalog = await request('/activities', { headers: auth });
  assert(Array.isArray(activityCatalog.activities), 'Catálogo de actividades no consultable');
  assert(activityCatalog.activities.length === 28, `El catálogo activo debe tener 28 actividades y tiene ${activityCatalog.activities.length}`);
  const catalogActivity = activityCatalog.activities.find((item) => item.activityId === 'reconociendo-mis-fortalezas');
  assert(catalogActivity && catalogActivity.steps?.length === 3, 'La actividad del catálogo no conserva sus pasos');
  assert(catalogActivity.competencies?.primary === 'autoconocimiento', 'La actividad no conserva sus competencias');

  const activityId = `smoke-activity-${unique}`;

  const adminLogin = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: process.env.SEED_ADMIN_EMAIL || 'admin@orenza.local',
      password: process.env.SEED_ADMIN_PASSWORD || 'Admin1234!',
    }),
  });
  const adminHeaders = { Authorization: `Bearer ${adminLogin.token}` };

  const institutions = await request('/admin/institutions?limit=100&active=true', { headers: adminHeaders });
  assert(institutions.institutions.some((item) => item.name === 'ORENZA Demo'), 'La institución demo no está disponible');

  const assignedStudent = await request('/admin/users/' + smokeStudentId, {
    method: 'PATCH',
    headers: adminHeaders,
    body: JSON.stringify({ institution: 'ORENZA Demo' }),
  });
  assert(assignedStudent.user.institution === 'ORENZA Demo', 'No fue posible asignar la institución al estudiante');

  const otherInstitution = await request('/admin/institutions', {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({ name: 'Smoke Other Institution', code: otherInstitutionCode }),
  });
  assert(otherInstitution.institution.code === otherInstitutionCode, 'Institución de aislamiento no creada');

  const otherStudent = await request('/admin/users', {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({
      name: 'Smoke Other Student',
      email: otherStudentEmail,
      password: 'Smoke1234!',
      role: 'student',
      institution: 'Smoke Other Institution',
    }),
  });
  assert(otherStudent.user.institution === 'Smoke Other Institution', 'Usuario de otra institución no creado');

  let emptyActivityRejected = false;
  try {
    await request('/activities', {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify({
        activityId: activityId + '-invalid',
        title: 'Invalid Smoke Activity',
        description: 'No debe crearse sin pasos.',
        category: 'testing',
        instructions: 'Prueba de validación.',
        estimatedTime: 5,
        order: 998,
      }),
    });
  } catch (error) {
    emptyActivityRejected = error.message.includes('-> 400:');
  }
  assert(emptyActivityRejected, 'Una actividad activa sin pasos debe ser rechazada');

  const createdActivity = await request('/activities', {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({
      activityId,
      title: 'Smoke Activity',
      description: 'Actividad temporal de integración.',
      category: 'testing',
      instructions: 'Completar la prueba.',
      estimatedTime: 5,
      order: 999,
      repeatable: false,
      steps: [
        {
          id: 'step1',
          type: 'reflection',
          question: '¿Qué aprendiste en esta prueba?',
          responseType: 'textarea',
        },
      ],
    }),
  });
  assert(createdActivity.activity.activityId === activityId, 'Actividad no creada');

  const activityOne = await request(`/activities/${createdActivity.activity.id}`, { headers: auth });
  assert(activityOne.activity.activityId === activityId, 'GET actividad individual falló');

  const updatedActivity = await request(`/activities/${createdActivity.activity.id}`, {
    method: 'PATCH',
    headers: adminHeaders,
    body: JSON.stringify({ title: 'Smoke Activity Updated', active: true }),
  });
  assert(updatedActivity.activity.title === 'Smoke Activity Updated', 'Actividad no actualizable');

  const progress = await request('/student/activities/progress', {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({
      activityId,
      status: 'in-progress',
      answers: { step1: 'avance' },
    }),
  });
  assert(progress.item.status === 'in-progress', 'Progreso no creado');

  const progressOne = await request(`/student/activities/progress/${activityId}`, { headers: auth });
  assert(progressOne.item.activityId === activityId, 'GET progreso individual falló');

  const completed = await request(`/student/activities/progress/${activityId}`, {
    method: 'PATCH',
    headers: auth,
    body: JSON.stringify({
      status: 'completed',
      answers: { step1: 'avance', step2: 'final' },
    }),
  });
  assert(completed.item.status === 'completed' && completed.item.completedAt, 'Actividad no actualizable/finalizable');

  let nonRepeatableRejected = false;
  try {
    await request('/student/activities/progress/' + activityId, {
      method: 'PATCH',
      headers: auth,
      body: JSON.stringify({
        status: 'completed',
        answers: { step1: 'no debe modificarse' },
      }),
    });
  } catch (error) {
    nonRepeatableRejected = error.message.includes('-> 409:');
  }
  assert(nonRepeatableRejected, 'Una actividad no repetible ya completada debe rechazar una nueva actualización');

  const history = await request('/student/activities/progress', { headers: auth });
  assert(history.items.some((item) => item.activityId === activityId && item.status === 'completed'), 'Historial no consultable');

  const stats = await request('/admin/stats', { headers: adminHeaders });
  assert(typeof stats.stats.total === 'number', 'Estadísticas de administrador fallaron');

  const counselorLogin = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: process.env.SEED_COUNSELOR_EMAIL || 'orientador@orenza.local',
      password: process.env.SEED_COUNSELOR_PASSWORD || 'Orientador1234!',
    }),
  });
  const counselorHeaders = { Authorization: `Bearer ${counselorLogin.token}` };

  const overview = await request('/counselor/overview', { headers: counselorHeaders });
  assert(Array.isArray(overview.students), 'Consulta del orientador falló');
  const smokeStudent = overview.students.find((student) => String(student.id) === String(smokeStudentId));
  assert(smokeStudent && smokeStudent.completedActivities === 1, 'El resumen del orientador no refleja el seguimiento del estudiante');

  const counselorDetail = await request(`/counselor/students/${smokeStudentId}`, {
    headers: counselorHeaders,
  });
  assert(counselorDetail.student.email === studentEmail, 'Detalle del estudiante no consultable por el orientador');
  assert(counselorDetail.checkIns.length === 1, 'El detalle del orientador no incluye el check-in');
  assert(counselorDetail.checkIns[0].note === undefined, 'El orientador no debe recibir la reflexión privada del check-in');
  assert(counselorDetail.activities.length === 1, 'El detalle del orientador no incluye la experiencia');
  assert(counselorDetail.activities[0].activityTitle === 'Smoke Activity Updated', 'El detalle del orientador no incluye el título de la experiencia');
  assert(counselorDetail.activities[0].answers === undefined, 'El orientador no debe recibir las respuestas privadas de la experiencia');

  const counselorCheckIns = await request(`/counselor/students/${smokeStudentId}/check-ins`, {
    headers: counselorHeaders,
  });
  assert(counselorCheckIns.items.length === 1 && counselorCheckIns.items[0].note === undefined, 'El endpoint de check-ins del orientador expone contenido privado');

  const counselorActivities = await request(`/counselor/students/${smokeStudentId}/activity-progress`, {
    headers: counselorHeaders,
  });
  assert(counselorActivities.items.length === 1 && counselorActivities.items[0].activityTitle === 'Smoke Activity Updated', 'El endpoint de actividades del orientador no devuelve el resumen esperado');
  assert(counselorActivities.items[0].answers === undefined, 'El endpoint de actividades del orientador expone respuestas privadas');

  let counselorCannotEditStudent = false;
  try {
    await request('/student/profile', {
      method: 'PATCH',
      headers: counselorHeaders,
      body: JSON.stringify({ name: 'No debe cambiar' }),
    });
  } catch (error) {
    counselorCannotEditStudent = error.message.includes('-> 403:');
  }
  assert(counselorCannotEditStudent, 'El orientador no debe poder modificar el perfil de un estudiante');

  let counselorCannotCreateCheckIn = false;
  try {
    await request('/student/check-ins', {
      method: 'POST',
      headers: counselorHeaders,
      body: JSON.stringify({
        date: new Date().toISOString().slice(0, 10),
        mood: 'good',
        emotion: 'tranquilidad',
        intensity: 3,
      }),
    });
  } catch (error) {
    counselorCannotCreateCheckIn = error.message.includes('-> 403:');
  }
  assert(counselorCannotCreateCheckIn, 'El orientador no debe poder crear registros emocionales');

  let crossInstitutionBlocked = false;
  try {
    await request('/counselor/students/' + otherStudent.user.id, { headers: counselorHeaders });
  } catch (error) {
    crossInstitutionBlocked = error.message.includes('-> 404:');
  }
  assert(crossInstitutionBlocked, 'El orientador no debe consultar estudiantes de otra institución');

  const auditLogs = await request('/admin/audit-logs?limit=100', { headers: adminHeaders });
  assert(Array.isArray(auditLogs.logs) && auditLogs.logs.length > 0, 'La auditoría no registra operaciones administrativas');

  const deletedProgress = await request('/student/activities/progress/' + activityId, {
    method: 'DELETE',
    headers: auth,
  });
  assert(deletedProgress.item.activityId === activityId, 'Progreso no eliminable');

  const progressAfterDelete = await request('/student/activities/progress/' + activityId, { headers: auth });
  assert(progressAfterDelete.item === null, 'El progreso eliminado sigue disponible');

  const deletedActivity = await request('/activities/' + createdActivity.activity.id, {
    method: 'DELETE',
    headers: adminHeaders,
  });
  assert(deletedActivity.activity.active === false, 'Actividad no desactivable');

  let inactiveProgressRejected = false;
  try {
    await request('/student/activities/progress', {
      method: 'POST',
      headers: auth,
      body: JSON.stringify({
        activityId,
        status: 'in-progress',
        answers: { step1: 'no debe guardarse' },
      }),
    });
  } catch (error) {
    inactiveProgressRejected = error.message.includes('-> 404:');
  }
  assert(inactiveProgressRejected, 'Una actividad inactiva no debe aceptar nuevo progreso');

  console.log('Smoke test ORENZA: OK');
  console.log(`Usuario de prueba creado: ${studentEmail}`);

}

try {
  await run();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await cleanup();
}
