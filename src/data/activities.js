const activities = [
  {
    id: 'reconociendo-mis-fortalezas',

    title: 'Reconociendo mis fortalezas',

    description:
      'Una experiencia para descubrir habilidades y cualidades que ya forman parte de ti.',

    type: 'reflection',

    estimatedTime: 5,

    ageRange: {
      min: 13,
      max: 18,
    },

    competencies: [
      'autoconocimiento',
    ],

    emotions: [
      'alegria',
      'tranquilidad',
      'motivacion',
    ],

    difficulty: 'easy',

    repeatable: true,

    steps: [
      {
        id: 'step-1',

        type: 'question',

        question:
          '¿Qué cosas haces bien y que otras personas suelen reconocer en ti?',

        responseType: 'textarea',
      },

      {
        id: 'step-2',

        type: 'question',

        question:
          '¿Qué característica tuya te gustaría valorar más?',

        responseType: 'textarea',
      },

      {
        id: 'step-3',

        type: 'reflection',

        question:
          'Piensa en una situación reciente en la que una de tus fortalezas te haya ayudado.',

        responseType: 'textarea',
      },
    ],
  },


  {
    id: 'cuando-algo-me-frustra',

    title: 'Cuando algo me frustra',

    description:
      'Explora qué ocurre contigo cuando las cosas no salen como esperabas.',

    type: 'emotional',

    estimatedTime: 5,

    ageRange: {
      min: 13,
      max: 18,
    },

    competencies: [
      'autoconocimiento',
      'autorregulacion',
    ],

    emotions: [
      'frustracion',
      'enojo',
      'tristeza',
    ],

    difficulty: 'easy',

    repeatable: true,

    steps: [
      {
        id: 'step-1',

        type: 'question',

        question:
          '¿Qué suele pasar contigo cuando algo no sale como esperabas?',

        responseType: 'single-choice',

        options: [
          {
            id: 'me-alejo',
            label: 'Prefiero alejarme',
          },

          {
            id: 'me-enojo',
            label: 'Me enojo fácilmente',
          },

          {
            id: 'insisto',
            label: 'Intento seguir',
          },

          {
            id: 'me-desanimo',
            label: 'Me desanimo',
          },
        ],
      },

      {
        id: 'step-2',

        type: 'reflection',

        question:
          '¿Qué crees que necesitas en esos momentos?',

        responseType: 'textarea',
      },
    ],
  },


  {
    id: 'ponte-en-mi-lugar',

    title: 'Ponte en mi lugar',

    description:
      'Observa una situación desde el punto de vista de otra persona.',

    type: 'situation',

    estimatedTime: 5,

    ageRange: {
      min: 13,
      max: 18,
    },

    competencies: [
      'empatia',
      'relaciones',
    ],

    emotions: [
      'preocupacion',
      'tristeza',
      'enojo',
    ],

    difficulty: 'medium',

    repeatable: true,

    steps: [
      {
        id: 'step-1',

        type: 'situation',

        question:
          'Un compañero llega al salón y notas que está más callado de lo habitual. ¿Qué harías?',

        responseType: 'single-choice',

        options: [
          {
            id: 'preguntar',
            label:
              'Le preguntaría si está bien.',
          },

          {
            id: 'esperar',
            label:
              'Esperaría a que quisiera hablar.',
          },

          {
            id: 'ignorar',
            label:
              'No haría nada.',
          },

          {
            id: 'avisar',
            label:
              'Buscaría a alguien que pudiera ayudar.',
          },
        ],
      },

      {
        id: 'step-2',

        type: 'reflection',

        question:
          '¿Por qué elegiste esa opción?',

        responseType: 'textarea',
      },
    ],
  },


  {
    id: 'decir-lo-que-necesito',

    title: 'Decir lo que necesito',

    description:
      'Practica formas de expresar lo que necesitas sin atacar ni ignorar a los demás.',

    type: 'situation',

    estimatedTime: 5,

    ageRange: {
      min: 13,
      max: 18,
    },

    competencies: [
      'autorregulacion',
      'relaciones',
    ],

    emotions: [
      'enojo',
      'frustracion',
      'tranquilidad',
    ],

    difficulty: 'medium',

    repeatable: true,

    steps: [
      {
        id: 'step-1',

        type: 'situation',

        question:
          'Un amigo hizo algo que te molestó. ¿Cómo podrías expresarlo?',

        responseType: 'single-choice',

        options: [
          {
            id: 'agresivo',
            label:
              'Le diría que siempre hace lo mismo.',
          },

          {
            id: 'asertivo',
            label:
              'Le explicaría cómo me hizo sentir.',
          },

          {
            id: 'callar',
            label:
              'Preferiría no decir nada.',
          },

          {
            id: 'alejarme',
            label:
              'Me alejaría sin explicar lo ocurrido.',
          },
        ],
      },

      {
        id: 'step-2',

        type: 'reflection',

        question:
          '¿Qué podría cambiar si expresaras lo que necesitas de manera clara y respetuosa?',

        responseType: 'textarea',
      },
    ],
  },
];


export default activities;