import { Router } from 'express';
import CheckIn from '../models/CheckIn.js';
import ActivityProgress from '../models/ActivityProgress.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth, allowRoles('student'));

router.get('/check-ins', async (req, res, next) => {
  try {
    const items = await CheckIn.find({ user: req.user._id }).sort({ date: -1 });
    res.json({ items });
  } catch (error) { next(error); }
});

router.post('/check-ins', async (req, res, next) => {
  try {
    const { date, mood, emotion, intensity, note = '' } = req.body;
    if (!date || !mood || !emotion || !intensity) {
      return res.status(400).json({ message: 'Faltan datos del registro emocional.' });
    }
    const item = await CheckIn.findOneAndUpdate(
      { user: req.user._id, date },
      { user: req.user._id, date, mood, emotion, intensity, note },
      { new: true, upsert: true, runValidators: true }
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

router.post('/activities/progress', async (req, res, next) => {
  try {
    const { activityId, status = 'in-progress', answers = {} } = req.body;
    if (!activityId) return res.status(400).json({ message: 'activityId es obligatorio.' });
    const completedAt = status === 'completed' ? new Date() : null;
    const item = await ActivityProgress.findOneAndUpdate(
      { user: req.user._id, activityId },
      { user: req.user._id, activityId, status, answers, completedAt },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ item });
  } catch (error) { next(error); }
});

router.get('/profile', (req, res) => {
  res.json({
    user: {
      id: req.user._id, name: req.user.name, email: req.user.email,
      role: req.user.role, grade: req.user.grade, institution: req.user.institution,
    },
  });
});

router.patch('/profile', async (req, res, next) => {
  try {
    const allowed = ['name', 'grade', 'institution'];
    const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    const user = await req.user.constructor.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
    res.json({
      user: {
        id: user._id, name: user.name, email: user.email,
        role: user.role, grade: user.grade, institution: user.institution,
      },
    });
  } catch (error) { next(error); }
});

export default router;
