import { useEffect, useState } from 'react'
import { isReduced } from '../hooks'

export default function Preloader({ onComplete }) {
  const [n, setN] = useState(0)
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const DUR = isReduced() ? 200 : 2100
    const t0 = performance.now()
    let raf
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / DUR)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setDone(true)
          onComplete()
          setTimeout(() => setGone(true), 1300)
        }, 350)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  if (gone) return null
  return (
    <div className={`preloader${done ? ' done' : ''}`}>
      <div className="pre-inner">
        <div className="pre-counter">{n}</div>
        <div className="pre-label">
          {'BLACKLIGHT MOTION'.split('').map((ch, i) => (
            <b key={i} style={{ animationDelay: `${0.4 + i * 0.045}s` }}>
              {ch === ' ' ? ' ' : ch}
            </b>
          ))}
        </div>
        <div className="pre-bar"><i style={{ width: `${n}%` }} /></div>
      </div>
    </div>
  )
}
