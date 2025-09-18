import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Разрешаем доступ со всех адресов
    allowedHosts: [
      '4c5c9b0a468700d8aeaede9f016e9fd9.serveo.net',
      'localhost',
      '127.0.0.1',
      '192.168.0.103',
      'baurum-radio-ui.onrender.com'  // ← ДОБАВЬТЕ ЭТУ СТРОЧКУ
    ]
  },
  preview: {
    allowedHosts: ['baurum-radio-ui.onrender.com']  // ← И ЭТУ СЕКЦИЮ ДОБАВЬТЕ
  }
})