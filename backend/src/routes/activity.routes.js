import { Router } from 'express';
import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';
import { writeAudit } from '../utils/audit.js';

const router = Router();

router.use(requireAuth);

const ALLOWED_TYPES = [
  'reflection',
  'emotional',
  'situation',
  'decision',
  'creative',
  'journal',
  'observation',
  'challenge',
  'exploration',
];

const ALLOWED_RESPONSE_TYPES = [
  'textarea',
  'single-choice',
  'text',
];

const ALLOWED_DIFFICULTIES = ['easy', 'medium', 'hard'];

function publicActivity(activity) {
  return {
    id: activity._id,
    activityId: activity.activityId,
    title: activity.title,
    description: activity.description,
    purpose: activity.purpose,
    type: activity.type,
    category: activity.category,
    instructions: activity.instructions,
    estimatedTime: activity.estimatedTime,
    ageRange: activity.ageRange,
    competencies: activity.competencies,
    emotions: activity.emotions,
    difficulty: activity.difficulty,
    repeatable: activity.repeatable,
    steps: activity.steps,
    order: activity.order,
    active: activity.active,
    createdAt: activity.createdAt,
    updatedAt: activity.updatedAt,
  };
}

function validObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function validateSteps(steps, { required = false } = {}) {
  if (required && (!Array.isArray(steps) || steps.length === 0)) {
    return 'La actividad debe tener al menos un paso.';
  }

  if (steps === undefined) return '';

  if (!Array.isArray(steps)) {
    return 'Los pasos de la actividad deben ser un arreglo.';
  }

  for (const step of steps) {
    if (!step || typeof step !== 'object') {
      return 'Cada paso de la actividad debe ser un objeto válido.';
    }

    if (!step.id || typeof step.id !== 'string') {
      return 'Cada paso debe tener un identificador.';
    }

    if (!step.type || typeof step.type !== 'string') {
      return 'Cada paso debe tener un tipo.';
    }

    if (!step.question || typeof step.question !== 'string') {
      return 'Cada paso debe tener una pregunta o instrucción.';
    }

    if (!step.responseType || !ALLOWED_RESPONSE_TYPES.includes(step.responseType)) {
      return 'El tipo de respuesta de un paso no es válido.';
    }

    if (step.options !== undefined && !Array.isArray(step.options)) {
      return 'Las opciones de un paso deben ser un arreglo.';
    }

    if (Array.isArray(step.options)) {
      for (const option of step.options) {
        if (!option?.id || !option?.label) {
          return 'Cada opción debe tener identificador y etiqueta.';
        }
      }
    }
  }

  return '';
}

function validateActivityFields(payload, { partial = false, requireSteps = false } = {}) {
  const {
    activityId,
    title,
    description,
    purpose,
    type,
    category,
    instructions,
    estimatedTime,
    ageRange,
    competencies,
    emotions,
    difficulty,
    repeatable,
    steps,
    order,
  } = payload;

  if (!partial || activityId !== undefined) {
    if (!activityId || typeof activityId !== 'string' || !activityId.trim()) {
      return 'activityId es obligatorio.';
    }
  }

  if (!partial || title !== undefined) {
    if (!title || typeof title !== 'string' || title.trim().length < 2 || title.trim().length > 150) {
      return 'El título debe tener entre 2 y 150 caracteres.';
    }
  }

  for (const [field, maxLength, label] of [
    ['description', 500, 'La descripción'],
    ['purpose', 500, 'El propósito'],
    ['category', 80, 'La categoría'],
    ['instructions', 3000, 'Las instrucciones'],
  ]) {
    if (payload[field] !== undefined && (typeof payload[field] !== 'string' || payload[field].length > maxLength)) {
      return label + ' no puede superar ' + maxLength + ' caracteres.';
    }
  }

  if (type !== undefined && (!ALLOWED_TYPES.includes(type))) {
    return 'El tipo de actividad no es válido.';
  }

  if (estimatedTime !== undefined) {
    const numericTime = Number(estimatedTime);
    if (!Number.isInteger(numericTime) || numericTime < 1 || numericTime > 180) {
      return 'El tiempo estimado debe ser un entero entre 1 y 180 minutos.';
    }
  }

  if (ageRange !== undefined) {
    if (!ageRange || !Number.isInteger(Number(ageRange.min)) || !Number.isInteger(Number(ageRange.max))) {
      return 'El rango de edad no es válido.';
    }

    if (Number(ageRange.min) < 0 || Number(ageRange.max) > 100 || Number(ageRange.min) > Number(ageRange.max)) {
      return 'El rango de edad no es válido.';
    }
  }

  if (competencies !== undefined) {
    if (!competencies || typeof competencies !== 'object' || typeof competencies.primary !== 'string') {
      return 'Las competencias de la actividad no son válidas.';
    }

    if (competencies.secondary !== undefined && !Array.isArray(competencies.secondary)) {
      return 'Las competencias secundarias deben ser un arreglo.';
    }
  }

  if (emotions !== undefined && !Array.isArray(emotions)) {
    return 'Las emociones deben ser un arreglo.';
  }

  if (difficulty !== undefined && !ALLOWED_DIFFICULTIES.includes(difficulty)) {
    return 'La dificultad de la actividad no es válida.';
  }

  if (repeatable !== undefined && typeof repeatable !== 'boolean') {
    return 'El indicador repeatable no es válido.';
  }

  const stepsError = validateSteps(steps, { required: requireSteps });
  if (stepsError) return stepsError;

  if (order !== undefined) {
    const numericOrder = Number(order);
    if (!Number.isInteger(numericOrder) || numericOrder < 0) {
      return 'El orden debe ser un entero mayor o igual a 0.';
    }
  }

  return '';
}

function normalizeActivityPayload(payload) {
  const normalized = { ...payload };

  if (normalized.activityId !== undefined) {
    normalized.activityId = String(normalized.activityId).trim().toLowerCase();
  }

  for (const field of ['title', 'description', 'purpose', 'type', 'category', 'instructions']) {
    if (normalized[field] !== undefined) {
      normalized[field] = String(normalized[field]).trim();
    }
  }

  if (normalized.estimatedTime !== undefined) {
    normalized.estimatedTime = Number(normalized.estimatedTime);
  }

  if (normalized.order !== undefined) {
    normalized.order = Number(normalized.order);
  }

  if (normalized.ageRange) {
    normalized.ageRange = {
      min: Number(normalized.ageRange.min),
      max: Number(normalized.ageRange.max),
    };
  }

  if (normalized.competencies) {
    normalized.competencies = {
      primary: String(normalized.competencies.primary).trim(),
      secondary: Array.isArray(normalized.competencies.secondary)
        ? normalized.competencies.secondary.map((item) => String(item).trim()).filter(Boolean)
        : [],
    };
  }

  if (Array.isArray(normalized.emotions)) {
    normalized.emotions = normalized.emotions.map((item) => String(item).trim()).filter(Boolean);
  }

  return normalized;
}

// Lectura para cualquier usuario autenticado.
router.get('/', async (req, res, next) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 100));
    const filter = req.user.role === 'admin' ? {} : { active: true };
    const search = String(req.query.search || '').trim();
    const category = String(req.query.category || '').trim();
    const difficulty = String(req.query.difficulty || '').trim();
    const active = req.query.active;

    if (search) {
      const escaped = search.replace(/[.*+?^()|[\\]\\\\]/g, '\\\\router.get('/', async (req, res, next) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { active: true };
    const activities = await Activity.find(filter).sort({ order: 1, title: 1 });
    res.json({ activities: activities.map(publicActivity) });
  } catch (error) {
    next(error);
  }
});');
      const pattern = new RegExp(escaped, 'i');
      filter.$or = [{ title: pattern }, { activityId: pattern }, { description: pattern }];
    }
    if (category) filter.category = category;
    if (['easy', 'medium', 'hard'].includes(difficulty)) filter.difficulty = difficulty;
    if (req.user.role === 'admin' && (active === 'true' || active === 'false')) {
      filter.active = active === 'true';
    }

    const skip = (page - 1) * limit;
    const [activities, total] = await Promise.all([
      Activity.find(filter).sort({ order: 1, title: 1 }).skip(skip).limit(limit),
      Activity.countDocuments(filter),
    ]);

    res.json({
      activities: activities.map(publicActivity),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const filter = validObjectId(req.params.id)
      ? { _id: req.params.id }
      : { activityId: req.params.id.toLowerCase() };

    if (req.user.role !== 'admin') filter.active = true;

    const activity = await Activity.findOne(filter);
    if (!activity) return res.status(404).json({ message: 'Actividad no encontrada.' });

    await writeAudit({
      actor: req.user._id,
      action: 'update',
      entity: 'Activity',
      entityId: activity._id,
      summary: 'Actualizó la actividad ' + activity.title,
      changes: updates,
    });

    res.json({ activity: publicActivity(activity) });
  } catch (error) {
    next(error);
  }
});

// Administración del catálogo.
router.use(allowRoles('admin'));

router.post('/', async (req, res, next) => {
  try {
    const payload = normalizeActivityPayload(req.body);
    const validationError = validateActivityFields(payload, {
      requireSteps: payload.active !== false,
    });

    if (validationError) return res.status(400).json({ message: validationError });

    const exists = await Activity.findOne({ activityId: payload.activityId });
    if (exists) return res.status(409).json({ message: 'Ya existe una actividad con ese identificador.' });

    const activity = await Activity.create(payload);

    await writeAudit({
      actor: req.user._id,
      action: 'create',
      entity: 'Activity',
      entityId: activity._id,
      summary: 'Creó la actividad ' + activity.title,
      changes: { activityId: activity.activityId, active: activity.active },
    });

    res.status(201).json({ activity: publicActivity(activity) });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    if (!validObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Identificador de actividad no válido.' });
    }

    const updates = normalizeActivityPayload(
      Object.fromEntries(
        Object.entries(req.body).filter(([key]) => [
          'activityId',
          'title',
          'description',
          'purpose',
          'type',
          'category',
          'instructions',
          'estimatedTime',
          'ageRange',
          'competencies',
          'emotions',
          'difficulty',
          'repeatable',
          'steps',
          'order',
          'active',
        ].includes(key))
      )
    );

    const validationError = validateActivityFields(updates, { partial: true });
    if (validationError) return res.status(400).json({ message: validationError });

    if (updates.activityId !== undefined) {
      const duplicate = await Activity.findOne({
        activityId: updates.activityId,
        _id: { $ne: req.params.id },
      });

      if (duplicate) {
        return res.status(409).json({ message: 'Ya existe una actividad con ese identificador.' });
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No hay cambios válidos para guardar.' });
    }

    const currentActivity = await Activity.findById(req.params.id);
    if (!currentActivity) return res.status(404).json({ message: 'Actividad no encontrada.' });

    const finalActive = updates.active === undefined ? currentActivity.active : updates.active;
    const finalSteps = updates.steps === undefined ? currentActivity.steps : updates.steps;

    if (finalActive && (!Array.isArray(finalSteps) || finalSteps.length === 0)) {
      return res.status(400).json({ message: 'Una actividad activa debe tener al menos un paso.' });
    }

    const activity = await Activity.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!activity) return res.status(404).json({ message: 'Actividad no encontrada.' });

    res.json({ activity: publicActivity(activity) });
  } catch (error) {
    next(error);
  }
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

    await writeAudit({
      actor: req.user._id,
      action: 'deactivate',
      entity: 'Activity',
      entityId: activity._id,
      summary: 'Desactivó la actividad ' + activity.title,
      changes: { active: false },
    });

    res.json({
      message: 'Actividad desactivada correctamente.',
      activity: publicActivity(activity),
    });
  } catch (error) {
    next(error);
  }
});

export default router;
