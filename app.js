// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function selectAttempts(filter) {
  const attempts = window.reportData.attempts

  if (filter === 'passed') {
    return attempts.filter((attempt) => attempt.passed)
  }

  if (filter === 'failed') {
    return attempts.filter((attempt) => !attempt.passed)
  }

  return attempts
}

function renderAttempts(attempts) {
  const list = document.querySelector('#result-list')
  const count = document.querySelector('#result-count')
  const total = window.reportData.attempts.length

  let markup = ''
  attempts.forEach((attempt) => {
    const status = attempt.passed ? 'Порог пройден' : 'Порог не пройден'
    markup += `
          <li class="result-item">
            <span class="result-name">${escapeHtml(attempt.name)}</span>
            <span>${attempt.score} из ${attempt.questionCount} (${attempt.percentage}%) — ${status}</span>
          </li>`
  })

  if (list) {
    list.innerHTML = markup
  }

  if (count) {
    count.textContent = `Показано: ${attempts.length} из ${total}`
  }
}

function startFilter() {
  const form = document.querySelector('#filter-form')
  const select = document.querySelector('#filter')
  const count = document.querySelector('#result-count')
  const list = document.querySelector('#result-list')

  if (!form || !select || !count || !list) {
    return
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const filter = select.value
    const attempts = selectAttempts(filter)
    renderAttempts(attempts)
  })
}

startFilter()