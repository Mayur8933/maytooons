import { Mood, MoodKey } from '../types'

interface MoodCardProps {
  mood: Mood
  isSelected: boolean
  onSelect: (key: MoodKey) => void
}

export default function MoodCard({ mood, isSelected, onSelect }: MoodCardProps) {
  return (
    <button
      onClick={() => onSelect(mood.key)}
      style={{
        background: isSelected ? mood.cardColor : '#fff',
        border: `2px solid ${isSelected ? mood.badgeColor : '#eee'}`,
        borderRadius: 16,
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        cursor: 'none',
        transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isSelected ? 'translateY(-3px) scale(1.03)' : 'none',
        position: 'relative',
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Selected checkmark */}
      {isSelected && (
        <div style={{
          position: 'absolute',
          top: 8,
          right: 10,
          width: 18,
          height: 18,
          background: mood.badgeColor,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10,
          fontWeight: 900,
        }}>✓</div>
      )}
      <span style={{ fontSize: 28 }}>{mood.emoji}</span>
      <span style={{
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 800,
        fontSize: 14,
        color: '#1a1a1a',
      }}>{mood.label}</span>
      <span style={{
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 400,
        fontSize: 11,
        color: '#888',
      }}>{mood.tagline}</span>
    </button>
  )
}
