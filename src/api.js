// API для связи с Python-ядром
const API_URL = 'https://baurumcoin.com'  // ИЛИ ваш API URL

export const api = {
  // Запуск воспроизведения для выбранной стихии
  startFrequency: async (element) => {
    const response = await fetch(`${API_URL}/api/play/${element}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    return response.json()
  },

  // Остановка воспроизведения
  stopFrequency: async () => {
    const response = await fetch(`${API_URL}/api/stop`, {
      method: 'POST'
    })
    return response.json()
  }
}