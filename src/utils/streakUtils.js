import {
  getLocalDateString,
} from './dateUtils';

function calculateCurrentStreak(checkIns) {
  if (!Array.isArray(checkIns) || checkIns.length === 0) {
    return 0;
  }

  const dates = [
    ...new Set(
      checkIns.map((checkIn) => checkIn.date)
    ),
  ].sort().reverse();

  const today = getLocalDateString();

  /*
   * Si el último registro no corresponde a hoy
   * ni a ayer, la continuidad actual es 0.
   */
  const yesterday = new Date();
  yesterday.setDate(
    yesterday.getDate() - 1
  );

  const yesterdayString =
    getLocalDateString(yesterday);

  if (
    dates[0] !== today &&
    dates[0] !== yesterdayString
  ) {
    return 0;
  }

  let streak = 1;

  let currentDate = new Date(
    `${dates[0]}T12:00:00`
  );

  for (let index = 1; index < dates.length; index += 1) {
    const previousDate = new Date(
      currentDate
    );

    previousDate.setDate(
      previousDate.getDate() - 1
    );

    const expectedDate =
      getLocalDateString(previousDate);

    if (dates[index] === expectedDate) {
      streak += 1;
      currentDate = previousDate;
    } else {
      break;
    }
  }

  return streak;
}

export {
  calculateCurrentStreak,
};