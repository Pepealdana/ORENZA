import {
  getLocalDateString,
} from './dateUtils.js';

function addDaysToDateString(dateString, amount) {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  date.setUTCDate(date.getUTCDate() + amount);

  return date.toISOString().slice(0, 10);
}

function calculateCurrentStreak(checkIns, now = new Date()) {
  if (!Array.isArray(checkIns) || checkIns.length === 0) {
    return 0;
  }

  const dates = [
    ...new Set(
      checkIns.map((checkIn) => checkIn.date)
    ),
  ].sort().reverse();

  const today = getLocalDateString(now);
  const yesterday = addDaysToDateString(today, -1);

  /*
   * Si el último registro no corresponde a hoy
   * ni a ayer, la continuidad actual es 0.
   */
  if (
    dates[0] !== today &&
    dates[0] !== yesterday
  ) {
    return 0;
  }

  let streak = 1;
  let currentDate = dates[0];

  for (let index = 1; index < dates.length; index += 1) {
    const expectedDate = addDaysToDateString(currentDate, -1);

    if (dates[index] === expectedDate) {
      streak += 1;
      currentDate = expectedDate;
    } else {
      break;
    }
  }

  return streak;
}

export {
  calculateCurrentStreak,
};
