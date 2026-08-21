/* =========================================
   ORENZA — UTILIDADES DE PROGRESO
   ========================================= */

import {
  getCompletedActivities,
} from './activityStorage';


/*
 * =========================================
 * OBTENER PROGRESO GLOBAL
 * =========================================
 *
 * El progreso global representa la cantidad
 * de actividades diferentes completadas
 * frente al total de actividades disponibles.
 *
 * No representa una medición psicológica.
 */

export function getOverallProgress(
  activities
) {
  const completedActivities =
    getCompletedActivities();


  /*
   * Utilizamos un Set para evitar contar
   * varias veces una misma actividad cuando
   * es repetible.
   */

  const completedActivityIds =
    new Set(
      completedActivities.map(
        (activity) =>
          activity.activityId
      )
    );


  const totalActivities =
    activities.length;


  const completedCount =
    completedActivityIds.size;


  const progress =
    totalActivities === 0
      ? 0
      : Math.round(
          (completedCount /
            totalActivities) *
            100
        );


  return {
    progress,
    completedCount,
    totalActivities,
  };
}