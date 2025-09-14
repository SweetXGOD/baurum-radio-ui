import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/three'

export const EntranceAnimation = ({ children, position, delay = 0 }) => {
  const groupRef = useRef()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const { scale } = useSpring({
    scale: visible ? 1 : 0,
    config: { mass: 2, tension: 280, friction: 60 }
  })

  useFrame((state) => {
    if (groupRef.current && !visible) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.5
    }
  })

  return (
    <animated.group ref={groupRef} position={position} scale={scale}>
      {children}
    </animated.group>
  )
}