import { useState, useRef, useEffect } from 'react'
import { Mood, ChatMessage } from '../types'

const FREE_LIMIT = 5

interface Props {
  mood: Mood
  onBack: () => void
}

export default function ChatWindow({ mood, onBack }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'buddy', text: mood.chatGreeting },
  ])
  const [input, setInput] = useState('')
  const [userCount, setUserCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const getRandom = () =>
    mood.chatResponses[Math.floor(Math.random() * mood.chatResponses.length)]

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return

    if (userCount >= FREE_LIMIT) {
      setShowPaywall(true)
      return
    }

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    const newCount = userCount + 1
    setUserCount(newCount)

    setIsTyping(true)

    if (newCount >= FREE_LIMIT) {
      setTimeout(() => {
        setIsTyping(false)
        const tiredMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'buddy',
          text: "okay ngl I am exhausted now 😮‍💨 I have been chatting SO much... a little coffee would really help me keep going, you know? ☕",
        }
        setMessages(prev => [...prev, tiredMsg])
        setTimeout(() => setShowPaywall(true), 1000)
      }, 900)
    } else {
      setTimeout(() => {
        setIsTyping(false)
        setMessages(prev => [
          ...prev,
          { id: (Date.now() + 1).toString(), role: 'buddy', text: getRandom() },
        ])
      }, 700 + Math.random() * 500)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100vh', width: '100%', maxWidth: 420,
      margin: '0 auto', background: '#FAFAF7', position: 'relative',
    }}>

      {/* ── Header ── */}
      <div style={{
        background: '#fff', borderBottom: '2px solid #f0f0f0',
        padding: '12px 16px', display: 'flex', alignItems: 'center',
        gap: 12, flexShrink: 0,
      }}>
        <button onClick={onBack} style={{
          background: '#f5f5f5', border: 'none', borderRadius: '50%',
          width: 36, height: 36, fontSize: 16, cursor: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>←</button>

        <img src={mood.imgSrc} alt="" style={{ width: 36, height: 48, objectFit: 'contain', flexShrink: 0 }} />

        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 15, color: '#1a1a1a' }}>
            {mood.emoji} {mood.label} Buddy
          </div>
          <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: '#aaa' }}>Maytooons</div>
        </div>

        <div style={{
          background: mood.badgeColor, borderRadius: 20,
          padding: '4px 12px', fontFamily: "'Fredoka One', cursive",
          fontSize: 12, color: '#1a1a1a', flexShrink: 0,
        }}>
          {mood.emoji} {mood.label}
        </div>
      </div>

      {/* ── Character strip ── */}
      <div style={{
        background: mood.cardColor,
        display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        height: 140, overflow: 'hidden', flexShrink: 0, position: 'relative',
      }}>
        <img src={mood.imgSrc} alt="" style={{
          height: 170, objectFit: 'contain', objectPosition: 'bottom', marginBottom: -10,
        }} />
        {/* Mode bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: mood.badgeColor, padding: '6px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>{mood.emoji}</span>
            <div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 13, color: '#1a1a1a' }}>
                {mood.label} Mode
              </div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 10, color: 'rgba(0,0,0,0.5)' }}>
                Your stick buddy is in the chat
              </div>
            </div>
          </div>
          <div style={{
            width: 8, height: 8, background: '#22c55e', borderRadius: '50%',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }} />
        </div>
      </div>

      {/* ── Messages ── */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '16px',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {messages.map(msg => (
          <div key={msg.id} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            alignItems: 'flex-end', gap: 8,
            animation: 'msg-in 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
          }}>
            {msg.role === 'buddy' && (
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: mood.cardColor, border: `2px solid ${mood.badgeColor}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, flexShrink: 0,
              }}>{mood.emoji}</div>
            )}
            <div style={{
              maxWidth: '72%',
              background: msg.role === 'buddy' ? '#fff' : mood.badgeColor,
              border: msg.role === 'buddy' ? '2px solid #f0f0f0' : 'none',
              borderRadius: msg.role === 'buddy' ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
              padding: '10px 14px',
              fontFamily: "'Nunito', sans-serif",
              fontSize: 14, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.5,
            }}>{msg.text}</div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{
            display: 'flex', alignItems: 'flex-end', gap: 8,
            animation: 'msg-in 0.3s ease both',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: mood.cardColor, border: `2px solid ${mood.badgeColor}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
            }}>{mood.emoji}</div>
            <div style={{
              background: '#fff', border: '2px solid #f0f0f0',
              borderRadius: '18px 18px 18px 4px',
              padding: '12px 16px', display: 'flex', gap: 4, alignItems: 'center',
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, background: '#ccc', borderRadius: '50%',
                  animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ── */}
      <div style={{
        background: '#fff', borderTop: '2px solid #f0f0f0',
        padding: '12px 16px', display: 'flex', gap: 10,
        alignItems: 'center', flexShrink: 0,
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={mood.chatPlaceholder}
          style={{
            flex: 1, background: '#f5f5f5', border: '2px solid transparent',
            borderRadius: 50, padding: '10px 16px',
            fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 600,
            color: '#1a1a1a', outline: 'none', cursor: 'none',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = mood.badgeColor
            e.currentTarget.style.background = '#fff'
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = 'transparent'
            e.currentTarget.style.background = '#f5f5f5'
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            width: 44, height: 44, background: mood.badgeColor,
            border: 'none', borderRadius: '50%', fontSize: 18,
            cursor: 'none', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >➤</button>
      </div>

      {/* ── Paywall overlay ── */}
      {showPaywall && <PaywallOverlay mood={mood} onClose={() => setShowPaywall(false)} />}
    </div>
  )
}

// ─────────────────────────────────────────────
// Paywall
// ─────────────────────────────────────────────
function PaywallOverlay({ mood, onClose }: { mood: Mood; onClose: () => void }) {
  const tiers = [
    { icon: '☕', label: 'One Coffee', price: '₹99', desc: '50 more chats', highlight: false },
    { icon: '☕☕', label: 'Two Coffees', price: '₹199', desc: 'Unlimited chats this month', highlight: true },
  ]

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 24, zIndex: 100,
      animation: 'msg-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
    }}>

      {/* Tired character */}
      <img src={mood.imgSrc} alt="" style={{
        width: 90, height: 130, objectFit: 'contain',
        marginBottom: 12, opacity: 0.75, filter: 'grayscale(20%)',
      }} />

      <div style={{
        background: '#fff', border: '2px solid #f0f0f0',
        borderRadius: 24, padding: 24, width: '100%',
        maxWidth: 340, textAlign: 'center',
        boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
      }}>
        <div style={{ fontSize: 38, marginBottom: 8 }}>☕</div>

        <h2 style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: 22, color: '#1a1a1a', marginBottom: 6,
        }}>buy me a coffee?</h2>

        <p style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: 13, color: '#888', lineHeight: 1.6, marginBottom: 20,
        }}>
          I have been chatting SO much and I am genuinely exhausted 😮‍💨
          A coffee keeps me going and unlocks more chats!
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {tiers.map(tier => (
            <button
              key={tier.price}
              onClick={() => window.open('https://buymeacoffee.com/mayurpatil', '_blank')}
              style={{
                background: tier.highlight ? mood.badgeColor : '#f5f5f5',
                border: `2px solid ${tier.highlight ? mood.badgeColor : '#eee'}`,
                borderRadius: 14, padding: '12px 16px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                cursor: 'none', width: '100%',
                transition: 'transform 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
            >
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 14, color: '#1a1a1a' }}>
                  {tier.icon} {tier.label}
                </div>
                <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: '#888' }}>
                  {tier.desc}
                </div>
              </div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 16, color: '#1a1a1a' }}>
                {tier.price}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'transparent', border: 'none',
            fontFamily: "'Nunito', sans-serif", fontSize: 12,
            color: '#bbb', cursor: 'none', textDecoration: 'underline',
          }}
        >
          maybe later
        </button>
      </div>
    </div>
  )
}
