import { useState, useEffect } from 'react'

export const OrientationWrapper = ({ children }) => {
  const [isPortrait, setIsPortrait] = useState(false)

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth)
    }
    
    checkOrientation()
    window.addEventListener('resize', checkOrientation)
    
    return () => {
      window.removeEventListener('resize', checkOrientation)
    }
  }, [])

  return (
    <div className={`
      w-screen h-screen transition-transform duration-500
      ${isPortrait ? 'rotate-90 transform origin-bottom-left' : ''}
    `} style={{
      width: isPortrait ? '100vh' : '100vw',
      height: isPortrait ? '100vw' : '100vh'
    }}>
      {children}
      
      {isPortrait && (
        <div className="absolute top-10 left-0 right-0 text-center text-white text-sm opacity-80">
          ↻ Поверните телефон для лучшего обзора
        </div>
      )}
    </div>
  )
}