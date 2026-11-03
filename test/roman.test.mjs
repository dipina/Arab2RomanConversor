// Run with: node --test   (from the Arab2RomanServer folder)
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { fromRoman, toRoman } from '../docs/js/roman.js'

test('decimal → roman', () => {
  assert.equal(toRoman(1), 'I')
  assert.equal(toRoman(4), 'IV')
  assert.equal(toRoman(1994), 'MCMXCIV')
  assert.equal(toRoman(2026), 'MMXXVI')
  assert.throws(() => toRoman(0), RangeError)
  assert.throws(() => toRoman(4000), RangeError)
})

test('roman → decimal', () => {
  assert.equal(fromRoman('mmxxvi'), 2026)
  assert.equal(fromRoman('XLII'), 42)
  assert.throws(() => fromRoman('IIII'), RangeError)
  assert.throws(() => fromRoman('ABC'), RangeError)
})

test('round trip 1..3999', () => {
  for (let n = 1; n < 4000; n++) assert.equal(fromRoman(toRoman(n)), n)
})
