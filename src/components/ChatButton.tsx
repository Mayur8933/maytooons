import { Mood } from '../types'

interface ChatButtonProps {
  mood: Mood
  onClick: () => void
}

export default function ChatButton({ mood, onClick }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        background: mood.badgeColor,
        border: 'none',
        borderRadius: 50,
        padding: '16px 24px',
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 800,
        fontSize: 15,
        color: '#1a1a1a',
        cursor: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 8,
        animation: 'slide-up 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
    >
      {mood.chatPrompt} 💬
    </button>
  )
}
