import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import studentRoutes from './routes/student.routes.js';
import adminRoutes from './routes/admin.routes.js';
import counselorRoutes from './routes/counselor.routes.js';
import activityRoutes from './routes/activity.routes.js';

const app = express();
const PORT = Number(process.env.PORT) || 4000;

if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
  throw new Error('MONGODB_URI y JWT_SECRET son obligatorios.');
}

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '1mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'orenza-api', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/counselor', counselorRoutes);
app.use('/api/activities', activityRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: 'Recurso no encontrado.' });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  const status = Number.isInteger(error.status) ? error.status : (isValidation ? 400 : 500);
  const isValidation = error.name === 'ValidationError';
  const isDuplicate = error.code === 11000;

  res.status(isDuplicate ? 409 : status).json({
    message: isDuplicate
      ? 'Ya existe un registro con los datos enviados.'
      : isValidation
        ? 'Los datos enviados no son válidos.'
        : status >= 500
          ? 'Error interno del servidor.'
          : error.message,
  });
});

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`ORENZA API ejecutándose en http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  console.error('No fue posible iniciar ORENZA API:', error);
  process.exit(1);
});
