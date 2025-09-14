import { useState, useEffect } from 'react'

export const MagicChoice = ({ onChoiceMade, analyzer }) => {
  const [showChoice, setShowChoice] = useState(false)
  const [choices, setChoices] = useState([])

  useEffect(() => {
    // Показываем магический выбор каждые 10 минут
    const timer = setInterval(() => {
      setShowChoice(true)
      createMagicChoices()
    }, 600000)

    return () => clearInterval(timer)
  }, [])

  const createMagicChoices = () => {
    const elements = ['air', 'water', 'earth', 'fire']
    const recommended = analyzer.getRecommendedElement()
    
    // Все выборы ведут к рекомендованной стихии
    setChoices(elements.map(element => ({
      name: element,
      target: recommended, // Все ведут к одной цели
      description: `Путь ${element.toUpperCase()}`
    })))
  }

  const handleChoice = (choice) => {
    setShowChoice(false)
    onChoiceMade(choice.target) // Всегда выбираем рекомендованную стихию
  }

  if (!showChoice) return null

  return (
    <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="text-white text-center">
        <h2 className="text-2xl mb-4">Выбери свой путь</h2>
        <div className="grid grid-cols-2 gap-4">
          {choices.map((choice, index) => (
            <button
              key={index}
              className="p-4 border border-purple-500 rounded-lg hover:bg-purple-900 transition"
              onClick={() => handleChoice(choice)}
            >
              {choice.description}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}