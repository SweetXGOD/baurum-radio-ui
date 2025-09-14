export const SYSTEM_CONFIG = {
  // Настройки маскировки
  camouflage: {
    appName: 'Русское Радио',
    description: 'Слушайте лучшие русские хиты',
    colors: {
      primary: '#8A2BE2',
      secondary: '#4A00E0'
    }
  },

  // Настройки сигналов
  frequencies: {
    alphabet: {
      'а': 432, 'б': 434, 'в': 436, 'г': 438, 'д': 440,
      'е': 442, 'ё': 444, 'ж': 446, 'з': 448, 'и': 450,
      'й': 452, 'к': 454, 'л': 456, 'м': 458, 'н': 460,
      'о': 462, 'п': 464, 'р': 466, 'с': 468, 'т': 470,
      'у': 472, 'ф': 474, 'х': 476, 'ц': 478, 'ч': 480,
      'ш': 482, 'щ': 484, 'ъ': 486, 'ы': 488, 'ь': 490,
      'э': 492, 'ю': 494, 'я': 496
    },
    amplitude: 0.01, // Громкость сигнала (1%)
    duration: 0.1    // Длительность символа
  },

  // Настройки безопасности
  security: {
    voiceAuthPhrase: 'тихий ветер',
    encryptionKey: 'baurum_radio_2025',
    adminAccessCode: [5, 2, 8] // код доступа: 5-2-8
  },

  // Настройки обучения
  learning: {
    stages: [
      { stage: 1, target: 'буквы', duration: 30 },
      { stage: 2, target: 'слова', duration: 60 },
      { stage: 3, target: 'фразы', duration: 90 },
      { stage: 4, target: 'диалоги', duration: 120 }
    ],
    progressThreshold: 0.8 // 80% для перехода на следующий уровень
  }
}