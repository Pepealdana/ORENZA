const studentData = {
  id: 'student-001',

  name: 'Alex',

  grade: '10°',

  progress: {
    overall: 75,
    completedActivities: 8,
    totalActivities: 12,
  },

  competencies: [
    {
      id: 'autoconocimiento',
      name: 'Autoconocimiento',
      progress: 72,
    },
    {
      id: 'autorregulacion',
      name: 'Autorregulación emocional',
      progress: 64,
    },
    {
      id: 'empatia',
      name: 'Empatía',
      progress: 70,
    },
    {
      id: 'relaciones',
      name: 'Relaciones positivas',
      progress: 66,
    },
  ],

  recentActivities: [
    {
      id: 'activity-001',
      title: 'Reconociendo mis fortalezas',
      status: 'completed',
      date: '2026-08-17',
    },
    {
      id: 'activity-002',
      title: 'Mis emociones y cómo las expreso',
      status: 'in-progress',
      date: '2026-08-18',
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