export class TelegramMonitor {
  constructor() {
    this.API_URL = 'https://api.telegram.org/bot'
    this.chatId = null
  }

  async initialize(botToken) {
    this.botToken = botToken
    await this.getChatId()
    setInterval(() => this.sendStatusUpdate(), 300000) // Каждые 5 минут
  }

  async sendStatusUpdate() {
    const message = `📊 Статус системы:
👥 Активных пользователей: ${window.BAURUM_SYSTEM?.core?.users.size || 0}
🎵 Сигналов активно: ${window.BAURUM_SYSTEM?.core?.isActive ? 'Да' : 'Нет'}
📈 Текущий этап: ${window.BAURUM_SYSTEM?.core?.currentStage}

${new Date().toLocaleString('ru-RU')}`

    await this.sendMessage(message)
  }

  async sendAlert(message) {
    await this.sendMessage(`🚨 ALERT: ${message}`)
  }

  async sendMessage(text) {
    if (!this.chatId) return
    
    try {
      const response = await fetch(
        `${this.API_URL}${this.botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: this.chatId,
            text: text,
            parse_mode: 'HTML'
          })
        }
      )
      return await response.json()
    } catch (error) {
      console.error('Telegram error:', error)
    }
  }
}