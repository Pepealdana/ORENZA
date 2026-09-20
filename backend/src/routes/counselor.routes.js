import { Router } from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import CheckIn from '../models/CheckIn.js';
import ActivityProgress from '../models/ActivityProgress.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth, allowRoles('counselor'));

function validObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function ensureStudent(user) {
  if (!user) {
    const error = new Error('Estudiante no encontrado.');
    error.status = 404;
    throw error;
  }
  return user;
}

router.get('/overview', async (_req, res, next) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('name email grade institution active createdAt')
      .sort({ name: 1 });

    const items = await Promise.all(
      students.map(async (student) => {
        const [latestCheckIn, completedActivities] = await Promise.all([
          CheckIn.findOne({ user: student._id }).sort({ date: -1 }).select('date mood emotion intensity'),
          ActivityProgress.countDocuments({ user: student._id, status: 'completed' }),
        ]);

        return {
          id: student._id,
          name: student.name,
          email: student.email,
          grade: student.grade,
          institution: student.institution,
          active: student.active,
          completedActivities,
          latestCheckIn: latestCheckIn || null,
        };
      })
    );

    res.json({
      summary: {
        totalStudents: items.length,
        activeStudents: items.filter((student) => student.active).length,
        studentsWithCheckIn: items.filter((student) => student.latestCheckIn).length,
        studentsWithActivity: items.filter((student) => student.completedActivities > 0).length,
      },
      students: items,
    });
  } catch (error) { next(error); }
});

router.get('/students/:studentId', async (req, res, next) => {
  try {
    if (!validObjectId(req.params.studentId)) {
      return res.status(400).json({ message: 'Identificador de estudiante no válido.' });
    }

    const student = ensureStudent(
      await User.findOne({ _id: req.params.studentId, role: 'student' })
        .select('name email grade institution active createdAt')
    );

    const [latestCheckIn, completedActivities] = await Promise.all([
      CheckIn.find({ user: student._id }).sort({ date: -1 }),
      ActivityProgress.find({ user: student._id }).sort({ updatedAt: -1 }),
    ]);

    res.json({
      student,
      checkIns: latestCheckIn,
      activities: completedActivities,
    });
  } catch (error) { next(error); }
});

router.get('/students/:studentId/check-ins', async (req, res, next) => {
  try {
    if (!validObjectId(req.params.studentId)) {
      return res.status(400).json({ message: 'Identificador de estudiante no válido.' });
    }

    const student = ensureStudent(await User.findOne({ _id: req.params.studentId, role: 'student' }).select('_id'));
    const items = await CheckIn.find({ user: student._id }).sort({ date: -1 });
    res.json({ items });
  } catch (error) { next(error); }
});

router.get('/students/:studentId/activity-progress', async (req, res, next) => {
  try {
    if (!validObjectId(req.params.studentId)) {
      return res.status(400).json({ message: 'Identificador de estudiante no válido.' });
    }

    const student = ensureStudent(await User.findOne({ _id: req.params.studentId, role: 'student' }).select('_id'));
    const items = await ActivityProgress.find({ user: student._id }).sort({ updatedAt: -1 });
    res.json({ items });
  } catch (error) { next(error); }
});

export default router;
