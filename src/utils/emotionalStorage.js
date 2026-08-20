import { getLocalDateString } from './dateUtils';

const STORAGE_KEY = 'orenza_emotional_checkins';

function getStoredCheckIns() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch (error) {
    console.error(
      'No fue posible recuperar los registros emocionales:',
      error
    );

    return [];
  }
}

function saveCheckIn(checkIn) {
  try {
    const currentCheckIns =
      getStoredCheckIns();

    const existingIndex =
      currentCheckIns.findIndex(
        (item) =>
          item.date === checkIn.date
      );

    let updatedCheckIns;

    if (existingIndex >= 0) {
      updatedCheckIns = [
        ...currentCheckIns,
      ];

      updatedCheckIns[existingIndex] =
        checkIn;
    } else {
      updatedCheckIns = [
        ...currentCheckIns,
        checkIn,
      ];
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedCheckIns)
    );

    return updatedCheckIns;
  } catch (error) {
    console.error(
      'No fue posible guardar el registro emocional:',
      error
    );

    return null;
  }
}

function getTodayCheckIn() {
  const today = getLocalDateString();

  const checkIns =
    getStoredCheckIns();

  return (
    checkIns.find(
      (item) =>
        item.date === today
    ) || null
  );
}

export {
  getStoredCheckIns,
  saveCheckIn,
  getTodayCheckIn,
};