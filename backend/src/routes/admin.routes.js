import { Router } from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Activity from '../models/Activity.js';
import Institution from '../models/Institution.js';
import AuditLog from '../models/AuditLog.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';
import { writeAudit } from '../utils/audit.js';

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

function escapeRegex(value) {
  return String(value).replace(/[.*+?^()|[\]\\]/g, '\\$&');
}

function pagination(query) {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(query.limit, 10) || 20));
  return { page, limit, skip: (page - 1) * limit };
}

async function validateInstitutionName(value) {
  const name = String(value || '').trim();
  if (!name) return '';
  const institution = await Institution.findOne({ name, active: true }).select('_id name');
  return institution ? institution.name : null;
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
    const [total, active, students, counselors, teachers, admins, institutions, activeActivities, recentAudits] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ active: true }),
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'counselor' }),
      User.countDocuments({ role: 'teacher' }),
      User.countDocuments({ role: 'admin' }),
      Institution.countDocuments({ active: true }),
      Activity.countDocuments({ active: true }),
      AuditLog.countDocuments({ createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }),
    ]);
    res.json({ stats: { total, active, students, counselors, teachers, admins, institutions, activeActivities, recentAudits } });
  } catch (error) { next(error); }
});

router.get('/users', async (req, res, next) => {
  try {
    const { page, limit, skip } = pagination(req.query);
    const filter = {};
    const search = String(req.query.search || '').trim();
    const role = String(req.query.role || '').trim();
    const active = req.query.active;
    const institution = String(req.query.institution || '').trim();

    if (search) {
      const pattern = new RegExp(escapeRegex(search), 'i');
      filter.$or = [{ name: pattern }, { email: pattern }];
    }
    if (allowedRoles.includes(role)) filter.role = role;
    if (active === 'true' || active === 'false') filter.active = active === 'true';
    if (institution) filter.institution = institution;

    const [users, total] = await Promise.all([
      User.find(filter).select('name email role grade institution active createdAt updatedAt').sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);

    res.json({
      users: users.map(publicUser),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
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

    const normalizedInstitution = await validateInstitutionName(institution);
    if (institution && !normalizedInstitution) {
      return res.status(400).json({ message: 'La institución indicada no existe o está inactiva.' });
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
      institution: normalizedInstitution,
    });

    await writeAudit({
      actor: req.user._id,
      action: 'create',
      entity: 'User',
      entityId: user._id,
      summary: 'Creó el usuario ' + user.email,
      changes: { role: user.role, institution: user.institution },
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

    if (updates.institution !== undefined) {
      const normalizedInstitution = await validateInstitutionName(updates.institution);
      if (updates.institution && !normalizedInstitution) {
        return res.status(400).json({ message: 'La institución indicada no existe o está inactiva.' });
      }
      updates.institution = normalizedInstitution;
    }

    if (req.params.id === req.user._id.toString()) {
      if (updates.role && updates.role !== 'admin') {
        return res.status(400).json({ message: 'No puedes retirar tu propio rol de administrador.' });
      }
      if (updates.active === false) {
        return res.status(400).json({ message: 'No puedes desactivar tu propia cuenta de administrador.' });
      }
    }

    const currentUser = await User.findById(req.params.id);
    if (!currentUser) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const willRemainActiveAdmin =
      updates.role === undefined ? currentUser.role === 'admin' : updates.role === 'admin';
    const willRemainActive =
      updates.active === undefined ? currentUser.active : updates.active;

    if (currentUser.role === 'admin' && currentUser.active && (!willRemainActiveAdmin || !willRemainActive)) {
      const activeAdmins = await User.countDocuments({ role: 'admin', active: true });
      if (activeAdmins <= 1) {
        return res.status(400).json({ message: 'Debe existir al menos un administrador activo.' });
      }
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    await writeAudit({
      actor: req.user._id,
      action: 'update',
      entity: 'User',
      entityId: user._id,
      summary: 'Actualizó el usuario ' + user.email,
      changes: updates,
    });

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

    const targetUser = await User.findById(req.params.id);
    if (!targetUser) return res.status(404).json({ message: 'Usuario no encontrado.' });

    if (targetUser.role === 'admin' && targetUser.active) {
      const activeAdmins = await User.countDocuments({ role: 'admin', active: true });
      if (activeAdmins <= 1) {
        return res.status(400).json({ message: 'Debe existir al menos un administrador activo.' });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    await writeAudit({
      actor: req.user._id,
      action: 'deactivate',
      entity: 'User',
      entityId: user._id,
      summary: 'Desactivó el usuario ' + user.email,
      changes: { active: false },
    });

    res.json({ message: 'Usuario desactivado.', user: publicUser(user) });
  } catch (error) { next(error); }
});

function publicInstitution(item) {
  return {
    id: item._id,
    name: item.name,
    code: item.code,
    active: item.active,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

router.get('/institutions', async (req, res, next) => {
  try {
    const { page, limit, skip } = pagination(req.query);
    const filter = {};
    const search = String(req.query.search || '').trim();
    const active = req.query.active;
    if (search) {
      const pattern = new RegExp(escapeRegex(search), 'i');
      filter.$or = [{ name: pattern }, { code: pattern }];
    }
    if (active === 'true' || active === 'false') filter.active = active === 'true';

    const [items, total] = await Promise.all([
      Institution.find(filter).sort({ name: 1 }).skip(skip).limit(limit),
      Institution.countDocuments(filter),
    ]);

    res.json({
      institutions: items.map(publicInstitution),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) { next(error); }
});

router.post('/institutions', async (req, res, next) => {
  try {
    const name = String(req.body.name || '').trim();
    const code = String(req.body.code || '').trim().toUpperCase();
    if (name.length < 2 || name.length > 150 || !code || code.length > 30) {
      return res.status(400).json({ message: 'Nombre y código de institución son obligatorios y deben ser válidos.' });
    }

    const exists = await Institution.findOne({ $or: [{ name }, { code }] });
    if (exists) return res.status(409).json({ message: 'Ya existe una institución con ese nombre o código.' });

    const institution = await Institution.create({ name, code, active: true });

    await writeAudit({
      actor: req.user._id,
      action: 'create',
      entity: 'Institution',
      entityId: institution._id,
      summary: 'Creó la institución ' + institution.name,
      changes: { name, code },
    });

    res.status(201).json({ institution: publicInstitution(institution) });
  } catch (error) { next(error); }
});

router.patch('/institutions/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Identificador de institución no válido.' });
    }

    const updates = {};
    if (req.body.name !== undefined) {
      const name = String(req.body.name).trim();
      if (name.length < 2 || name.length > 150) return res.status(400).json({ message: 'El nombre de institución no es válido.' });
      updates.name = name;
    }
    if (req.body.code !== undefined) {
      const code = String(req.body.code).trim().toUpperCase();
      if (!code || code.length > 30) return res.status(400).json({ message: 'El código de institución no es válido.' });
      updates.code = code;
    }
    if (req.body.active !== undefined) {
      if (typeof req.body.active !== 'boolean') return res.status(400).json({ message: 'El estado de la institución no es válido.' });
      updates.active = req.body.active;
    }

    if (!Object.keys(updates).length) return res.status(400).json({ message: 'No hay cambios válidos para guardar.' });

    const current = await Institution.findById(req.params.id);
    if (!current) return res.status(404).json({ message: 'Institución no encontrada.' });

    if (updates.name || updates.code) {
      const duplicate = await Institution.findOne({
        _id: { $ne: current._id },
        $or: [
          ...(updates.name ? [{ name: updates.name }] : []),
          ...(updates.code ? [{ code: updates.code }] : []),
        ],
      });
      if (duplicate) return res.status(409).json({ message: 'Ya existe otra institución con esos datos.' });
    }

    if (updates.active === false) {
      const assignedUsers = await User.countDocuments({ institution: current.name, active: true });
      if (assignedUsers > 0) {
        return res.status(409).json({ message: 'No puedes desactivar una institución con usuarios activos asignados.' });
      }
    }

    const institution = await Institution.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!institution) return res.status(404).json({ message: 'Institución no encontrada.' });

    if (updates.name && updates.name !== current.name) {
      await User.updateMany({ institution: current.name }, { $set: { institution: updates.name } });
    }

    await writeAudit({
      actor: req.user._id,
      action: 'update',
      entity: 'Institution',
      entityId: institution._id,
      summary: 'Actualizó la institución ' + institution.name,
      changes: updates,
    });

    res.json({ institution: publicInstitution(institution) });
  } catch (error) { next(error); }
});

router.delete('/institutions/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Identificador de institución no válido.' });
    }

    const current = await Institution.findById(req.params.id);
    if (!current) return res.status(404).json({ message: 'Institución no encontrada.' });

    const assignedUsers = await User.countDocuments({ institution: current.name, active: true });
    if (assignedUsers > 0) {
      return res.status(409).json({ message: 'No puedes desactivar una institución con usuarios activos asignados.' });
    }

    const institution = await Institution.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true, runValidators: true }
    );

    await writeAudit({
      actor: req.user._id,
      action: 'deactivate',
      entity: 'Institution',
      entityId: institution._id,
      summary: 'Desactivó la institución ' + institution.name,
      changes: { active: false },
    });

    res.json({ message: 'Institución desactivada.', institution: publicInstitution(institution) });
  } catch (error) { next(error); }
});

router.get('/audit-logs', async (req, res, next) => {
  try {
    const { page, limit, skip } = pagination(req.query);
    const filter = {};
    const action = String(req.query.action || '').trim();
    const entity = String(req.query.entity || '').trim();
    if (action) filter.action = action;
    if (entity) filter.entity = entity;

    const [logs, total] = await Promise.all([
      AuditLog.find(filter)
        .populate('actor', 'name email role')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      AuditLog.countDocuments(filter),
    ]);

    res.json({
      logs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) { next(error); }
});

export default router;
