import assert from 'node:assert/strict';
import test from 'node:test';
import { makeRound, matches } from '../.rainbow-test-build/rainbow.js';

test('LE-RH01 every offered level has exactly one valid home', () => {
  for (let turn=0;turn<3;turn++) for (const count of [2,3,4]) for (const color of [false,true]) {
    const round=makeRound(turn,count,color);
    assert.equal(round.homes.length,count);
    assert.equal(round.homes.filter(h=>matches(round.target,h,color)).length,1);
    assert.ok(matches(round.target,round.homes.find(h=>h.id===round.correctId),color));
    assert.equal(new Set(round.homes.map(h=>h.id)).size,count);
  }
});

test('LE-RH02 color is optional and adds a distinct color choice', () => {
  const plain=makeRound(0,2,false), color=makeRound(0,2,true);
  assert.equal(plain.homes.filter(h=>matches(plain.target,h,false)).length,1);
  const colorOnly=color.homes.find(h=>h.shape===color.target.shape&&h.pattern===color.target.pattern&&h.color!==color.target.color);
  assert.ok(colorOnly);
  assert.equal(matches(color.target,colorOnly,false),true);
  assert.equal(matches(color.target,colorOnly,true),false);
});

test('LE-RH03 each turn shows new synthetic attributes, without repeating or saving state', () => {
  const turns=[0,1,2].map(i=>makeRound(i,2,false));
  assert.equal(new Set(turns.map(t=>`${t.target.shape}/${t.target.pattern}/${t.target.color}`)).size,3);
  assert.deepEqual(Object.keys(turns[0]).sort(),['correctId','homes','number','target']);
});

test('LE-RH04 invalid level and turn fail with clear errors', () => {
  assert.throws(()=>makeRound(-1,2,false),/three garden turns/);
  assert.throws(()=>makeRound(0,5,false),/2, 3 or 4/);
});
