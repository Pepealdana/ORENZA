const APP_TIME_ZONE = process.env.APP_TIMEZONE || 'America/Bogota';

function getCurrentDateString() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: APP_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts
      .filter(({ type }) => ['year', 'month', 'day'].includes(type))
      .map(({ type, value }) => [type, value])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

export { getCurrentDateString };
