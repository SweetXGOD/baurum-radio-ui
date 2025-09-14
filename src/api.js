// API для связи с Python-ядром
const API_URL = 'http://localhost:8000'

export const api = {
  // Запуск генерации частот для выбранной стихии
  startFrequency: async (element) => {
    const response = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ element })
    })
    return response.json()
  },

  // Остановка генерации
  stopFrequency: async () => {
    const response = await fetch(`${API_URL}/stop`, {
      method: 'POST'
    })
    return response.json()
  },

  // Переключение трека
  nextTrack: async () => {
    const response = await fetch(`${API_URL}/next_track`, {
      method: 'POST'
    })
    return response.json()
  },

  // Остановка воспроизведения
  stopPlayback: async () => {
    const response = await fetch(`${API_URL}/stop`, {
      method: 'POST'
    })
    return response.json()
  }
}