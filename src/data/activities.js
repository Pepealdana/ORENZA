const activities = [
  /*
   * ========================================
   * AUTOCONOCIMIENTO
   * ========================================
   */

  {
    id: 'reconociendo-mis-fortalezas',

    title: 'Reconociendo mis fortalezas',

    description:
      'Una experiencia para descubrir habilidades y cualidades que ya forman parte de ti.',

    purpose:
      'Reconocer capacidades y cualidades personales que el estudiante ya posee.',

    type: 'reflection',

    estimatedTime: 5,

    ageRange: {
      min: 13,
      max: 18,
    },

    competencies: {
      primary: 'autoconocimiento',

      secondary: [
        'relaciones-positivas',
      ],
    },

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
    id: 'lo-que-me-hace-ser-yo',

    title: 'Lo que me hace ser yo',

    description:
      'Explora algunas de las cosas, personas y experiencias que han ido formando quién eres.',

    purpose:
      'Explorar aspectos personales que contribuyen a la construcción de la identidad.',

    type: 'exploration',

    estimatedTime: 7,

    ageRange: {
      min: 13,
      max: 18,
    },

    competencies: {
      primary: 'autoconocimiento',

      secondary: [],
    },

    emotions: [
      'tranquilidad',
      'alegria',
      'motivacion',
    ],

    difficulty: 'easy',

    repeatable: true,

    steps: [
      {
        id: 'step-1',

        type: 'question',

        question:
          '¿Qué tres cosas sientes que hacen parte importante de quién eres?',

        responseType: 'textarea',
      },

      {
        id: 'step-2',

        type: 'question',

        question:
          '¿Hay alguna experiencia que haya cambiado tu manera de pensar o de ver las cosas?',

        responseType: 'textarea',
      },

      {
        id: 'step-3',

        type: 'reflection',

        question:
          'Si tuvieras que describirte sin hablar de tus notas, edad o apariencia, ¿qué dirías de ti?',

        responseType: 'textarea',
      },
    ],
  },


  {
    id: 'mis-intereses-hablan-de-mi',

    title: 'Mis intereses hablan de mí',

    description:
      'Descubre qué pueden decir tus gustos e intereses sobre lo que valoras y disfrutas.',

    purpose:
      'Reconocer intereses personales como una fuente de exploración y autoconocimiento.',

    type: 'exploration',

    estimatedTime: 5,

    ageRange: {
      min: 13,
      max: 18,
    },

    competencies: {
      primary: 'autoconocimiento',

      secondary: [],
    },

    emotions: [
      'alegria',
      'motivacion',
      'tranquilidad',
    ],

    difficulty: 'easy',

    repeatable: true,

    steps: [
      {
        id: 'step-1',

        type: 'question',

        question:
          '¿Qué actividades podrías hacer durante mucho tiempo sin sentir que es una obligación?',

        responseType: 'textarea',
      },

      {
        id: 'step-2',

        type: 'question',

        question:
          '¿Qué tema podrías pasar horas aprendiendo o investigando?',

        responseType: 'textarea',
      },

      {
        id: 'step-3',

        type: 'reflection',

        question:
          '¿Qué crees que tus intereses dicen sobre ti?',

        responseType: 'textarea',
      },
    ],
  },


  {
    id: 'lo-que-valoro-de-verdad',

    title: 'Lo que valoro de verdad',

    description:
      'Explora las cosas que consideras importantes y que influyen en tus decisiones.',

    purpose:
      'Identificar valores personales y reconocer cómo pueden influir en las decisiones.',

    type: 'reflection',

    estimatedTime: 7,

    ageRange: {
      min: 13,
      max: 18,
    },

    competencies: {
      primary: 'autoconocimiento',

      secondary: [
        'autorregulacion',
      ],
    },

    emotions: [
      'tranquilidad',
      'motivacion',
    ],

    difficulty: 'medium',

    repeatable: true,

    steps: [
      {
        id: 'step-1',

        type: 'question',

        question:
          '¿Qué cualidades valoras mucho en otras personas?',

        responseType: 'textarea',
      },

      {
        id: 'step-2',

        type: 'question',

        question:
          '¿Cuál de esas cualidades te gustaría fortalecer en ti?',

        responseType: 'textarea',
      },

      {
        id: 'step-3',

        type: 'reflection',

        question:
          'Piensa en una decisión reciente. ¿Qué fue importante para ti al tomarla?',

        responseType: 'textarea',
      },
    ],
  },


  /*
   * ========================================
   * AUTORREGULACIÓN
   * ========================================
   */

  {
    id: 'cuando-algo-me-frustra',

    title: 'Cuando algo me frustra',

    description:
      'Explora qué ocurre contigo cuando las cosas no salen como esperabas.',

    purpose:
      'Reconocer respuestas personales ante la frustración y explorar qué puede ayudar en esos momentos.',

    type: 'emotional',

    estimatedTime: 5,

    ageRange: {
      min: 13,
      max: 18,
    },

    competencies: {
      primary: 'autorregulacion',

      secondary: [
        'autoconocimiento',
      ],
    },

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
            label: 'Prefiero alejarme.',
          },

          {
            id: 'me-enojo',
            label: 'Me enojo fácilmente.',
          },

          {
            id: 'insisto',
            label: 'Intento seguir.',
          },

          {
            id: 'me-desanimo',
            label: 'Me desanimo.',
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
    id: 'antes-de-reaccionar',

    title: 'Antes de reaccionar',

    description:
      'Explora qué ocurre cuando tienes una reacción inmediata y qué otras posibilidades existen.',

    purpose:
      'Reconocer el espacio entre una emoción y una reacción.',

    type: 'situation',

    estimatedTime: 5,

    ageRange: {
      min: 13,
      max: 18,
    },

    competencies: {
      primary: 'autorregulacion',

      secondary: [
        'empatia',
        'relaciones-positivas',
      ],
    },

    emotions: [
      'enojo',
      'frustracion',
      'preocupacion',
    ],

    difficulty: 'medium',

    repeatable: true,

    steps: [
      {
        id: 'step-1',

        type: 'situation',

        question:
          'Alguien te responde de una manera que consideras injusta. ¿Qué es lo primero que podrías hacer?',

        responseType: 'single-choice',

        options: [
          {
            id: 'responder-inmediatamente',
            label:
              'Respondería inmediatamente.',
          },

          {
            id: 'tomar-distancia',
            label:
              'Me tomaría un momento antes de responder.',
          },

          {
            id: 'preguntar',
            label:
              'Intentaría entender qué quiso decir.',
          },

          {
            id: 'ignorar',
            label:
              'Preferiría ignorar la situación.',
          },
        ],
      },

      {
        id: 'step-2',

        type: 'reflection',

        question:
          '¿Qué podría cambiar si te dieras unos segundos antes de reaccionar?',

        responseType: 'textarea',
      },
    ],
  },


  {
    id: 'que-puedo-controlar',

    title: '¿Qué puedo controlar?',

    description:
      'Diferencia aquello que depende de ti de aquello que está fuera de tu control.',

    purpose:
      'Explorar la diferencia entre situaciones que dependen de las propias acciones y aquellas que no.',

    type: 'reflection',

    estimatedTime: 5,

    ageRange: {
      min: 13,
      max: 18,
    },

    competencies: {
      primary: 'autorregulacion',

      secondary: [
        'autoconocimiento',
      ],
    },

    emotions: [
      'preocupacion',
      'frustracion',
      'tranquilidad',
    ],

    difficulty: 'easy',

    repeatable: true,

    steps: [
      {
        id: 'step-1',

        type: 'question',

        question:
          'Piensa en algo que te preocupa actualmente. ¿Qué parte de esa situación depende de ti?',

        responseType: 'textarea',
      },

      {
        id: 'step-2',

        type: 'question',

        question:
          '¿Qué parte no puedes controlar?',

        responseType: 'textarea',
      },

      {
        id: 'step-3',

        type: 'reflection',

        question:
          '¿Qué pequeña acción sí puedes realizar?',

        responseType: 'textarea',
      },
    ],
  },


  /*
   * ========================================
   * EMPATÍA
   * ========================================
   */

  {
    id: 'ponte-en-mi-lugar',

    title: 'Ponte en mi lugar',

    description:
      'Observa una situación desde el punto de vista de otra persona.',

    purpose:
      'Explorar diferentes perspectivas antes de interpretar las acciones de otra persona.',

    type: 'situation',

    estimatedTime: 5,

    ageRange: {
      min: 13,
      max: 18,
    },

    competencies: {
      primary: 'empatia',

      secondary: [
        'relaciones-positivas',
      ],
    },

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
    id: 'lo-que-quiza-no-estoy-viendo',

    title: 'Lo que quizá no estoy viendo',

    description:
      'Una situación puede verse diferente dependiendo de lo que cada persona está viviendo.',

    purpose:
      'Reconocer que una misma situación puede tener diferentes interpretaciones y experiencias.',

    type: 'exploration',

    estimatedTime: 7,

    ageRange: {
      min: 13,
      max: 18,
    },

    competencies: {
      primary: 'empatia',

      secondary: [
        'autoconocimiento',
      ],
    },

    emotions: [
      'preocupacion',
      'tristeza',
      'tranquilidad',
    ],

    difficulty: 'medium',

    repeatable: true,

    steps: [
      {
        id: 'step-1',

        type: 'situation',

        question:
          'Un amigo deja de responder tus mensajes durante todo el día. ¿Qué explicaciones podrían existir además de que esté molesto contigo?',

        responseType: 'textarea',
      },

      {
        id: 'step-2',

        type: 'reflection',

        question:
          '¿Qué diferencia hay entre lo que sabes y lo que estás imaginando?',

        responseType: 'textarea',
      },
    ],
  },


  /*
   * ========================================
   * RELACIONES POSITIVAS
   * ========================================
   */

  {
    id: 'decir-lo-que-necesito',

    title: 'Decir lo que necesito',

    description:
      'Practica formas de expresar lo que necesitas sin atacar ni ignorar a los demás.',

    purpose:
      'Explorar formas claras y respetuosas de comunicar necesidades personales.',

    type: 'situation',

    estimatedTime: 5,

    ageRange: {
      min: 13,
      max: 18,
    },

    competencies: {
      primary: 'relaciones-positivas',

      secondary: [
        'autorregulacion',
      ],
    },

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


  {
    id: 'mis-limites-tambien-importan',

    title: 'Mis límites también importan',

    description:
      'Explora cómo reconocer y comunicar tus propios límites en las relaciones.',

    purpose:
      'Reconocer situaciones en las que es necesario expresar límites personales.',

    type: 'reflection',

    estimatedTime: 7,

    ageRange: {
      min: 13,
      max: 18,
    },

    competencies: {
      primary: 'relaciones-positivas',

      secondary: [
        'autoconocimiento',
        'autorregulacion',
      ],
    },

    emotions: [
      'enojo',
      'frustracion',
      'preocupacion',
      'tranquilidad',
    ],

    difficulty: 'medium',

    repeatable: true,

    steps: [
      {
        id: 'step-1',

        type: 'question',

        question:
          '¿Qué situaciones hacen que sientas que necesitas decir "hasta aquí"?',

        responseType: 'textarea',
      },

      {
        id: 'step-2',

        type: 'question',

        question:
          '¿Qué te resulta difícil cuando necesitas poner un límite?',

        responseType: 'textarea',
      },

      {
        id: 'step-3',

        type: 'reflection',

        question:
          '¿Cómo podrías expresar un límite sin dejar de respetar a la otra persona?',

        responseType: 'textarea',
      },
    ],
  },
];


export default activities;