import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import { MagicCard } from './components/MagicCard'
import { SlavicRune } from './components/SlavicRune'
import { EnergyField } from './components/EnergyField'
import { EnergyFlow } from './components/EnergyFlow'
import { SoundWaves } from './components/SoundWaves'
import { CosmicBackground } from './components/CosmicBackground'
import { ParticleAura } from './components/ParticleAura'
import { TrackInfo } from './components/TrackInfo'
import { PlayerControls } from './components/PlayerControls'
import { MusicVisualizer } from './components/MusicVisualizer'
import { useState } from 'react'
import { api } from './api'

function App({ isMobile = false }) {
  const [selectedElement, setSelectedElement] = useState(null)
  const [wavesPosition, setWavesPosition] = useState([0, 0, 0])
  const [wavesColor, setWavesColor] = useState('#FFFFFF')
  const [cameraPosition, setCameraPosition] = useState([0, 1, 7])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState('Космическая магия')

  // Адаптивные настройки
  const cameraFov = isMobile ? 60 : 75
  const cameraFar = isMobile ? 100 : 1000
  const enablePan = !isMobile
  const zoomSpeed = isMobile ? 0.8 : 1.0
  const minDistance = isMobile ? 4 : 3
  const maxDistance = isMobile ? 8 : 15

  const getElementColor = (element) => {
    const colors = {
      'air': '#8A2BE2',
      'water': '#4A00E0',
      'earth': '#00D4AA',
      'fire': '#E25822'
    }
    return colors[element] || '#FFFFFF'
  }

  const handleCardClick = async (element, cardPosition) => {
    console.log(`Избрана стихия: ${element}`)
    
    // Мгновенное обновление UI
    setSelectedElement(element)
    setCurrentTrack(`Стихия ${element}`)
    setWavesPosition(cardPosition)
    setWavesColor(getElementColor(element))
    
    try {
      // ВСЕГДА останавливаем текущее воспроизведение перед запуском нового
      if (isPlaying) {
        console.log('⏹️ Останавливаем текущее воспроизведение...')
        await api.stopFrequency()
        // Даем время серверу обработать остановку
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      // Запускаем новую частоту
      console.log(`🎵 Запускаем новую частоту: ${element}`)
      const result = await api.startFrequency(element)
      console.log('Результат генерации:', result)
      
      setIsPlaying(true)
      
    } catch (error) {
      console.error('Ошибка:', error)
      // Даже если ошибка, обновляем состояние
      setIsPlaying(true)
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
    <div className="w-screen h-screen bg-black">
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
      >
        <PerspectiveCamera
          makeDefault
          position={cameraPosition}
          fov={cameraFov}
          near={0.1}
          far={cameraFar}
        />
        
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A00E0" />
        
        <CosmicBackground />
        
        <group position={[0, 0.5, 0]}>
          <MagicCard 
            element="air" 
            position={[-2.5, 0, -1]} 
            onClick={() => handleCardClick('air', [-2.5, 0, -1])}
            isSelected={selectedElement === 'air'}
          />
          <MagicCard 
            element="water" 
            position={[-0.8, 0, 0]} 
            onClick={() => handleCardClick('water', [-0.8, 0, 0])}
            isSelected={selectedElement === 'water'}
          />
          <MagicCard 
            element="earth" 
            position={[0.8, 0, 0]} 
            onClick={() => handleCardClick('earth', [0.8, 0, 0])}
            isSelected={selectedElement === 'earth'}
          />
          <MagicCard 
            element="fire" 
            position={[2.5, 0, -1]} 
            onClick={() => handleCardClick('fire', [2.5, 0, -1])}
            isSelected={selectedElement === 'fire'}
          />
        </group>

        <EnergyFlow from={[-2.5, 0, -1]} to={[-0.8, 0, 0]} color="#8A2BE2" />
        <EnergyFlow from={[-0.8, 0, 0]} to={[0.8, 0, 0]} color="#4A00E0" />
        <EnergyFlow from={[0.8, 0, 0]} to={[2.5, 0, -1]} color="#00D4AA" />

        <EnergyField position={[-2.5, 0, -2]} color="#8A2BE2" />
        <EnergyField position={[-0.8, 0, -1]} color="#4A00E0" />
        <EnergyField position={[0.8, 0, -1]} color="#00D4AA" />
        <EnergyField position={[2.5, 0, -2]} color="#E25822" />

        <ParticleAura position={[-2.5, 0, -1]} color="#8A2BE2" />
        <ParticleAura position={[-0.8, 0, 0]} color="#4A00E0" />
        <ParticleAura position={[0.8, 0, 0]} color="#00D4AA" />
        <ParticleAura position={[2.5, 0, -1]} color="#E25822" />

        {selectedElement && (
          <SlavicRune 
            rune={selectedElement} 
            position={[0, 3.5, 0]} 
          />
        )}

        {selectedElement && (
          <SoundWaves 
            position={wavesPosition}
            visible={true}
            color={wavesColor}
          />
        )}

        <MusicVisualizer isPlaying={isPlaying} element={selectedElement} />

        <OrbitControls
          enableZoom={true}
          enablePan={enablePan}
          enableRotate={true}
          minDistance={minDistance}
          maxDistance={maxDistance}
          zoomSpeed={zoomSpeed}
        />

        <Environment preset="night" />
      </Canvas>
    </div>
  )
}

export default App