import { Router } from 'express';
import User from '../models/User.js';
import CheckIn from '../models/CheckIn.js';
import ActivityProgress from '../models/ActivityProgress.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth, allowRoles('counselor'));

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

    const activeStudents = items.filter((student) => student.active).length;
    const studentsWithCheckIn = items.filter((student) => student.latestCheckIn).length;

    res.json({
      summary: {
        totalStudents: items.length,
        activeStudents,
        studentsWithCheckIn,
        studentsWithActivity: items.filter((student) => student.completedActivities > 0).length,
      },
      students: items,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
