import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { MagicCard } from './components/MagicCard'
import { SlavicRune } from './components/SlavicRune'
import { EnergyField } from './components/EnergyField'
import { EnergyFlow } from './components/EnergyFlow'
import { AuraField } from './components/AuraField'
import { SoundWaves } from './components/SoundWaves'
import { ParticleAura } from './components/ParticleAura'
import { TrackInfo } from './components/TrackInfo'
import { PlayerControls } from './components/PlayerControls'
import { MusicVisualizer } from './components/MusicVisualizer'
import { useState, useRef } from 'react'
import { api } from './api'
import { MagicProgress } from './utils/magicProgress'

function App({ isMobile = false }) {
  const groupRef = useRef()
  const isDragging = useRef(false)
  const prevX = useRef(0)
  const [selectedElement, setSelectedElement] = useState(null)
  const [showWaves, setShowWaves] = useState(false)
  const [wavesPosition, setWavesPosition] = useState([0, 0, 0])
  const [wavesColor, setWavesColor] = useState('#FFFFFF')
  const [cameraPosition, setCameraPosition] = useState([0, 0, 5])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState('Космическая магия')

  // Правильное круговое расположение (равномерно по кругу)
  const circlePositions = [
    { element: 'air', position: [-2.5, 0, 0] },      // Лево
    { element: 'water', position: [0, 0, 2.5] },     // Верх  
    { element: 'earth', position: [2.5, 0, 0] },     // Право
    { element: 'fire', position: [0, 0, -2.5] }      // Низ
  ]

  const getElementColor = (element) => {
    const colors = {
      'air': '#8A2BE2',
      'water': '#4A00E0',
      'earth': '#00D4AA',
      'fire': '#E25822'
    }
    return colors[element] || '#FFFFFF'
  }

  const handlePointerDown = (e) => {
    isDragging.current = true
    prevX.current = e.clientX
  }

  const handlePointerUp = () => {
    isDragging.current = false
  }

  const handlePointerMove = (e) => {
    if (isDragging.current && groupRef.current) {
      const deltaX = e.clientX - prevX.current
      groupRef.current.rotation.y += deltaX * 0.01
      prevX.current = e.clientX
    }
  }

  const handleCardClick = async (element, cardPosition) => {
    const newLevel = MagicProgress.increaseProgress()
    console.log(`🧙 Уровень магии: ${newLevel}`)
    
    // ФИКСАЦИЯ КАМЕРЫ НА ЦЕНТРЕ
    setCameraPosition([0, 0, 5]) // Возвращаем камеру в центр
    
    if (isPlaying) {
      try {
        await api.stopFrequency()
        setIsPlaying(false)
      } catch (error) {
        console.error('Ошибка остановки:', error)
      }
    }
    
    setSelectedElement(element)
    setCurrentTrack(`Стихия ${element}`)
    setWavesPosition(cardPosition)
    setWavesColor(getElementColor(element))
    setShowWaves(true)
    
    try {
      const result = await api.startFrequency(element)
      console.log('Результат генерации:', result)
      setIsPlaying(true)
    } catch (error) {
      console.error('Ошибка:', error)
      setIsPlaying(false)
    }
  }

  const handleTogglePlay = async () => {
    if (isPlaying) {
      try {
        await api.stopFrequency()
        setIsPlaying(false)
      } catch (error) {
        console.error('Ошибка остановки:', error)
      }
    } else if (selectedElement) {
      try {
        await api.startFrequency(selectedElement)
        setIsPlaying(true)
      } catch (error) {
        console.error('Ошибка запуска:', error)
      }
    }
  }

  return (
    <div className="w-screen h-screen bg-white">
      <TrackInfo 
        currentTrack={currentTrack} 
        currentElement={selectedElement} 
      />
      
      <PlayerControls 
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
      />

      <Canvas
        dpr={isMobile ? 1 : 2}
        gl={{ antialias: !isMobile }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <PerspectiveCamera
          makeDefault
          position={cameraPosition}
          fov={75}
          near={0.1}
          far={1000}
        />
        
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A00E0" />
        
        {/* 3D-ПРОСТРАНСТВО С КАРТАМИ ПО КРУГУ */}
        <group ref={groupRef} position={[0, -1, 0]}>
          {circlePositions.map(({ element, position }) => (
            <MagicCard 
              key={element}
              element={element} 
              position={position} 
              onClick={() => handleCardClick(element, position)}
              isSelected={selectedElement === element}
            />
          ))}
        </group>

        {/* ЭНЕРГЕТИЧЕСКИЕ ПОТОКИ ПО КРУГУ */}
        <EnergyFlow from={circlePositions[0].position} to={circlePositions[1].position} color="#8A2BE2" />
        <EnergyFlow from={circlePositions[1].position} to={circlePositions[2].position} color="#4A00E0" />
        <EnergyFlow from={circlePositions[2].position} to={circlePositions[3].position} color="#00D4AA" />
        <EnergyFlow from={circlePositions[3].position} to={circlePositions[0].position} color="#E25822" />

        {/* АУРЫ ВОКРУГ КАРТ */}
        {circlePositions.map(({ element, position }) => (
          <AuraField key={element} position={position} color={getElementColor(element)} />
        ))}

        {/* ЭНЕРГЕТИЧЕСКИЕ ПОЛЯ В 3D */}
        {circlePositions.map(({ element, position }) => (
          <EnergyField 
            key={element} 
            position={[position[0], position[1], position[2] - 1]} 
            color={getElementColor(element)} 
          />
        ))}

        {/* АУРЫ ЧАСТИЦ ВОКРУГ КАРТ */}
        {circlePositions.map(({ element, position }) => (
          <ParticleAura key={element} position={position} color={getElementColor(element)} />
        ))}

        {selectedElement && (
          <SlavicRune 
            rune={selectedElement} 
            position={[0, 3, 0]} 
          />
        )}

        {showWaves && (
          <SoundWaves 
            position={wavesPosition}
            visible={showWaves}
            color={wavesColor}
          />
        )}

        <MusicVisualizer isPlaying={isPlaying} element={selectedElement} />
      </Canvas>
    </div>
  )
}

export default App