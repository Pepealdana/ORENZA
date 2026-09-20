import { Router } from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth, allowRoles('admin'));

const allowedRoles = ['student', 'teacher', 'counselor', 'admin'];

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
    updatedAt: user.updatedAt,
  };
}

function validateUserFields({ name, email, password, role }) {
  if (!name || !email || !password) return 'Nombre, correo y contraseña son obligatorios.';
  if (name.trim().length < 2 || name.trim().length > 100) return 'El nombre debe tener entre 2 y 100 caracteres.';
  if (password.length < 8) return 'La contraseña debe tener mínimo 8 caracteres.';
  if (!allowedRoles.includes(role)) return 'Rol no válido.';
  return '';
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
  } catch (error) { next(error); }
});

router.get('/users', async (_req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ users: users.map(publicUser) });
  } catch (error) { next(error); }
});

router.get('/users/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Identificador de usuario no válido.' });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
    res.json({ user: publicUser(user) });
  } catch (error) { next(error); }
});

router.post('/users', async (req, res, next) => {
  try {
    const { name = '', email = '', password = '', role = 'student', grade = '', institution = '' } = req.body;
    const validationError = validateUserFields({ name, email, password, role });
    if (validationError) return res.status(400).json({ message: validationError });

    const normalizedEmail = email.toLowerCase().trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ message: 'Correo electrónico no válido.' });
    }

    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) return res.status(409).json({ message: 'No fue posible crear el usuario con esos datos.' });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: passwordHash,
      role,
      grade: String(grade || '').trim(),
      institution: String(institution || '').trim(),
    });

    res.status(201).json({ user: publicUser(user) });
  } catch (error) { next(error); }
});

router.patch('/users/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Identificador de usuario no válido.' });
    }

    const allowed = ['name', 'role', 'grade', 'institution', 'active'];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowed.includes(key))
    );

    if (updates.name !== undefined) {
      updates.name = String(updates.name).trim();
      if (updates.name.length < 2 || updates.name.length > 100) {
        return res.status(400).json({ message: 'El nombre debe tener entre 2 y 100 caracteres.' });
      }
    }

    if (updates.role !== undefined && !allowedRoles.includes(updates.role)) {
      return res.status(400).json({ message: 'Rol no válido.' });
    }

    if (updates.active !== undefined && typeof updates.active !== 'boolean') {
      return res.status(400).json({ message: 'El estado de acceso no es válido.' });
    }

    if (req.params.id === req.user._id.toString()) {
      if (updates.role && updates.role !== 'admin') {
        return res.status(400).json({ message: 'No puedes retirar tu propio rol de administrador.' });
      }
      if (updates.active === false) {
        return res.status(400).json({ message: 'No puedes desactivar tu propia cuenta de administrador.' });
      }
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    res.json({ user: publicUser(user) });
  } catch (error) { next(error); }
});

router.delete('/users/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Identificador de usuario no válido.' });
    }

    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'No puedes eliminar tu propia cuenta de administrador.' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    res.json({ message: 'Usuario desactivado.', user: publicUser(user) });
  } catch (error) { next(error); }
});

export default router;
