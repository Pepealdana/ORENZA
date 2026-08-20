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

function getPreviousDate(date = new Date()) {
  const previousDate = new Date(date);

  previousDate.setDate(
    previousDate.getDate() - 1
  );

  return previousDate;
}

export {
  getLocalDateString,
  getPreviousDate,
};