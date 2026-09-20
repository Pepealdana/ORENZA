import { Router } from 'express';
import mongoose from 'mongoose';
import CheckIn from '../models/CheckIn.js';
import ActivityProgress from '../models/ActivityProgress.js';
import Activity from '../models/Activity.js';
import User from '../models/User.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth, allowRoles('student'));

function publicProfile(user) {
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

function validDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function validObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function validateCheckInPayload({ date, mood, emotion, intensity, note = '' }) {
  const numericIntensity = Number(intensity);

  if (!validDate(date) || !mood || !emotion || !Number.isInteger(numericIntensity) || numericIntensity < 1 || numericIntensity > 5) {
    return 'Los datos del registro emocional no son válidos.';
  }

  if (typeof note !== 'string' || note.length > 1000) {
    return 'La reflexión no puede superar 1000 caracteres.';
  }

  return '';
}

function normalizeCheckInPayload({ date, mood, emotion, intensity, note = '' }) {
  return {
    date,
    mood: String(mood).trim(),
    emotion: String(emotion).trim(),
    intensity: Number(intensity),
    note: note.trim(),
  };
}

function validateProgressPayload({ activityId, status, answers }) {
  if (typeof activityId !== 'string' || !activityId.trim()) {
    return 'activityId es obligatorio.';
  }

  if (status !== undefined && !['in-progress', 'completed'].includes(status)) {
    return 'Estado de actividad no válido.';
  }

  if (answers !== undefined && (!answers || typeof answers !== 'object' || Array.isArray(answers))) {
    return 'Las respuestas deben tener un formato válido.';
  }

  return '';
}

// -------------------- CHECK-INS --------------------

router.get('/check-ins', async (req, res, next) => {
  try {
    const items = await CheckIn.find({ user: req.user._id }).sort({ date: -1, updatedAt: -1 });
    res.json({ items });
  } catch (error) { next(error); }
});

router.get('/check-ins/:id', async (req, res, next) => {
  try {
    if (!validObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Identificador de check-in no válido.' });
    }

    const item = await CheckIn.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!item) return res.status(404).json({ message: 'Check-in no encontrado.' });

    res.json({ item });
  } catch (error) { next(error); }
});

router.post('/check-ins', async (req, res, next) => {
  try {
    const validationError = validateCheckInPayload(req.body);
    if (validationError) return res.status(400).json({ message: validationError });

    const payload = normalizeCheckInPayload(req.body);
    const existing = await CheckIn.findOne({ user: req.user._id, date: payload.date });

    if (existing) {
      return res.status(409).json({
        message: 'Ya existe un registro emocional para esta fecha.',
        item: existing,
      });
    }

    const item = await CheckIn.create({
      user: req.user._id,
      ...payload,
    });

    res.status(201).json({ item });
  } catch (error) { next(error); }
});

router.patch('/check-ins/:id', async (req, res, next) => {
  try {
    if (!validObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Identificador de check-in no válido.' });
    }

    const allowed = ['date', 'mood', 'emotion', 'intensity', 'note'];
    const updates = Object.fromEntries(
      Object.entries(req.body)
        .filter(([key]) => allowed.includes(key))
        .map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
    );

    if (updates.date !== undefined && !validDate(updates.date)) {
      return res.status(400).json({ message: 'La fecha del registro no es válida.' });
    }

    if (updates.mood !== undefined && !updates.mood) {
      return res.status(400).json({ message: 'El estado de ánimo es obligatorio.' });
    }

    if (updates.emotion !== undefined && !updates.emotion) {
      return res.status(400).json({ message: 'La emoción es obligatoria.' });
    }

    if (updates.intensity !== undefined) {
      updates.intensity = Number(updates.intensity);
      if (!Number.isInteger(updates.intensity) || updates.intensity < 1 || updates.intensity > 5) {
        return res.status(400).json({ message: 'La intensidad debe ser un número entero entre 1 y 5.' });
      }
    }

    if (updates.note !== undefined && updates.note.length > 1000) {
      return res.status(400).json({ message: 'La reflexión no puede superar 1000 caracteres.' });
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No hay cambios válidos para guardar.' });
    }

    if (updates.date !== undefined) {
      const duplicate = await CheckIn.findOne({
        user: req.user._id,
        date: updates.date,
        _id: { $ne: req.params.id },
      });

      if (duplicate) {
        return res.status(409).json({ message: 'Ya existe un registro emocional para esta fecha.' });
      }
    }

    const item = await CheckIn.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!item) return res.status(404).json({ message: 'Check-in no encontrado.' });

    res.json({ item });
  } catch (error) { next(error); }
});

router.delete('/check-ins/:id', async (req, res, next) => {
  try {
    if (!validObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Identificador de check-in no válido.' });
    }

    const item = await CheckIn.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!item) return res.status(404).json({ message: 'Check-in no encontrado.' });

    res.json({ message: 'Check-in eliminado correctamente.', item });
  } catch (error) { next(error); }
});

// -------------------- ACTIVITY PROGRESS --------------------

router.get('/activities/progress', async (req, res, next) => {
  try {
    const items = await ActivityProgress.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.json({ items });
  } catch (error) { next(error); }
});

router.get('/activities/progress/:activityId', async (req, res, next) => {
  try {
    const item = await ActivityProgress.findOne({
      user: req.user._id,
      activityId: req.params.activityId,
    });

    res.json({ item: item || null });
  } catch (error) { next(error); }
});

router.post('/activities/progress', async (req, res, next) => {
  try {
    const { activityId, status = 'in-progress', answers = {} } = req.body;
    const validationError = validateProgressPayload({ activityId, status, answers });

    if (validationError) return res.status(400).json({ message: validationError });

    const normalizedActivityId = activityId.trim();
    const activity = await Activity.findOne({
      activityId: normalizedActivityId,
      active: true,
    }).select('_id activityId repeatable');

    if (!activity) {
      return res.status(404).json({ message: 'La actividad no está disponible.' });
    }

    const existing = await ActivityProgress.findOne({
      user: req.user._id,
      activityId: normalizedActivityId,
    });

    if (existing) {
      return res.status(409).json({
        message: 'Ya existe progreso para esta actividad. Utiliza PATCH para actualizarlo.',
        item: existing,
      });
    }

    const item = await ActivityProgress.create({
      user: req.user._id,
      activityId: normalizedActivityId,
      status,
      answers,
      ...(status === 'completed' ? { completedAt: new Date() } : {}),
    });

    res.status(201).json({ item });
  } catch (error) { next(error); }
});

router.patch('/activities/progress/:activityId', async (req, res, next) => {
  try {
    const activityId = typeof req.params.activityId === 'string' ? req.params.activityId.trim() : '';
    const { status, answers } = req.body;

    const validationError = validateProgressPayload({ activityId, status, answers });
    if (validationError) return res.status(400).json({ message: validationError });

    const activity = await Activity.findOne({
      activityId,
      active: true,
    }).select('_id activityId repeatable');

    if (!activity) {
      return res.status(404).json({ message: 'La actividad no está disponible.' });
    }

    const existing = await ActivityProgress.findOne({
      user: req.user._id,
      activityId,
    });

    if (!existing) {
      return res.status(404).json({ message: 'Progreso de actividad no encontrado.' });
    }

    if (existing.status === 'completed' && activity.repeatable === false) {
      return res.status(409).json({
        message: 'Esta actividad no es repetible y ya fue completada.',
        item: existing,
      });
    }

    const updates = {};

    if (status !== undefined) {
      updates.status = status;
      updates.completedAt = status === 'completed' ? new Date() : null;
    }

    if (answers !== undefined) {
      updates.answers = answers;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No hay cambios válidos para guardar.' });
    }

    const item = await ActivityProgress.findOneAndUpdate(
      { user: req.user._id, activityId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!item) return res.status(404).json({ message: 'Progreso de actividad no encontrado.' });

    res.json({ item });
  } catch (error) { next(error); }
});

router.delete('/activities/progress/:activityId', async (req, res, next) => {
  try {
    const activityId = typeof req.params.activityId === 'string' ? req.params.activityId.trim() : '';

    const item = await ActivityProgress.findOneAndDelete({
      user: req.user._id,
      activityId,
    });

    if (!item) return res.status(404).json({ message: 'Progreso de actividad no encontrado.' });

    res.json({ message: 'Progreso eliminado correctamente.', item });
  } catch (error) { next(error); }
});

// -------------------- PROFILE --------------------

router.get('/profile', (req, res) => {
  res.json({ user: publicProfile(req.user) });
});

router.patch('/profile', async (req, res, next) => {
  try {
    const allowed = ['name', 'grade', 'institution'];
    const updates = Object.fromEntries(
      Object.entries(req.body)
        .filter(([key]) => allowed.includes(key))
        .map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
    );

    if (updates.name !== undefined && (updates.name.length < 2 || updates.name.length > 100)) {
      return res.status(400).json({ message: 'El nombre debe tener entre 2 y 100 caracteres.' });
    }

    if (updates.grade !== undefined && updates.grade.length > 30) {
      return res.status(400).json({ message: 'El grado no puede superar 30 caracteres.' });
    }

    if (updates.institution !== undefined && updates.institution.length > 150) {
      return res.status(400).json({ message: 'La institución no puede superar 150 caracteres.' });
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No hay cambios válidos para guardar.' });
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    res.json({ user: publicProfile(user) });
  } catch (error) { next(error); }
});

export default router;
