const studentData = {
  id: 'student-001',

  name: 'Alex',

  grade: '10°',

  progress: {
    overall: 75,
    completedActivities: 8,
    totalActivities: 12,
  },

  streak: {
    current: 7,
    longest: 12,
    lastActivityDate: '2026-08-18',
  },

  emotionalCheckIns: [
    {
      id: 'checkin-001',
      date: '2026-08-12',
      mood: 'good',
      emotion: 'tranquilidad',
      intensity: 3,
    },
    {
      id: 'checkin-002',
      date: '2026-08-13',
      mood: 'very-good',
      emotion: 'alegría',
      intensity: 4,
    },
    {
      id: 'checkin-003',
      date: '2026-08-14',
      mood: 'neutral',
      emotion: 'cansancio',
      intensity: 3,
    },
    {
      id: 'checkin-004',
      date: '2026-08-15',
      mood: 'good',
      emotion: 'tranquilidad',
      intensity: 3,
    },
    {
      id: 'checkin-005',
      date: '2026-08-16',
      mood: 'not-good',
      emotion: 'preocupación',
      intensity: 3,
    },
    {
      id: 'checkin-006',
      date: '2026-08-17',
      mood: 'good',
      emotion: 'motivación',
      intensity: 4,
    },
    {
      id: 'checkin-007',
      date: '2026-08-18',
      mood: 'good',
      emotion: 'tranquilidad',
      intensity: 3,
    },
  ],

  today: {
    checkInCompleted: false,

    challenge: {
      id: 'challenge-001',
      title: 'Escucha sin interrumpir',
      description:
        'Hoy intenta escuchar a alguien con atención, sin preparar tu respuesta mientras habla.',
      competency: 'empatia',
      estimatedTime: 'Durante el día',
    },

    suggestedActivity: {
      id: 'activity-001',
      title: 'Reconociendo mis fortalezas',
      description:
        'Descubre algunas capacidades que forman parte de quién eres.',
      competency: 'autoconocimiento',
      estimatedTime: '5 minutos',
    },
  },

  discoveries: [
    {
      id: 'discovery-001',
      date: '2026-08-15',
      text: 'Me gusta ayudar a otras personas.',
      competency: 'autoconocimiento',
    },
    {
      id: 'discovery-002',
      date: '2026-08-17',
      text: 'Cuando hago una pausa puedo responder mejor.',
      competency: 'autorregulacion',
    },
  ],

  competencies: [
    {
      id: 'autoconocimiento',
      name: 'Autoconocimiento',
      progress: 72,
      description:
        'Conoce mejor lo que piensas, sientes, valoras y haces.',
    },
    {
      id: 'autorregulacion',
      name: 'Autorregulación emocional',
      progress: 64,
      description:
        'Aprende a reconocer tus emociones y encontrar formas saludables de responder.',
    },
    {
      id: 'empatia',
      name: 'Empatía',
      progress: 70,
      description:
        'Explora diferentes perspectivas y fortalece tu capacidad para comprender a los demás.',
    },
    {
      id: 'relaciones',
      name: 'Relaciones positivas',
      progress: 66,
      description:
        'Fortalece la comunicación, el respeto, los límites y los vínculos con otras personas.',
    },
  ],

  recentActivities: [
    {
      id: 'activity-001',
      title: 'Reconociendo mis fortalezas',
      status: 'completed',
      date: '2026-08-17',
      competency: 'autoconocimiento',
    },
    {
      id: 'activity-002',
      title: 'Mis emociones y cómo las expreso',
      status: 'in-progress',
      date: '2026-08-18',
      competency: 'autorregulacion',
    },
  ],

  recommendedResources: [
    {
      id: 'resource-001',
      title: 'Conocer mis fortalezas',
      type: 'Lectura',
    },
    {
      id: 'resource-002',
      title: 'Comunicación asertiva',
      type: 'Guía',
    },
  ],
};

export default studentData;