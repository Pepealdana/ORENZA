import test from 'node:test';
import assert from 'node:assert/strict';
import { formatLongDate } from './dateUtils.js';

test('formatea una fecha de calendario sin desplazarla por zona horaria', () => {
  assert.equal(
    formatLongDate('2026-10-21'),
    '21 de octubre de 2026'
  );
});

test('rechaza fechas de calendario inválidas', () => {
  assert.equal(formatLongDate('2026-02-30'), 'Fecha no disponible');
  assert.equal(formatLongDate('2026/10/21'), 'Fecha no disponible');
});
