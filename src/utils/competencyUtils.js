/* =========================================
   ORENZA — UTILIDADES DE COMPETENCIAS
   ========================================= */

import activities from '../data/activities';

import {
  getCompletedActivities,
} from './activityStorage';


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
  competencyId
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


  return activities.filter(
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
  competencyId
) {
  const competencyActivities =
    getActivitiesForCompetency(
      competencyId
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
   * Obtenemos las experiencias guardadas
   * en localStorage.
   */

  const completedActivities =
    getCompletedActivities();


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
  competencyId
) {
  const competencyActivities =
    getActivitiesForCompetency(
      competencyId
    );


  const completedActivities =
    getCompletedActivitiesForCompetency(
      competencyId
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
  competencies
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
        competency.id
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
  competencyIds
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


  return activities.filter(
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