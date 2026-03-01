import { useEffect, useState } from 'react'
import loader from '../images/scare.png'

interface LoaderProps {
  onDone: () => void
}

export default function Loader({ onDone }: LoaderProps) {
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    const minDelay = new Promise<void>(resolve => setTimeout(resolve, 2500))
    const pageLoad = new Promise<void>(resolve => {
      if (document.readyState === 'complete') resolve()
      else window.addEventListener('load', () => resolve())
    })
    Promise.all([minDelay, pageLoad]).then(() => {
      setFadingOut(true)
      setTimeout(onDone, 700)
    })
  }, [onDone])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      zIndex: 1000,
      opacity: fadingOut ? 0 : 1,
      pointerEvents: fadingOut ? 'none' : 'auto',
      transition: 'opacity 0.7s ease',
    }}>
      <img
        src={loader}
        alt=""
        style={{
          width: 150,
          height: 300,
          objectFit: 'contain',
          animation: 'loader-shake 0.3s ease-in-out infinite',
        }}
      />
      <p style={{
        fontFamily: "'Fredoka One', cursive",
        fontSize: 18,
        color: '#1a1a1a',
        letterSpacing: 1,
        animation: 'loader-pulse 1s ease-in-out infinite',
      }}>
        oh no... it's loading 😱
      </p>
    </div>
  )
}
