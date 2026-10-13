import test from 'node:test';
import assert from 'node:assert/strict';
import { distanceInMeters, formatDistance, orderByProximity } from '../src/features/itinerary/proximity.ts';

test('distance is zero at the same position and about 111 km per equatorial degree', () => {
  const origin = { latitude: 0, longitude: 0 };
  assert.equal(distanceInMeters(origin, origin), 0);
  assert.ok(Math.abs(distanceInMeters(origin, { latitude: 0, longitude: 1 }) - 111195) < 1);
});

test('changing user location changes order without changing original spots or visit status', () => {
  const spots = [
    { name: 'A', coordinates: { latitude: 0, longitude: 1 }, done: true },
    { name: 'B', coordinates: { latitude: 0, longitude: 0 }, done: false },
  ];
  const copy = structuredClone(spots);
  assert.deepEqual(orderByProximity(spots, spots[1].coordinates).map(s => s.name), ['B', 'A']);
  assert.deepEqual(orderByProximity(spots, spots[0].coordinates).map(s => s.name), ['A', 'B']);
  assert.deepEqual(spots, copy);
});

test('distances switch from metres to kilometres with Portuguese decimal formatting', () => {
  for (const [meters, label] of [[500, '500 m'], [994, '990 m'], [999, '1 km'], [1700, '1,7 km'], [2000, '2 km']]) {
    assert.equal(formatDistance(meters), label);
  }
});
