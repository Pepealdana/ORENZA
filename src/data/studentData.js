const studentData = {
  id: 'student-001',

  name: 'Alex',

  grade: '10°',

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

      text:
        'Me gusta ayudar a otras personas.',

      competency: 'autoconocimiento',
    },

    {
      id: 'discovery-002',

      date: '2026-08-17',

      text:
        'Cuando hago una pausa puedo responder mejor.',

      competency: 'autorregulacion',
    },
  ],

  competencies: [
    {
      id: 'autoconocimiento',

      name: 'Autoconocimiento',

      description:
        'Conoce mejor lo que piensas, sientes, valoras y haces.',
    },

    {
      id: 'autorregulacion',

      name: 'Autorregulación emocional',

      description:
        'Aprende a reconocer tus emociones y encontrar formas saludables de responder.',
    },

    {
      id: 'empatia',

      name: 'Empatía',

      description:
        'Explora diferentes perspectivas y fortalece tu capacidad para comprender a los demás.',
    },

    {
      id: 'relaciones',

      name: 'Relaciones positivas',

      description:
        'Fortalece la comunicación, el respeto, los límites y los vínculos con otras personas.',
    },
  ],
};

export default studentData;