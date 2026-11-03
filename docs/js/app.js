// Arab2Roman PWA – UI logic. Conversions run locally, so the app works fully offline.
import { fromRoman, toRoman } from './roman.js'

const decimal = document.getElementById('decimal')
const roman = document.getElementById('roman')
const message = document.getElementById('message')
const historyList = document.getElementById('history')
const KEY = 'arab2roman-history'

const loadHistory = () => { try { return JSON.parse(localStorage.getItem(KEY)) ?? [] } catch { return [] } }
let history = loadHistory()

function renderHistory() {
  historyList.replaceChildren(...history.map((h) => {
    const li = document.createElement('li')
    li.textContent = `${new Date(h.timestamp).toLocaleString()}: ${h.operation} ${h.value} → ${h.result}`
    return li
  }))
}

function remember(operation, value, result) {
  if (history[0]?.value === value && history[0]?.operation === operation) return
  history = [{ timestamp: Date.now(), operation, value, result }, ...history].slice(0, 5)
  localStorage.setItem(KEY, JSON.stringify(history))
  renderHistory()
}

decimal.addEventListener('input', () => {
  message.textContent = ''
  if (!decimal.value) { roman.value = ''; return }
  try {
    roman.value = toRoman(Number(decimal.value))
  } catch (err) {
    roman.value = ''
    message.textContent = err.message
  }
})

roman.addEventListener('input', () => {
  message.textContent = ''
  if (!roman.value) { decimal.value = ''; return }
  try {
    decimal.value = fromRoman(roman.value)
  } catch (err) {
    decimal.value = ''
    message.textContent = err.message
  }
})

// 'input' fires on every keystroke (live conversion); 'change' fires when the user
// commits the value (Enter / leaving the field) – that is when we store it in the history.
decimal.addEventListener('change', () => roman.value && remember('decimal→roman', decimal.value, roman.value))
roman.addEventListener('change', () => decimal.value && remember('roman→decimal', roman.value.toUpperCase(), decimal.value))

document.getElementById('clear').addEventListener('click', () => {
  history = []
  localStorage.removeItem(KEY)
  renderHistory()
})

renderHistory()

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch((err) => console.error('SW registration failed', err))
}
