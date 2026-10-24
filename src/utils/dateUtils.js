const APP_TIME_ZONE = import.meta.env?.VITE_APP_TIMEZONE || 'America/Bogota';

function getDateParts(date, timeZone = APP_TIME_ZONE) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  return Object.fromEntries(
    parts
      .filter(({ type }) => ['year', 'month', 'day'].includes(type))
      .map(({ type, value }) => [type, value])
  );
}

function getLocalDateString(date = new Date()) {
  const values = getDateParts(date);

  return `${values.year}-${values.month}-${values.day}`;
}

function formatLongDate(dateString) {
  if (typeof dateString !== 'string' || !dateString.trim()) {
    return 'Fecha no disponible';
  }

  // Las fechas de calendario (CheckIn.date) no representan instantes UTC.
  const calendarDate = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
  if (calendarDate) {
    const [, yearText, monthText, dayText] = calendarDate;
    const year = Number(yearText);
    const month = Number(monthText);
    const day = Number(dayText);
    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return 'Fecha no disponible';
    }

    return date.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  // Solo se aceptan timestamps ISO para campos que representan instantes.
  if (!/^\d{4}-\d{2}-\d{2}T/.test(dateString)) {
    return 'Fecha no disponible';
  }

  const instant = new Date(dateString);
  if (Number.isNaN(instant.getTime())) {
    return 'Fecha no disponible';
  }

  return new Intl.DateTimeFormat('es-CO', {
    timeZone: APP_TIME_ZONE,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(instant);
}

function getPreviousDate(date = new Date()) {
  const previousDate = new Date(date);

  previousDate.setDate(
    previousDate.getDate() - 1
  );

  return previousDate;
}

export {
  getLocalDateString,
  formatLongDate,
  getPreviousDate,
};
