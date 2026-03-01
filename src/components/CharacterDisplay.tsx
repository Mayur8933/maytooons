import { useEffect, useRef, useState } from 'react'
import { Mood } from '../types'

interface CharacterDisplayProps {
  selectedMood: Mood | null
}

export default function CharacterDisplay({ selectedMood }: CharacterDisplayProps) {
  const [bubble, setBubble] = useState<string | null>(null)
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!selectedMood) return

    // Clear existing timers
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current)
    setBubble(selectedMood.bubble)

    bubbleTimer.current = setTimeout(() => setBubble(null), 3000)
    return () => { if (bubbleTimer.current) clearTimeout(bubbleTimer.current) }
  }, [selectedMood])

  return (
    <div style={{
      background: '#fff',
      border: '2px solid #f0f0f0',
      borderRadius: 20,
      padding: '16px',
      minHeight: 200,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'visible',
      marginBottom: 12,
    }}>
      {/* Placeholder when no mood selected */}
      {!selectedMood && (
        <p style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: 13,
          color: '#bbb',
          letterSpacing: 1,
          border: '2px dashed #e8e8e8',
          borderRadius: 12,
          padding: '24px 32px',
        }}>
          Select a mood to meet your buddy
        </p>
      )}

      {/* Character image */}
      {selectedMood && (
        <div style={{ position: 'relative' }}>
          {/* Speech bubble */}
          {bubble && (
            <div style={{
              position: 'absolute',
              top: 20,
              right: -10,
              background: selectedMood.badgeColor,
              borderRadius: '18px 18px 18px 4px',
              padding: '8px 14px',
              fontSize: 12,
              fontWeight: 800,
              fontFamily: "'Nunito', sans-serif",
              color: '#1a1a1a',
              whiteSpace: 'nowrap',
              zIndex: 10,
              animation: 'pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
              transform: 'translateX(100%)',
            }}>
              {bubble}
            </div>
          )}

          {/* Badge */}
          <div style={{
            position: 'absolute',
            top: -10,
            right: -10,
            background: selectedMood.badgeColor,
            borderRadius: 20,
            padding: '4px 12px',
            fontSize: 12,
            fontWeight: 800,
            fontFamily: "'Fredoka One', cursive",
            color: '#1a1a1a',
            whiteSpace: 'nowrap',
            zIndex: 10,
          }}>
            {selectedMood.emoji} {selectedMood.label.toUpperCase()}
          </div>

          <img
            src={selectedMood.imgSrc}
            alt=""
            style={{
              width: 150,
              height: 260,
              objectFit: 'contain',
              objectPosition: 'bottom center',
              display: 'block',
            }}
          />
        </div>
      )}
    </div>
  )
}
