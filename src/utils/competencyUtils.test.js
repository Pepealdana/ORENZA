import test from 'node:test';
import assert from 'node:assert/strict';
import { getActivitiesForCompetency, getCompetencyStats } from './competencyUtils.js';

const catalog = [
  { id: 'a1', competencies: { primary: 'autoconocimiento', secondary: [] } },
  { id: 'a2', competencies: { primary: 'empatia', secondary: ['autoconocimiento'] } },
  { id: 'a3', competencies: { primary: 'relaciones-positivas', secondary: [] } },
];

test('filtra actividades por competencia principal y secundaria', () => {
  assert.equal(getActivitiesForCompetency('autoconocimiento', catalog).length, 1);
  assert.equal(getActivitiesForCompetency('autoconocimiento', catalog, { includeSecondary: true }).length, 2);
});

test('normaliza relaciones-positivas a relaciones', () => {
  assert.equal(getActivitiesForCompetency('relaciones', catalog).length, 1);
});

test('calcula progreso sin duplicar una actividad repetida', () => {
  const completed = [
    { activityId: 'a1' },
    { activityId: 'a1' },
  ];
  const stats = getCompetencyStats('autoconocimiento', completed, catalog);
  assert.equal(stats.totalActivities, 1);
  assert.equal(stats.completedCount, 1);
  assert.equal(stats.progress, 100);
});
