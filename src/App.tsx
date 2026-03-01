import { useState, useCallback } from 'react'
import { MoodKey, Mood, AppView } from './types'
import { MOODS } from './data/moods'
import Loader from './components/Loader'
import CharacterDisplay from './components/CharacterDisplay'
import MoodCard from './components/MoodCard'
import ChatButton from './components/ChatButton'
import ChatWindow from './components/ChatWindow'
import CustomCursor from './components/CustomCursor'
import mayTooonsLogoHead from './images/mayTooonsLogoHead.png'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [selectedKey, setSelectedKey] = useState<MoodKey>('')
  const [view, setView] = useState<AppView>('home')

  const handleDone = useCallback(() => setLoaded(true), [])

  const selectedMood: Mood | null = MOODS.find(m => m.key === selectedKey) ?? null

  const handleSelect = (key: MoodKey) => {
    setSelectedKey(prev => prev === key ? '' : key)
  }

  const openChat = () => {
    if (selectedMood) setView('chat')
  }

  const closeChat = () => setView('home')

  return (
    <>
      <CustomCursor />
      {!loaded && <Loader onDone={handleDone} />}

      {/* Chat view */}
      {view === 'chat' && selectedMood && (
        <ChatWindow mood={selectedMood} onBack={closeChat} />
      )}

      {/* Home view */}
      {view === 'home' && (
        <div style={{
          minHeight: '100vh',
          background: '#FAFAF7',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 16px',
          cursor: 'none',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: 10, marginBottom: 20,
          }}>
            <img
              src={mayTooonsLogoHead}
              alt=""
              style={{ width: 60, height: 80, objectFit: 'contain' }}
            />
            <div>
              <div style={{
                fontFamily: "'Fredoka One', cursive",
                fontSize: 26, color: '#1a1a1a', lineHeight: 1,
              }}>
                <span style={{ color: '#FFD93D' }}>May</span>tooons
              </div>
              <div style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 11, color: '#aaa', letterSpacing: 2,
                textTransform: 'uppercase', fontWeight: 700,
              }}>
                Your stick pal
              </div>
            </div>
          </div>

          {/* Main card */}
          <div style={{
            background: '#fff', borderRadius: 24, padding: 20,
            width: '100%', maxWidth: 420,
            boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
          }}>
            <CharacterDisplay selectedMood={selectedMood} />

            <div style={{
              background: '#fff', border: '2px solid #f0f0f0',
              borderRadius: 20, padding: 16,
            }}>
              <p style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 11, fontWeight: 700, color: '#bbb',
                letterSpacing: 2, textTransform: 'uppercase',
                textAlign: 'center', marginBottom: 12,
              }}>
                How are you feeling?
              </p>

              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
              }}>
                {MOODS.map(mood => (
                  <MoodCard
                    key={mood.key}
                    mood={mood}
                    isSelected={selectedKey === mood.key}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            </div>

            {selectedMood && (
              <ChatButton mood={selectedMood} onClick={openChat} />
            )}
          </div>

          <p style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: 10, color: '#ccc', letterSpacing: 2,
            textTransform: 'uppercase', fontWeight: 700, marginTop: 20,
          }}>
            Maytooons © 2026
          </p>
        </div>
      )}
    </>
  )
}
