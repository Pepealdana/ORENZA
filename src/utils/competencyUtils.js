/* =========================================
   ORENZA — UTILIDADES DE COMPETENCIAS
   ========================================= */

import activities from '../data/activities';


/*
 * =========================================
 * NORMALIZAR ID DE COMPETENCIA
 * =========================================
 *
 * Algunos datos históricos del proyecto
 * utilizan "relaciones-positivas",
 * mientras que la competencia oficial
 * de studentData utiliza "relaciones".
 *
 * Aquí mantenemos un único identificador
 * para realizar las comparaciones.
 */

function normalizeCompetencyId(
  competencyId
) {
  if (
    typeof competencyId !==
    'string'
  ) {
    return '';
  }


  const normalized =
    competencyId.trim();


  const aliases = {
    'relaciones-positivas':
      'relaciones',
  };


  return (
    aliases[normalized] ||
    normalized
  );
}


/*
 * =========================================
 * OBTENER COMPETENCIAS DE UNA ACTIVIDAD
 * =========================================
 *
 * La estructura actual de activities.js es:
 *
 * competencies: {
 *   primary: 'autoconocimiento',
 *
 *   secondary: [
 *     'autorregulacion',
 *   ],
 * }
 *
 * Convertimos esa estructura en un arreglo
 * sencillo para poder realizar búsquedas.
 */

function getActivityCompetencies(
  activity
) {
  if (
    !activity ||
    !activity.competencies
  ) {
    return [];
  }


  const {
    primary,
    secondary,
  } = activity.competencies;


  const competencies = [];


  /*
   * Competencia principal.
   */

  if (
    typeof primary ===
    'string'
  ) {
    competencies.push(
      primary
    );
  }


  /*
   * Competencias secundarias.
   */

  if (
    Array.isArray(
      secondary
    )
  ) {
    competencies.push(
      ...secondary.filter(
        (competency) =>
          typeof competency ===
          'string'
      )
    );
  }


  /*
   * Normalizamos los IDs y eliminamos
   * duplicados.
   */

  return [
    ...new Set(
      competencies.map(
        (competency) =>
          normalizeCompetencyId(
            competency
          )
      )
    ),
  ];
}


/*
 * =========================================
 * OBTENER ACTIVIDADES DE UNA COMPETENCIA
 * =========================================
 */

export function getActivitiesForCompetency(
  competencyId,
  activitiesOverride = null
) {
  const normalizedCompetencyId =
    normalizeCompetencyId(
      competencyId
    );


  if (
    !normalizedCompetencyId
  ) {
    return [];
  }


  const catalog = Array.isArray(activitiesOverride)
    ? activitiesOverride
    : activities;

  return catalog.filter(
    (activity) => {

      const activityCompetencies =
        getActivityCompetencies(
          activity
        );


      return activityCompetencies.includes(
        normalizedCompetencyId
      );
    }
  );
}


/*
 * =========================================
 * OBTENER ACTIVIDADES COMPLETADAS
 * =========================================
 */

export function getCompletedActivitiesForCompetency(
  competencyId,
  completedActivitiesOverride = [],
  activitiesOverride = null
) {
  const competencyActivities =
    getActivitiesForCompetency(
      competencyId,
      activitiesOverride
    );


  /*
   * Creamos un conjunto con los IDs
   * de las actividades relacionadas
   * con la competencia.
   */

  const competencyActivityIds =
    new Set(
      competencyActivities.map(
        (activity) =>
          activity.id
      )
    );


  /*
   * Recibimos las experiencias persistidas
   * desde el backend mediante el hook de progreso.
   */

  const completedActivities = Array.isArray(completedActivitiesOverride)
    ? completedActivitiesOverride
    : [];


  /*
   * Filtramos únicamente las experiencias
   * pertenecientes a esta competencia.
   */

  return completedActivities.filter(
    (completedActivity) =>
      competencyActivityIds.has(
        completedActivity.activityId
      )
  );
}


/*
 * =========================================
 * ESTADÍSTICAS DE UNA COMPETENCIA
 * =========================================
 *
 * El progreso representa el porcentaje
 * de actividades disponibles de esa
 * competencia que ya fueron exploradas.
 *
 * No representa una medición psicológica.
 */

export function getCompetencyStats(
  competencyId,
  completedActivitiesOverride = null,
  activitiesOverride = null
) {
  const competencyActivities =
    getActivitiesForCompetency(
      competencyId,
      activitiesOverride
    );


  const completedActivities =
    getCompletedActivitiesForCompetency(
      competencyId,
      completedActivitiesOverride,
      activitiesOverride
    );


  /*
   * Una actividad puede realizarse
   * varias veces.
   *
   * Para el porcentaje contamos
   * actividades diferentes.
   */

  const completedActivityIds =
    new Set(
      completedActivities.map(
        (activity) =>
          activity.activityId
      )
    );


  const totalActivities =
    competencyActivities.length;


  const completedCount =
    completedActivityIds.size;


  /*
   * Calculamos el porcentaje.
   */

  const progress =
    totalActivities === 0
      ? 0
      : Math.round(
          (completedCount /
            totalActivities) *
            100
        );


  return {
    totalActivities,

    completedCount,

    progress,

    activities:
      competencyActivities,

    completedActivities,
  };
}


/*
 * =========================================
 * ESTADÍSTICAS DE TODAS LAS COMPETENCIAS
 * =========================================
 */

export function getAllCompetencyStats(
  competencies,
  completedActivitiesOverride = null,
  activitiesOverride = null
) {
  if (
    !Array.isArray(
      competencies
    )
  ) {
    return [];
  }


  return competencies.map(
    (competency) => ({
      ...competency,

      ...getCompetencyStats(
        competency.id,
        completedActivitiesOverride,
        activitiesOverride
      ),
    })
  );
}


/*
 * =========================================
 * OBTENER ACTIVIDADES PARA VARIAS
 * COMPETENCIAS
 * =========================================
 */

export function getActivitiesForCompetencies(
  competencyIds,
  activitiesOverride = null
) {
  if (
    !Array.isArray(
      competencyIds
    )
  ) {
    return [];
  }


  const normalizedIds =
    competencyIds.map(
      (competencyId) =>
        normalizeCompetencyId(
          competencyId
        )
    );


  const catalog = Array.isArray(activitiesOverride)
    ? activitiesOverride
    : activities;

  return catalog.filter(
    (activity) => {

      const activityCompetencies =
        getActivityCompetencies(
          activity
        );


      return activityCompetencies.some(
        (competencyId) =>
          normalizedIds.includes(
            competencyId
          )
      );
    }
  );
}