/* =========================================
   ORENZA — ALMACENAMIENTO DE ACTIVIDADES
   ========================================= */

const STORAGE_KEY =
  'orenza_completed_activities';


/*
 * =========================================
 * OBTENER ACTIVIDADES COMPLETADAS
 * =========================================
 */

export function getCompletedActivities() {
  try {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed =
      JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;

  } catch (error) {
    console.error(
      'Error al obtener actividades completadas:',
      error
    );

    return [];
  }
}


/*
 * =========================================
 * GUARDAR ACTIVIDAD COMPLETADA
 * =========================================
 */

export function saveCompletedActivity(
  activity
) {
  try {
    const currentActivities =
      getCompletedActivities();

    const updatedActivities = [
      ...currentActivities,
      activity,
    ];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        updatedActivities
      )
    );

    return updatedActivities;

  } catch (error) {
    console.error(
      'Error al guardar actividad completada:',
      error
    );

    return null;
  }
}


/*
 * =========================================
 * COMPROBAR SI UNA ACTIVIDAD FUE REALIZADA
 * =========================================
 */

export function hasCompletedActivity(
  activityId
) {
  const activities =
    getCompletedActivities();

  return activities.some(
    (activity) =>
      activity.activityId === activityId
  );
}


/*
 * =========================================
 * OBTENER HISTORIAL DE UNA ACTIVIDAD
 * =========================================
 */

export function getActivityHistory(
  activityId
) {
  const activities =
    getCompletedActivities();

  return activities.filter(
    (activity) =>
      activity.activityId === activityId
  );
}


/*
 * =========================================
 * CONTAR EXPERIENCIAS
 * =========================================
 */

export function getCompletedActivitiesCount() {
  return getCompletedActivities().length;
}


/*
 * =========================================
 * LIMPIAR EXPERIENCIAS
 *
 * Solo para pruebas durante desarrollo.
 * =========================================
 */

export function clearCompletedActivities() {
  localStorage.removeItem(
    STORAGE_KEY
  );
}