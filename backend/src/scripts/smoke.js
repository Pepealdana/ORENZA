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
assert(checkIn.item && checkIn.item.date === date, 'Check-in no guardado');

const checkIns = await request('/student/check-ins', { headers: auth });
assert(checkIns.items.some((item) => item.date === date), 'Check-in no consultable');

const progress = await request('/student/activities/progress', {
  method: 'POST',
  headers: auth,
  body: JSON.stringify({
    activityId: 'smoke-activity',
    status: 'in-progress',
    answers: { step1: 'avance' },
  }),
});
assert(progress.item.status === 'in-progress', 'Progreso no guardado');

const completed = await request('/student/activities/progress', {
  method: 'POST',
  headers: auth,
  body: JSON.stringify({
    activityId: 'smoke-activity',
    status: 'completed',
    answers: { step1: 'avance', step2: 'final' },
  }),
});
assert(completed.item.status === 'completed' && completed.item.completedAt, 'Actividad no finalizada');

const history = await request('/student/activities/progress', { headers: auth });
assert(history.items.some((item) => item.activityId === 'smoke-activity' && item.status === 'completed'), 'Historial no consultable');

const adminLogin = await request('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email: process.env.SEED_ADMIN_EMAIL || 'admin@orenza.local', password: process.env.SEED_ADMIN_PASSWORD || 'Admin1234!' }),
});
const adminHeaders = { Authorization: `Bearer ${adminLogin.token}` };
const stats = await request('/admin/stats', { headers: adminHeaders });
assert(typeof stats.stats.total === 'number', 'Estadísticas de administrador fallaron');

const counselorLogin = await request('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email: process.env.SEED_COUNSELOR_EMAIL || 'orientador@orenza.local', password: process.env.SEED_COUNSELOR_PASSWORD || 'Orientador1234!' }),
});
const counselorHeaders = { Authorization: `Bearer ${counselorLogin.token}` };
const overview = await request('/counselor/overview', { headers: counselorHeaders });
assert(Array.isArray(overview.students), 'Consulta del orientador falló');

console.log('Smoke test ORENZA: OK');
console.log(`Usuario de prueba creado: ${studentEmail}`);
