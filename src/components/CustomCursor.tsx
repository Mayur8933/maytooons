import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isDown, setIsDown] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    const down = () => setIsDown(true)
    const up = () => setIsDown(false)
    document.addEventListener('mousemove', move)
    document.addEventListener('mousedown', down)
    document.addEventListener('mouseup', up)
    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mousedown', down)
      document.removeEventListener('mouseup', up)
    }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      left: pos.x,
      top: pos.y,
      width: isDown ? 28 : 16,
      height: isDown ? 28 : 16,
      background: '#FFD93D',
      border: '2px solid #1a1a1a',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 9999,
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.15s, height 0.15s',
    }} />
  )
}
