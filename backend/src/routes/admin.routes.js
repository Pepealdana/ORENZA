import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth, allowRoles('admin'));

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    grade: user.grade,
    institution: user.institution,
    active: user.active,
    createdAt: user.createdAt,
  };
}

router.get('/stats', async (_req, res, next) => {
  try {
    const [total, active, students, counselors, teachers, admins] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ active: true }),
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'counselor' }),
      User.countDocuments({ role: 'teacher' }),
      User.countDocuments({ role: 'admin' }),
    ]);

    res.json({ stats: { total, active, students, counselors, teachers, admins } });
  } catch (error) {
    next(error);
  }
});

router.get('/users', async (_req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ users: users.map(publicUser) });
  } catch (error) {
    next(error);
  }
});

router.post('/users', async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role = 'student',
      grade = '',
      institution = '',
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nombre, correo y contraseña son obligatorios.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'La contraseña debe tener mínimo 8 caracteres.' });
    }

    const allowedRoles = ['student', 'teacher', 'counselor', 'admin'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Rol no válido.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(409).json({ message: 'El correo ya está registrado.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: passwordHash,
      role,
      grade,
      institution,
    });

    res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

router.patch('/users/:id', async (req, res, next) => {
  try {
    const allowed = ['name', 'role', 'grade', 'institution', 'active'];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowed.includes(key))
    );

    if (updates.role && !['student', 'teacher', 'counselor', 'admin'].includes(updates.role)) {
      return res.status(400).json({ message: 'Rol no válido.' });
    }

    if (req.params.id === req.user._id.toString() && updates.role && updates.role !== 'admin') {
      return res.status(400).json({ message: 'No puedes retirar tu propio rol de administrador.' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

export default router;
