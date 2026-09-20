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

  /*
   * ========================================
   * EXPERIENCIAS ADICIONALES — AUTOCONOCIMIENTO
   * ========================================
   */

  {
    id: 'mi-mapa-personal',
    title: 'Mi mapa personal',
    description: 'Reconoce personas, lugares, actividades y experiencias que forman parte de tu historia.',
    purpose: 'Explorar elementos significativos de la propia identidad.',
    type: 'creative',
    estimatedTime: 8,
    ageRange: { min: 13, max: 18 },
    competencies: { primary: 'autoconocimiento', secondary: ['relaciones-positivas'] },
    emotions: ['tranquilidad', 'alegria', 'motivacion'],
    difficulty: 'easy',
    repeatable: true,
    steps: [
      { id: 'step-1', type: 'question', question: 'Escribe tres personas, lugares o actividades que sean importantes para ti.', responseType: 'textarea' },
      { id: 'step-2', type: 'question', question: '¿Qué has aprendido de alguno de ellos?', responseType: 'textarea' },
      { id: 'step-3', type: 'reflection', question: '¿Qué parte de ese mapa te gustaría cuidar o explorar más?', responseType: 'textarea' },
    ],
  },

  {
    id: 'lo-que-he-aprendido-de-mi',
    title: 'Lo que he aprendido de mí',
    description: 'Mira experiencias recientes y descubre qué te han enseñado sobre ti.',
    purpose: 'Identificar aprendizajes personales a partir de experiencias cotidianas.',
    type: 'journal',
    estimatedTime: 6,
    ageRange: { min: 13, max: 18 },
    competencies: { primary: 'autoconocimiento', secondary: [] },
    emotions: ['tranquilidad', 'motivacion'],
    difficulty: 'easy',
    repeatable: true,
    steps: [
      { id: 'step-1', type: 'question', question: 'Piensa en algo que hayas aprendido recientemente sobre ti.', responseType: 'textarea' },
      { id: 'step-2', type: 'question', question: '¿Qué situación te ayudó a descubrirlo?', responseType: 'textarea' },
      { id: 'step-3', type: 'reflection', question: '¿Cómo podrías usar ese aprendizaje en una situación futura?', responseType: 'textarea' },
    ],
  },

  {
    id: 'mis-pequenas-victorias',
    title: 'Mis pequeñas victorias',
    description: 'Reconoce avances cotidianos que a veces pasan desapercibidos.',
    purpose: 'Valorar procesos y avances personales sin compararse con otras personas.',
    type: 'reflection',
    estimatedTime: 5,
    ageRange: { min: 13, max: 18 },
    competencies: { primary: 'autoconocimiento', secondary: ['autorregulacion'] },
    emotions: ['alegria', 'motivacion', 'tranquilidad'],
    difficulty: 'easy',
    repeatable: true,
    steps: [
      { id: 'step-1', type: 'question', question: 'Menciona tres cosas pequeñas que hayas logrado o intentado recientemente.', responseType: 'textarea' },
      { id: 'step-2', type: 'question', question: '¿Cuál de ellas te costó más de lo que parecía?', responseType: 'textarea' },
      { id: 'step-3', type: 'reflection', question: '¿Qué te gustaría reconocer más de tu propio proceso?', responseType: 'textarea' },
    ],
  },

  {
    id: 'mi-version-del-futuro',
    title: 'Mi versión del futuro',
    description: 'Imagina cómo te gustaría verte desarrollando algunas de tus capacidades.',
    purpose: 'Explorar aspiraciones personales desde una perspectiva flexible y realista.',
    type: 'exploration',
    estimatedTime: 8,
    ageRange: { min: 13, max: 18 },
    competencies: { primary: 'autoconocimiento', secondary: ['autorregulacion'] },
    emotions: ['motivacion', 'tranquilidad'],
    difficulty: 'medium',
    repeatable: true,
    steps: [
      { id: 'step-1', type: 'question', question: '¿Qué habilidad personal te gustaría fortalecer durante los próximos meses?', responseType: 'textarea' },
      { id: 'step-2', type: 'question', question: '¿Por qué sería importante para ti?', responseType: 'textarea' },
      { id: 'step-3', type: 'reflection', question: '¿Cuál sería un primer paso pequeño y posible?', responseType: 'textarea' },
    ],
  },

  {
    id: 'lo-que-me-motiva',
    title: 'Lo que me motiva',
    description: 'Explora qué situaciones despiertan tu interés, curiosidad o ganas de aprender.',
    purpose: 'Identificar fuentes personales de motivación y curiosidad.',
    type: 'observation',
    estimatedTime: 6,
    ageRange: { min: 13, max: 18 },
    competencies: { primary: 'autoconocimiento', secondary: [] },
    emotions: ['alegria', 'motivacion'],
    difficulty: 'easy',
    repeatable: true,
    steps: [
      { id: 'step-1', type: 'question', question: '¿Qué actividades hacen que pierdas la noción del tiempo porque te interesan?', responseType: 'textarea' },
      { id: 'step-2', type: 'question', question: '¿Prefieres aprender haciendo, leyendo, conversando, creando o de otra manera?', responseType: 'textarea' },
      { id: 'step-3', type: 'reflection', question: '¿Cómo podrías aprovechar una de esas formas de motivación esta semana?', responseType: 'textarea' },
    ],
  },


  /*
   * ========================================
   * EXPERIENCIAS ADICIONALES — AUTORREGULACIÓN
   * ========================================
   */

  {
    id: 'mi-pausa-consciente',
    title: 'Mi pausa consciente',
    description: 'Identifica una pausa sencilla que puedas utilizar cuando necesites ordenar tus ideas.',
    purpose: 'Explorar estrategias cotidianas de pausa antes de actuar.',
    type: 'challenge',
    estimatedTime: 4,
    ageRange: { min: 13, max: 18 },
    competencies: { primary: 'autorregulacion', secondary: ['autoconocimiento'] },
    emotions: ['enojo', 'frustracion', 'preocupacion'],
    difficulty: 'easy',
    repeatable: true,
    steps: [
      { id: 'step-1', type: 'question', question: '¿Cómo notas que necesitas hacer una pausa?', responseType: 'textarea' },
      { id: 'step-2', type: 'question', question: '¿Qué acción breve te resulta más natural: respirar, tomar agua, caminar o guardar silencio?', responseType: 'textarea' },
      { id: 'step-3', type: 'reflection', question: '¿En qué situación cotidiana podrías probarla?', responseType: 'textarea' },
    ],
  },

  {
    id: 'semaforo-de-reacciones',
    title: 'Semáforo de reacciones',
    description: 'Diferencia una reacción impulsiva, una pausa y una respuesta pensada.',
    purpose: 'Reconocer alternativas entre reaccionar inmediatamente y responder con intención.',
    type: 'situation',
    estimatedTime: 6,
    ageRange: { min: 13, max: 18 },
    competencies: { primary: 'autorregulacion', secondary: ['relaciones-positivas'] },
    emotions: ['enojo', 'frustracion', 'preocupacion'],
    difficulty: 'medium',
    repeatable: true,
    steps: [
      { id: 'step-1', type: 'question', question: 'Piensa en una situación que suele alterarte. ¿Qué sería una reacción en “rojo”?', responseType: 'textarea' },
      { id: 'step-2', type: 'question', question: '¿Qué podría significar poner la situación en “amarillo” y hacer una pausa?', responseType: 'textarea' },
      { id: 'step-3', type: 'reflection', question: '¿Cómo sería una respuesta en “verde” que cuide lo que necesitas y también a los demás?', responseType: 'textarea' },
    ],
  },

  {
    id: 'cuando-mi-mente-se-llena',
    title: 'Cuando mi mente se llena',
    description: 'Observa qué haces cuando tienes muchas cosas pendientes o pensamientos al mismo tiempo.',
    purpose: 'Reconocer señales de saturación cotidiana y organizar pequeñas acciones posibles.',
    type: 'journal',
    estimatedTime: 7,
    ageRange: { min: 13, max: 18 },
    competencies: { primary: 'autorregulacion', secondary: ['autoconocimiento'] },
    emotions: ['preocupacion', 'frustracion'],
    difficulty: 'medium',
    repeatable: true,
    steps: [
      { id: 'step-1', type: 'question', question: '¿Qué suele pasar cuando tienes demasiadas cosas en la cabeza?', responseType: 'textarea' },
      { id: 'step-2', type: 'question', question: 'Escribe tres cosas que tengas pendientes y ordénalas por prioridad.', responseType: 'textarea' },
      { id: 'step-3', type: 'reflection', question: '¿Cuál es la primera acción pequeña que puedes realizar?', responseType: 'textarea' },
    ],
  },

  {
    id: 'elegir-con-calma',
    title: 'Elegir con calma',
    description: 'Practica detenerte a considerar opciones antes de tomar una decisión cotidiana.',
    purpose: 'Explorar una secuencia sencilla para tomar decisiones con mayor intención.',
    type: 'decision',
    estimatedTime: 6,
    ageRange: { min: 13, max: 18 },
    competencies: { primary: 'autorregulacion', secondary: ['autoconocimiento'] },
    emotions: ['preocupacion', 'tranquilidad'],
    difficulty: 'medium',
    repeatable: true,
    steps: [
      { id: 'step-1', type: 'question', question: 'Piensa en una decisión pequeña que tengas pendiente. ¿Cuáles son tus opciones?', responseType: 'textarea' },
      { id: 'step-2', type: 'question', question: '¿Qué podría pasar con cada opción?', responseType: 'textarea' },
      { id: 'step-3', type: 'reflection', question: '¿Qué opción se relaciona mejor con lo que quieres cuidar o conseguir?', responseType: 'textarea' },
    ],
  },


  /*
   * ========================================
   * EXPERIENCIAS ADICIONALES — EMPATÍA
   * ========================================
   */

  {
    id: 'dos-miradas-una-situacion',
    title: 'Dos miradas, una situación',
    description: 'Explora cómo dos personas pueden vivir de manera diferente una misma situación.',
    purpose: 'Practicar la toma de perspectiva sin asumir que conocemos lo que otra persona piensa.',
    type: 'situation',
    estimatedTime: 7,
    ageRange: { min: 13, max: 18 },
    competencies: { primary: 'empatia', secondary: ['relaciones-positivas'] },
    emotions: ['preocupacion', 'enojo', 'tranquilidad'],
    difficulty: 'medium',
    repeatable: true,
    steps: [
      { id: 'step-1', type: 'question', question: 'Piensa en un desacuerdo reciente. ¿Cómo lo viste tú?', responseType: 'textarea' },
      { id: 'step-2', type: 'question', question: '¿Qué podría haber visto o sentido la otra persona?', responseType: 'textarea' },
      { id: 'step-3', type: 'reflection', question: '¿Qué información te faltaría para comprender mejor la situación?', responseType: 'textarea' },
    ],
  },

  {
    id: 'escuchar-sin-resolver',
    title: 'Escuchar sin resolver',
    description: 'Practica escuchar a alguien sin convertir inmediatamente la conversación en un problema que debes solucionar.',
    purpose: 'Diferenciar escuchar, comprender y aconsejar en una conversación.',
    type: 'challenge',
    estimatedTime: 5,
    ageRange: { min: 13, max: 18 },
    competencies: { primary: 'empatia', secondary: ['relaciones-positivas'] },
    emotions: ['tranquilidad', 'preocupacion'],
    difficulty: 'easy',
    repeatable: true,
    steps: [
      { id: 'step-1', type: 'question', question: 'Cuando alguien te cuenta un problema, ¿qué haces normalmente?', responseType: 'textarea' },
      { id: 'step-2', type: 'question', question: '¿Qué pregunta podrías hacer para comprender mejor antes de dar una opinión?', responseType: 'textarea' },
      { id: 'step-3', type: 'reflection', question: '¿Qué podría sentir una persona cuando nota que realmente la están escuchando?', responseType: 'textarea' },
    ],
  },

  {
    id: 'no-tengo-toda-la-historia',
    title: 'No tengo toda la historia',
    description: 'Distingue entre lo que observas y lo que supones sobre una persona.',
    purpose: 'Reducir interpretaciones apresuradas y abrir espacio a diferentes explicaciones.',
    type: 'observation',
    estimatedTime: 5,
    ageRange: { min: 13, max: 18 },
    competencies: { primary: 'empatia', secondary: ['autoconocimiento'] },
    emotions: ['preocupacion', 'enojo'],
    difficulty: 'easy',
    repeatable: true,
    steps: [
      { id: 'step-1', type: 'question', question: 'Alguien no te saluda al llegar. ¿Qué sabes realmente de la situación?', responseType: 'textarea' },
      { id: 'step-2', type: 'question', question: 'Escribe dos explicaciones diferentes que también podrían ser posibles.', responseType: 'textarea' },
      { id: 'step-3', type: 'reflection', question: '¿Qué pregunta respetuosa podrías hacer antes de sacar una conclusión?', responseType: 'textarea' },
    ],
  },

  {
    id: 'palabras-que-acompanan',
    title: 'Palabras que acompañan',
    description: 'Explora cómo una misma intención puede expresarse de formas que hacen sentir diferente a la otra persona.',
    purpose: 'Reconocer el impacto de las palabras y elegir formas de comunicación consideradas.',
    type: 'creative',
    estimatedTime: 6,
    ageRange: { min: 13, max: 18 },
    competencies: { primary: 'empatia', secondary: ['relaciones-positivas'] },
    emotions: ['tranquilidad', 'alegria'],
    difficulty: 'medium',
    repeatable: true,
    steps: [
      { id: 'step-1', type: 'question', question: 'Piensa en una frase que alguien podría decir cuando otra persona está pasando por un momento difícil.', responseType: 'textarea' },
      { id: 'step-2', type: 'question', question: '¿Cómo podrías decirla de una manera que acompañe sin minimizar lo que siente?', responseType: 'textarea' },
      { id: 'step-3', type: 'reflection', question: '¿Qué diferencia hay entre intentar arreglar un problema y acompañar a alguien?', responseType: 'textarea' },
    ],
  },


  /*
   * ========================================
   * EXPERIENCIAS ADICIONALES — RELACIONES POSITIVAS
   * ========================================
   */

  {
    id: 'pedir-ayuda-tambien-es-cuidarme',
    title: 'Pedir ayuda también es cuidarme',
    description: 'Explora cómo identificar cuándo necesitas apoyo y cómo puedes pedirlo de manera clara.',
    purpose: 'Reconocer la búsqueda de apoyo como una habilidad de cuidado personal y relacional.',
    type: 'reflection',
    estimatedTime: 6,
    ageRange: { min: 13, max: 18 },
    competencies: { primary: 'relaciones-positivas', secondary: ['autoconocimiento'] },
    emotions: ['preocupacion', 'tristeza', 'tranquilidad'],
    difficulty: 'easy',
    repeatable: true,
    steps: [
      { id: 'step-1', type: 'question', question: '¿Qué señales te indican que sería bueno hablar con alguien de confianza?', responseType: 'textarea' },
      { id: 'step-2', type: 'question', question: '¿Con quién podrías hablar en una situación cotidiana?', responseType: 'textarea' },
      { id: 'step-3', type: 'reflection', question: 'Escribe una frase sencilla que podrías usar para pedir apoyo.', responseType: 'textarea' },
    ],
  },

  {
    id: 'conversaciones-dificiles',
    title: 'Conversaciones difíciles',
    description: 'Prepara una conversación importante pensando qué quieres expresar y cómo quieres hacerlo.',
    purpose: 'Practicar una comunicación clara y respetuosa en situaciones difíciles.',
    type: 'decision',
    estimatedTime: 8,
    ageRange: { min: 13, max: 18 },
    competencies: { primary: 'relaciones-positivas', secondary: ['autorregulacion'] },
    emotions: ['enojo', 'frustracion', 'preocupacion'],
    difficulty: 'medium',
    repeatable: true,
    steps: [
      { id: 'step-1', type: 'question', question: '¿Qué necesitas expresar y qué te gustaría que la otra persona comprendiera?', responseType: 'textarea' },
      { id: 'step-2', type: 'question', question: '¿Qué palabras deberías evitar para no convertir la conversación en un ataque?', responseType: 'textarea' },
      { id: 'step-3', type: 'reflection', question: '¿Qué sería una forma respetuosa de comenzar la conversación?', responseType: 'textarea' },
    ],
  },

  {
    id: 'agradecer-de-forma-concreta',
    title: 'Agradecer de forma concreta',
    description: 'Reconoce una acción de otra persona y expresa por qué fue importante para ti.',
    purpose: 'Fortalecer vínculos mediante reconocimiento y comunicación positiva.',
    type: 'challenge',
    estimatedTime: 4,
    ageRange: { min: 13, max: 18 },
    competencies: { primary: 'relaciones-positivas', secondary: ['empatia'] },
    emotions: ['alegria', 'tranquilidad'],
    difficulty: 'easy',
    repeatable: true,
    steps: [
      { id: 'step-1', type: 'question', question: 'Piensa en alguien que haya hecho algo que valoraste recientemente.', responseType: 'textarea' },
      { id: 'step-2', type: 'question', question: '¿Qué hizo exactamente?', responseType: 'textarea' },
      { id: 'step-3', type: 'reflection', question: 'Escribe un mensaje breve y concreto para agradecerlo.', responseType: 'textarea' },
    ],
  },

  {
    id: 'resolver-un-desacuerdo',
    title: 'Resolver un desacuerdo',
    description: 'Explora distintas formas de afrontar un desacuerdo sin convertirlo en una competencia.',
    purpose: 'Practicar alternativas para manejar diferencias y buscar acuerdos posibles.',
    type: 'situation',
    estimatedTime: 7,
    ageRange: { min: 13, max: 18 },
    competencies: { primary: 'relaciones-positivas', secondary: ['empatia', 'autorregulacion'] },
    emotions: ['enojo', 'frustracion', 'tranquilidad'],
    difficulty: 'medium',
    repeatable: true,
    steps: [
      { id: 'step-1', type: 'question', question: 'Piensa en un desacuerdo cotidiano. ¿Qué quiere cada persona?', responseType: 'textarea' },
      { id: 'step-2', type: 'question', question: '¿Qué parte del problema podría hablarse con calma?', responseType: 'textarea' },
      { id: 'step-3', type: 'reflection', question: '¿Qué acuerdo sería razonable sin que ninguna persona tenga que ignorar completamente lo que necesita?', responseType: 'textarea' },
    ],
  },

];

export default activities;
