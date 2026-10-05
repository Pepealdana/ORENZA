import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCurrentStreak } from './streakUtils.js';

function dateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
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
