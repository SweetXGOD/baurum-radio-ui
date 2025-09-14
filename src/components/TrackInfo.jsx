export const TrackInfo = ({ currentTrack, currentElement }) => {
  const getElementName = (element) => {
    const names = {
      'air': 'Воздух 🌬️',
      'water': 'Вода 💧', 
      'earth': 'Земля 🌍',
      'fire': 'Огонь 🔥'
    }
    return names[element] || 'Магия ✨'
  }

  return (
    <div className="absolute top-4 left-0 right-0 text-center text-white">
      <h2 className="text-2xl font-bold mb-2">BAURUM RADIO</h2>
      <p className="text-lg opacity-80">Сейчас играет: {currentTrack}</p>
      <p className="text-lg">Частота: {getElementName(currentElement)}</p>
    </div>
  )
}