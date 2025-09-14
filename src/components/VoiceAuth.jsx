import { useState } from 'react'

export const VoiceAuth = ({ onAuthSuccess }) => {
  const [isListening, setIsListening] = useState(false)

  const startVoiceAuth = async () => {
    setIsListening(true)
    
    // Имитация процесса аутентификации
    setTimeout(() => {
      // В реальности здесь будет анализ голосовых характеристик
      const isAuthenticated = Math.random() > 0.2 // 80% успеха
      
      if (isAuthenticated) {
        onAuthSuccess()
        alert('✅ Голос распознан! Доступ предоставлен.')
      } else {
        alert('❌ Доступ запрещен. Голос не распознан.')
      }
      
      setIsListening(false)
    }, 3000)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={startVoiceAuth}
        disabled={isListening}
        className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition"
      >
        {isListening ? '🎤 Анализ...' : '🎤 Тихий ветер'}
      </button>
    </div>
  )
}