import test from 'node:test';
import assert from 'node:assert/strict';
import { acquire, appearance, catalog, equip, initialWardrobe, isUnlocked } from '../src/features/shop/catalog.ts';
const item = (id) => catalog.find((gear) => gear.id === id);
test('Paris requires completion; a visit or 99% does not unlock the beret', () => {
  for (const completed of [0, 1, 99]) assert.equal(isUnlocked(item('paris'), { 'city:Paris': { visited: true, completed, total: 100 } }), false);
  assert.equal(isUnlocked(item('paris'), { 'city:Paris': { visited: true, completed: 100, total: 100 } }), true);
  assert.equal(isUnlocked(item('paris'), {}), false);
});
test('city and country thresholds are independent; visits unlock visit rewards', () => {
  const travel = { 'city:Lisboa': { visited: true, completed: 6, total: 12 }, 'country:Portugal': { visited: true, completed: 1, total: 4 } };
  assert.equal(isUnlocked(item('lisbon'), travel), true);
  assert.equal(isUnlocked(item('portugal'), travel), true);
  assert.equal(isUnlocked(item('explorer'), travel), false);
  travel['country:Portugal'].completed = 2;
  assert.equal(isUnlocked(item('explorer'), travel), true);
  assert.equal(isUnlocked(item('goldbag'), travel), false);
  travel['country:Portugal'].completed = 4;
  assert.equal(isUnlocked(item('goldbag'), travel), true);
});
test('buy once, reject unaffordable and locked acquisitions, never debit twice', () => {
  const bought = acquire(initialWardrobe, 'ocean', {});
  assert.equal(bought.balance, 250);
  assert.equal(acquire(bought, 'ocean', {}), bought);
  assert.equal(acquire(bought, 'skybag', {}), bought);
  assert.equal(acquire(bought, 'paris', {}), bought);
  assert.equal(acquire(bought, 'unknown', {}), bought);
});
test('equipment requires ownership and preview never changes saved appearance', () => {
  assert.equal(equip(initialWardrobe, 'paris'), initialWardrobe);
  const bought = acquire(initialWardrobe, 'ocean', {});
  const wearing = equip(bought, 'ocean');
  assert.equal(appearance(wearing).hat.color, item('ocean').color);
  assert.equal(appearance(wearing, item('paris')).hat.style, 'beret');
  assert.equal(appearance(wearing).hat.style, 'cap');
  assert.equal(wearing.equipped.shirt, initialWardrobe.equipped.shirt);
});
test('milestone reward is free, claimable once, and can be equipped', () => {
  const travel = { 'country:Portugal': { visited: true, completed: 0, total: 4 } };
  const claimed = acquire(initialWardrobe, 'portugal', travel);
  assert.equal(claimed.balance, initialWardrobe.balance);
  assert.equal(acquire(claimed, 'portugal', travel), claimed);
  assert.equal(appearance(equip(claimed, 'portugal')).shirt, item('portugal').color);
});
