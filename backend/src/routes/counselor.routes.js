import { Router } from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import CheckIn from '../models/CheckIn.js';
import Activity from '../models/Activity.js';
import ActivityProgress from '../models/ActivityProgress.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth, allowRoles('counselor'));

function validObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function ensureInstitution(req) {
  const institution = String(req.user?.institution || '').trim();
  if (!institution) {
    const error = new Error('El orientador no tiene una institución asignada.');
    error.status = 403;
    throw error;
  }
  return institution;
}

function ensureStudent(user) {
  if (!user) {
    const error = new Error('Estudiante no encontrado.');
    error.status = 404;
    throw error;
  }
  return user;
}

// El orientador recibe solo datos de seguimiento necesarios para el acompañamiento.
// No se exponen notas privadas de check-ins ni respuestas escritas de actividades.
function publicCheckIn(item) {
  return {
    id: item._id,
    date: item.date,
    mood: item.mood,
    emotion: item.emotion,
    intensity: item.intensity,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

function publicActivityProgress(item, activity) {
  return {
    id: item._id,
    activityId: item.activityId,
    activityTitle: activity?.title || item.activityId,
    activityType: activity?.type || null,
    status: item.status,
    startedAt: item.startedAt,
    completedAt: item.completedAt,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

async function getActivityMap(items) {
  const activityIds = [...new Set(items.map((item) => item.activityId).filter(Boolean))];

  if (activityIds.length === 0) return new Map();

  const activities = await Activity.find({ activityId: { $in: activityIds } })
    .select('activityId title type')
    .lean();

  return new Map(activities.map((activity) => [activity.activityId, activity]));
}

async function getStudentFollowUp(studentId) {
  const [checkIns, progressItems] = await Promise.all([
    CheckIn.find({ user: studentId })
      .sort({ date: -1 })
      .select('date mood emotion intensity createdAt updatedAt')
      .lean(),
    ActivityProgress.find({ user: studentId })
      .sort({ updatedAt: -1 })
      .select('activityId status startedAt completedAt createdAt updatedAt')
      .lean(),
  ]);

  const activityMap = await getActivityMap(progressItems);

  return {
    checkIns: checkIns.map(publicCheckIn),
    activities: progressItems.map((item) => publicActivityProgress(item, activityMap.get(item.activityId))),
  };
}

router.get('/overview', async (req, res, next) => {
  try {
    const institution = ensureInstitution(req);
    const students = await User.find({ role: 'student', institution })
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
    const institution = ensureInstitution(req);
    if (!validObjectId(req.params.studentId)) {
      return res.status(400).json({ message: 'Identificador de estudiante no válido.' });
    }

    const student = ensureStudent(
      await User.findOne({ _id: req.params.studentId, role: 'student', institution })
        .select('name email grade institution active createdAt')
    );

    const followUp = await getStudentFollowUp(student._id);

    res.json({
      student,
      ...followUp,
    });
  } catch (error) { next(error); }
});

router.get('/students/:studentId/check-ins', async (req, res, next) => {
  try {
    const institution = ensureInstitution(req);
    if (!validObjectId(req.params.studentId)) {
      return res.status(400).json({ message: 'Identificador de estudiante no válido.' });
    }

    const student = ensureStudent(
      await User.findOne({ _id: req.params.studentId, role: 'student' }).select('_id')
    );

    const items = await CheckIn.find({ user: student._id })
      .sort({ date: -1 })
      .select('date mood emotion intensity createdAt updatedAt')
      .lean();

    res.json({ items: items.map(publicCheckIn) });
  } catch (error) { next(error); }
});

router.get('/students/:studentId/activity-progress', async (req, res, next) => {
  try {
    const institution = ensureInstitution(req);
    if (!validObjectId(req.params.studentId)) {
      return res.status(400).json({ message: 'Identificador de estudiante no válido.' });
    }

    const student = ensureStudent(
      await User.findOne({ _id: req.params.studentId, role: 'student' }).select('_id')
    );

    const items = await ActivityProgress.find({ user: student._id })
      .sort({ updatedAt: -1 })
      .select('activityId status startedAt completedAt createdAt updatedAt')
      .lean();

    const activityMap = await getActivityMap(items);

    res.json({
      items: items.map((item) => publicActivityProgress(item, activityMap.get(item.activityId))),
    });
  } catch (error) { next(error); }
});

export default router;
