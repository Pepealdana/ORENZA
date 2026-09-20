import { Router } from 'express';
import CheckIn from '../models/CheckIn.js';
import ActivityProgress from '../models/ActivityProgress.js';
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

router.get('/check-ins', async (req, res, next) => {
  try {
    const items = await CheckIn.find({ user: req.user._id }).sort({ date: -1, updatedAt: -1 });
    res.json({ items });
  } catch (error) { next(error); }
});

router.post('/check-ins', async (req, res, next) => {
  try {
    const { date, mood, emotion, intensity, note = '' } = req.body;
    const numericIntensity = Number(intensity);

    if (!validDate(date) || !mood || !emotion || !Number.isInteger(numericIntensity) || numericIntensity < 1 || numericIntensity > 5) {
      return res.status(400).json({ message: 'Los datos del registro emocional no son válidos.' });
    }

    if (typeof note !== 'string' || note.length > 1000) {
      return res.status(400).json({ message: 'La reflexión no puede superar 1000 caracteres.' });
    }

    const item = await CheckIn.findOneAndUpdate(
      { user: req.user._id, date },
      { $set: { mood: String(mood).trim(), emotion: String(emotion).trim(), intensity: numericIntensity, note: note.trim() } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ item });
  } catch (error) { next(error); }
});

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

    if (typeof activityId !== 'string' || !activityId.trim()) {
      return res.status(400).json({ message: 'activityId es obligatorio.' });
    }

    if (!['in-progress', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Estado de actividad no válido.' });
    }

    if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
      return res.status(400).json({ message: 'Las respuestas deben tener un formato válido.' });
    }

    const completedAt = status === 'completed' ? new Date() : null;

    const item = await ActivityProgress.findOneAndUpdate(
      { user: req.user._id, activityId: activityId.trim() },
      {
        $set: {
          status,
          answers,
          ...(status === 'completed' ? { completedAt } : { completedAt: null }),
        },
        $setOnInsert: { user: req.user._id, activityId: activityId.trim() },
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(status === 'completed' ? 200 : 201).json({ item });
  } catch (error) { next(error); }
});

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
