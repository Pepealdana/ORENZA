import { Router } from 'express';
import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

function publicActivity(activity) {
  return {
    id: activity._id,
    activityId: activity.activityId,
    title: activity.title,
    description: activity.description,
    category: activity.category,
    instructions: activity.instructions,
    estimatedTime: activity.estimatedTime,
    order: activity.order,
    active: activity.active,
    createdAt: activity.createdAt,
    updatedAt: activity.updatedAt,
  };
}

function validObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function validateActivityFields({ activityId, title, description = '', category = '', instructions = '', estimatedTime = 10, order = 0 }) {
  if (!activityId || typeof activityId !== 'string' || !activityId.trim()) return 'activityId es obligatorio.';
  if (!title || typeof title !== 'string' || title.trim().length < 2 || title.trim().length > 150) {
    return 'El título debe tener entre 2 y 150 caracteres.';
  }
  if (typeof description !== 'string' || description.length > 500) return 'La descripción no puede superar 500 caracteres.';
  if (typeof category !== 'string' || category.length > 80) return 'La categoría no puede superar 80 caracteres.';
  if (typeof instructions !== 'string' || instructions.length > 3000) return 'Las instrucciones no pueden superar 3000 caracteres.';

  const numericTime = Number(estimatedTime);
  if (!Number.isInteger(numericTime) || numericTime < 1 || numericTime > 180) {
    return 'El tiempo estimado debe ser un entero entre 1 y 180 minutos.';
  }

  const numericOrder = Number(order);
  if (!Number.isInteger(numericOrder) || numericOrder < 0) {
    return 'El orden debe ser un entero mayor o igual a 0.';
  }

  return '';
}

// Lectura para cualquier usuario autenticado.
router.get('/', async (req, res, next) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { active: true };
    const activities = await Activity.find(filter).sort({ order: 1, title: 1 });
    res.json({ activities: activities.map(publicActivity) });
  } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const filter = validObjectId(req.params.id)
      ? { _id: req.params.id }
      : { activityId: req.params.id.toLowerCase() };

    if (req.user.role !== 'admin') filter.active = true;

    const activity = await Activity.findOne(filter);
    if (!activity) return res.status(404).json({ message: 'Actividad no encontrada.' });

    res.json({ activity: publicActivity(activity) });
  } catch (error) { next(error); }
});

// Administración del catálogo.
router.use(allowRoles('admin'));

router.post('/', async (req, res, next) => {
  try {
    const {
      activityId,
      title,
      description = '',
      category = 'general',
      instructions = '',
      estimatedTime = 10,
      order = 0,
      active = true,
    } = req.body;

    const validationError = validateActivityFields({
      activityId,
      title,
      description,
      category,
      instructions,
      estimatedTime,
      order,
    });

    if (validationError) return res.status(400).json({ message: validationError });

    const normalizedId = activityId.trim().toLowerCase();
    const exists = await Activity.findOne({ activityId: normalizedId });
    if (exists) return res.status(409).json({ message: 'Ya existe una actividad con ese identificador.' });

    const activity = await Activity.create({
      activityId: normalizedId,
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      instructions: instructions.trim(),
      estimatedTime: Number(estimatedTime),
      order: Number(order),
      active: Boolean(active),
    });

    res.status(201).json({ activity: publicActivity(activity) });
  } catch (error) { next(error); }
});

router.patch('/:id', async (req, res, next) => {
  try {
    if (!validObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Identificador de actividad no válido.' });
    }

    const allowed = ['activityId', 'title', 'description', 'category', 'instructions', 'estimatedTime', 'order', 'active'];
    const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));

    if (updates.activityId !== undefined) {
      updates.activityId = String(updates.activityId).trim().toLowerCase();
      if (!updates.activityId) return res.status(400).json({ message: 'activityId es obligatorio.' });

      const duplicate = await Activity.findOne({
        activityId: updates.activityId,
        _id: { $ne: req.params.id },
      });
      if (duplicate) return res.status(409).json({ message: 'Ya existe una actividad con ese identificador.' });
    }

    if (updates.title !== undefined) {
      updates.title = String(updates.title).trim();
      if (updates.title.length < 2 || updates.title.length > 150) {
        return res.status(400).json({ message: 'El título debe tener entre 2 y 150 caracteres.' });
      }
    }

    for (const field of ['description', 'category', 'instructions']) {
      if (updates[field] !== undefined) updates[field] = String(updates[field]).trim();
    }

    if (updates.description !== undefined && updates.description.length > 500) return res.status(400).json({ message: 'La descripción no puede superar 500 caracteres.' });
    if (updates.category !== undefined && updates.category.length > 80) return res.status(400).json({ message: 'La categoría no puede superar 80 caracteres.' });
    if (updates.instructions !== undefined && updates.instructions.length > 3000) return res.status(400).json({ message: 'Las instrucciones no pueden superar 3000 caracteres.' });

    if (updates.estimatedTime !== undefined) {
      updates.estimatedTime = Number(updates.estimatedTime);
      if (!Number.isInteger(updates.estimatedTime) || updates.estimatedTime < 1 || updates.estimatedTime > 180) {
        return res.status(400).json({ message: 'El tiempo estimado debe ser un entero entre 1 y 180 minutos.' });
      }
    }

    if (updates.order !== undefined) {
      updates.order = Number(updates.order);
      if (!Number.isInteger(updates.order) || updates.order < 0) {
        return res.status(400).json({ message: 'El orden debe ser un entero mayor o igual a 0.' });
      }
    }

    if (updates.active !== undefined && typeof updates.active !== 'boolean') {
      return res.status(400).json({ message: 'El estado de la actividad no es válido.' });
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No hay cambios válidos para guardar.' });
    }

    const activity = await Activity.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!activity) return res.status(404).json({ message: 'Actividad no encontrada.' });

    res.json({ activity: publicActivity(activity) });
  } catch (error) { next(error); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    if (!validObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Identificador de actividad no válido.' });
    }

    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true, runValidators: true }
    );

    if (!activity) return res.status(404).json({ message: 'Actividad no encontrada.' });

    res.json({ message: 'Actividad desactivada correctamente.', activity: publicActivity(activity) });
  } catch (error) { next(error); }
});

export default router;
