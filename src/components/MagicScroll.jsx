import { MagicCardV2 } from './ui/MagicCardV2'

export const MagicScroll = ({ onCardClick, selectedElement }) => {
  const cards = [
    { element: 'air', position: [0, 6, 0] },
    { element: 'water', position: [0, 2, 0] },
    { element: 'earth', position: [0, -2, 0] },
    { element: 'fire', position: [0, -6, 0] }
  ]

  return (
    <group>
      {cards.map(({ element, position }) => (
        <MagicCardV2
          key={element}
          element={element}
          position={position}
          rotation={[0, 0, 0]}
          onClick={() => onCardClick(element, position)}
          isSelected={selectedElement === element}
        />
      ))}
    </group>
  )
}