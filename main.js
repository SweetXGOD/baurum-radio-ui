// Главный файл инициализации системы
import { BaurumCore } from './core/BaurumCore.js'
import { EmotionAnalyzer } from './utils/emotionAnalyzer.js'

// Глобальная инициализация
window.BAURUM_SYSTEM = {
  core: new BaurumCore(),
  analyzer: new EmotionAnalyzer(),
  isInitialized: false
}

// Автозапуск при загрузке
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Запуск BAURUM RADIO...')
  
  window.BAURUM_SYSTEM.core.initialize()
    .then(() => {
      window.BAURUM_SYSTEM.isInitialized = true
      console.log('✅ Система готова к работе')
    })
    .catch(error => {
      console.error('❌ Ошибка инициализации:', error)
    })
})