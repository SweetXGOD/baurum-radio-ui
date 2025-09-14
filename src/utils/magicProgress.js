// Магический прогресс пользователя
export const MagicProgress = {
  // Получить текущий уровень
  getLevel() {
    const progress = localStorage.getItem('magic_progress') || '0'
    return parseInt(progress)
  },

  // Увеличить прогресс
  increaseProgress() {
    const currentLevel = this.getLevel()
    const newProgress = currentLevel + 1
    localStorage.setItem('magic_progress', newProgress.toString())
    return newProgress
  },

  // Проверить, открыта ли способность
  isAbilityUnlocked(abilityName) {
    const level = this.getLevel()
    const abilities = {
      'advanced_animations': level > 3,
      'energy_flows': level > 5, 
      'sound_effects': level > 7,
      'secret_symbols': level > 10
    }
    return abilities[abilityName] || false
  },

  // Сбросить прогресс (для тестирования)
  reset() {
    localStorage.setItem('magic_progress', '0')
  }
}