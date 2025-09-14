import { useState, useEffect } from 'react'

export const AdminPanel = ({ analyzer, isPlaying, currentTrack }) => {
  const [showPanel, setShowPanel] = useState(false)
  const [stats, setStats] = useState({})

  // Секретная комбинация для открытия панели: три тапа по верху экрана
  const [tapCount, setTapCount] = useState(0)

  useEffect(() => {
    if (tapCount >= 3) {
      setShowPanel(true)
      setTapCount(0)
    }
  }, [tapCount])

  const updateStats = () => {
    setStats({
      activeUsers: Math.floor(Math.random() * 1000) + 800,
      signalsActive: isPlaying ? 1 : 0,
      currentSignal: currentTrack,
      userMood: analyzer.getTimeOfDayMood()
    })
  }

  if (!showPanel) return (
    <div 
      className="absolute top-0 left-0 w-full h-12 opacity-0"
      onClick={() => setTapCount(prev => prev + 1)}
    />
  )

  return (
    <div className="absolute top-0 left-0 w-full bg-black bg-opacity-90 text-green-400 p-4 z-50 font-mono text-sm">
      <button 
        className="absolute top-2 right-2 text-white"
        onClick={() => setShowPanel(false)}
      >
        ✕
      </button>
      
      <h2 className="text-lg mb-2">BAURUM ADMIN PANEL</h2>
      <div className="grid grid-cols-2 gap-2">
        <div>Активных пользователей:</div>
        <div>{stats.activeUsers}</div>
        
        <div>Сигналов активно:</div>
        <div>{stats.signalsActive}</div>
        
        <div>Текущий сигнал:</div>
        <div>{stats.currentSignal}</div>
        
        <div>Состояние системы:</div>
        <div>🟢 NORMAL</div>
      </div>
    </div>
  )
}