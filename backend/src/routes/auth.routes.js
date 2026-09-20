import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import User from '../models/User.js';
import PasswordResetToken from '../models/PasswordResetToken.js';
import { requireAuth } from '../middleware/auth.js';
import { writeAudit } from '../utils/audit.js';

const router = Router();

const PASSWORD_MIN_LENGTH = 8;
const RESET_TOKEN_TTL_MS = 15 * 60 * 1000;

function normalizeEmail(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function validatePassword(password) {
  return typeof password === 'string' && password.length >= PASSWORD_MIN_LENGTH;
}

function createToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
      issuer: 'orenza-api',
      audience: 'orenza-web',
    }
  );
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    grade: user.grade,
    institution: user.institution,
    active: user.active,
  };
}

function hashResetToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function genericResetResponse(res, extra = {}) {
  res.json({
    message: 'Si la cuenta existe, recibirás instrucciones para restablecer la contraseña.',
    ...extra,
  });
}

router.post('/register', async (req, res, next) => {
  try {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const email = normalizeEmail(req.body.email);
    const password = req.body.password;
    const grade = typeof req.body.grade === 'string' ? req.body.grade.trim() : '';

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nombre, correo y contraseña son obligatorios.' });
    }

    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({ message: 'El nombre debe tener entre 2 y 100 caracteres.' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'La contraseña debe tener mínimo 8 caracteres.' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'No fue posible crear la cuenta con esos datos.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: passwordHash,
      grade,
      role: 'student',
    });

    res.status(201).json({ token: createToken(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = typeof req.body.password === 'string' ? req.body.password : '';

    const user = await User.findOne({ email }).select('+password');
    const passwordHash = user?.password || '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

    if (!user || !user.active || !(await bcrypt.compare(password, passwordHash))) {
      return res.status(401).json({ message: 'Credenciales no válidas.' });
    }

    res.json({ token: createToken(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

router.post('/request-password-reset', async (req, res, next) => {
  try {
    const email = normalizeEmail(req.body.email);

    if (!email) {
      return genericResetResponse(res);
    }

    const user = await User.findOne({ email, active: true });

    if (user) {
      await PasswordResetToken.deleteMany({ user: user._id, usedAt: null });

      const rawToken = crypto.randomBytes(32).toString('hex');
      await PasswordResetToken.create({
        user: user._id,
        tokenHash: hashResetToken(rawToken),
        expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
      });

      // El proyecto no incorpora todavía un servicio de correo.
      // En desarrollo devolvemos el token para poder probar el flujo end-to-end.
      if (process.env.NODE_ENV !== 'production') {
        return genericResetResponse(res, { demoToken: rawToken });
      }
    }

    return genericResetResponse(res);
  } catch (error) {
    next(error);
  }
});

router.post('/reset-password', async (req, res, next) => {
  try {
    const token = typeof req.body.token === 'string' ? req.body.token.trim() : '';
    const newPassword = req.body.newPassword;

    if (!token || !validatePassword(newPassword)) {
      return res.status(400).json({ message: 'El código de recuperación y la nueva contraseña son obligatorios.' });
    }

    const reset = await PasswordResetToken.findOne({
      tokenHash: hashResetToken(token),
      usedAt: null,
      expiresAt: { $gt: new Date() },
    });

    if (!reset) {
      return res.status(400).json({ message: 'El código de recuperación no es válido o ya expiró.' });
    }

    const user = await User.findOne({ _id: reset.user, active: true }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'No fue posible completar la recuperación.' });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    reset.usedAt = new Date();
    await reset.save();
    await writeAudit({ actor: user._id, action: 'password-reset', entity: 'User', entityId: user._id, summary: 'Restableció su contraseña mediante recuperación' });
    await PasswordResetToken.deleteMany({ user: user._id, _id: { $ne: reset._id } });

    res.json({ message: 'Contraseña actualizada correctamente. Ya puedes iniciar sesión.' });
  } catch (error) {
    next(error);
  }
});

router.patch('/change-password', requireAuth, async (req, res, next) => {
  try {
    const currentPassword = typeof req.body.currentPassword === 'string' ? req.body.currentPassword : '';
    const newPassword = req.body.newPassword;

    if (!currentPassword || !validatePassword(newPassword)) {
      return res.status(400).json({ message: 'La contraseña actual y la nueva son obligatorias.' });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ message: 'La nueva contraseña debe ser diferente a la actual.' });
    }

    const user = await User.findById(req.user._id).select('+password');
    const matches = user && await bcrypt.compare(currentPassword, user.password);

    if (!matches) {
      return res.status(401).json({ message: 'La contraseña actual no es correcta.' });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    await writeAudit({ actor: user._id, action: 'password-change', entity: 'User', entityId: user._id, summary: 'Cambió su contraseña' });

    res.json({ message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    next(error);
  }
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

export default router;
