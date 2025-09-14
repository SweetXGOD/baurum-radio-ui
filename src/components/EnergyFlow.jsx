import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

export const EnergyFlow = ({ from, to, color = '#4A00E0' }) => {
  const lineRef = useRef()
  const points = [new THREE.Vector3(...from), new THREE.Vector3(...to)]

  useFrame((state) => {
    if (lineRef.current) {
      const time = state.clock.elapsedTime
      
      // 1. СЛОЖНАЯ ПУЛЬСАЦИЯ - 3 ритма одновременно
      const breath = Math.sin(time * 1.5) * 0.15
      const heart = Math.sin(time * 3.2) * 0.1  
      const energy = Math.sin(time * 8) * 0.05
      const pulse = 0.6 + breath + heart + energy
      
      // 2. ИЗМЕНЕНИЕ ЦВЕТА - энергия переливается
      const hueShift = Math.sin(time * 0.7) * 0.1
      const baseColor = new THREE.Color(color)
      const hsl = { h: 0, s: 0, l: 0 }
      baseColor.getHSL(hsl)
      hsl.h += hueShift
      
      // 3. ДВИЖУЩАЯСЯ ТОЛЩИНА ЛИНИИ - иллюзия течения
      const widthPulse = Math.sin(time * 4) * 0.5 + 2.5
      
      // Применяем все эффекты
      lineRef.current.material.opacity = pulse
      lineRef.current.material.color.setHSL(hsl.h, hsl.s, hsl.l)
      lineRef.current.material.linewidth = widthPulse
    }
  })

  return (
    <Line
      ref={lineRef}
      points={points}
      color={color}
      transparent
      opacity={0.7}
      lineWidth={3}
    />
  )
}