import { useState } from 'react'
import { api } from '../api'

export const PlayerControls = ({ isPlaying, onTogglePlay }) => {
  const [volume, setVolume] = useState(100)

  const handleStop = async () => {
    const result = await api.stopPlayback()
    console.log('Остановка:', result)
    onTogglePlay(false)
  }

  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
      {/* Кнопка воспроизведения/паузы */}
      <button
        onClick={() => onTogglePlay(!isPlaying)}
        className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full"
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>

      {/* Кнопка остановки */}
      <button
        onClick={handleStop}
        className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full"
      >
        ⏹️
      </button>

      {/* Кнопка следующего трека */}
      <button
        onClick={async () => {
          const result = await api.nextTrack()
          console.log('Переключено на трек:', result.track)
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full"
      >
        ⏭️
      </button>

      {/* Регулятор громкости */}
      <div className="flex items-center bg-gray-800 rounded-full px-4">
        <span className="text-white mr-2">🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-20"
        />
      </div>
    </div>
  )
}