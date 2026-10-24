import test from 'node:test';
import assert from 'node:assert/strict';
import { formatLongDate, getLocalDateString } from './dateUtils.js';

test('formatea una fecha de calendario sin desplazarla por zona horaria', () => {
  assert.equal(formatLongDate('2026-10-21'), '21 de octubre de 2026');
});

test('formatea timestamps en la zona horaria de la aplicación', () => {
  assert.equal(
    formatLongDate('2026-10-22T02:00:00.000Z'),
    '21 de octubre de 2026'
  );
});

test('rechaza fechas de calendario inválidas y cadenas no válidas', () => {
  assert.equal(formatLongDate('2026-02-30'), 'Fecha no disponible');
  assert.equal(formatLongDate('2026/10/21'), 'Fecha no disponible');
  assert.equal(formatLongDate('no-es-una-fecha'), 'Fecha no disponible');
});

test('calcula el día actual con la zona horaria de la aplicación', () => {
  assert.equal(getLocalDateString(new Date('2026-10-22T02:00:00.000Z')), '2026-10-21');
});
