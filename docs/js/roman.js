// Pure conversion functions (no DOM) – easy to test and to reuse on the server.
const TABLE = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]
// Canonical Roman numerals 1..3999 (rejects things like "IIII" or "VX")
const ROMAN_RE = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/

export function toRoman(n) {
  if (!Number.isInteger(n) || n < 1 || n > 3999) throw new RangeError('Use an integer between 1 and 3999')
  let out = ''
  for (const [value, symbol] of TABLE) {
    while (n >= value) { out += symbol; n -= value }
  }
  return out
}

export function fromRoman(s) {
  const roman = String(s).trim().toUpperCase()
  if (!roman || !ROMAN_RE.test(roman)) throw new RangeError('Not a valid Roman numeral')
  let total = 0
  let i = 0
  for (const [value, symbol] of TABLE) {
    while (roman.startsWith(symbol, i)) { total += value; i += symbol.length }
  }
  return total
}
