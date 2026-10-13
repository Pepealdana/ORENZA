import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCurrentStreak } from './streakUtils.js';
import { getLocalDateString } from './dateUtils.js';

function dateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return getLocalDateString(date);
}

test('calcula una racha consecutiva desde hoy', () => {
  assert.equal(calculateCurrentStreak([
    { date: dateOffset(0) },
    { date: dateOffset(1) },
    { date: dateOffset(2) },
  ]), 3);
});

test('permite una racha que comienza ayer', () => {
  assert.equal(calculateCurrentStreak([{ date: dateOffset(1) }]), 1);
});

test('rompe la racha ante un día ausente', () => {
  assert.equal(calculateCurrentStreak([
    { date: dateOffset(0) },
    { date: dateOffset(1) },
    { date: dateOffset(3) },
  ]), 2);
});


test('sin registros emocionales la racha es cero', () => {
  assert.equal(calculateCurrentStreak([]), 0);
});

test('varias acciones el mismo día no duplican la racha', () => {
  assert.equal(calculateCurrentStreak([
    { date: dateOffset(0), id: 'a' },
    { date: dateOffset(0), id: 'b' },
    { date: dateOffset(1), id: 'c' },
    { date: dateOffset(1), id: 'd' },
  ]), 2);
});

test('varios días sin registrar reinician la racha actual', () => {
  assert.equal(calculateCurrentStreak([
    { date: dateOffset(0) },
    { date: dateOffset(4) },
    { date: dateOffset(5) },
  ]), 1);
  assert.equal(calculateCurrentStreak([
    { date: dateOffset(3) },
    { date: dateOffset(4) },
  ]), 0);
});
