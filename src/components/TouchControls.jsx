import { useThree } from '@react-three/fiber'
import { useState } from 'react'

export const TouchControls = () => {
  const { camera } = useThree()
  const [touchStart, setTouchStart] = useState(null)

  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      cameraX: camera.rotation.x,
      cameraY: camera.rotation.y
    })
  }

  const handleTouchMove = (e) => {
    if (!touchStart) return
    
    const dx = e.touches[0].clientX - touchStart.x
    const dy = e.touches[0].clientY - touchStart.y
    
    camera.rotation.y = touchStart.cameraY + dx * 0.01
    camera.rotation.x = Math.max(-Math.PI/4, Math.min(Math.PI/4, touchStart.cameraX + dy * 0.01))
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        touchAction: 'none'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setTouchStart(null)}
    />
  )
}