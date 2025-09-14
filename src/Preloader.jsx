import { useState, useEffect } from 'react'

export const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Скрываем прелоадер когда все загрузится
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1000) // 1 секунда на всякий случай

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-white text-2xl">BAURUM RADIO</div>
    </div>
  )
}