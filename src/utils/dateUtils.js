function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, '0');

  const day = String(
    date.getDate()
  ).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function formatLongDate(dateString) {
  if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return 'Fecha no disponible';
  }

  const [year, month, day] = dateString.split('-').map(Number);
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