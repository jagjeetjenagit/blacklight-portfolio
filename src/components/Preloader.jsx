import { useEffect, useState } from 'react'
import { isReduced } from '../hooks'
import { CRITICAL_VIDEOS, POSTERS } from '../data/projects'
import { preloadVideo, preloadImage } from '../preload'

// Holds the page until the hero + showreel videos are actually downloaded,
// showing real progress. A hard MAX cap guarantees entry even on slow links.
const MIN_MS = 1100          // never flash by faster than this
const MAX_MS = 18000         // safety: enter even if a download stalls

export default function Preloader({ onComplete }) {
  const [n, setN] = useState(0)
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    // all poster thumbnails are tiny — fetch them up front so every work
    // card shows a still the instant the site reveals (no blank dark boxes)
    POSTERS.forEach((u) => preloadImage(u))

    if (isReduced()) {
      // honour reduced-motion: skip the show, but still kick off downloads
      CRITICAL_VIDEOS.forEach((u) => preloadVideo(u))
      setN(100)
      setDone(true)
      onComplete()
      const t = setTimeout(() => setGone(true), 300)
      return () => clearTimeout(t)
    }

    const t0 = performance.now()
    const progress = new Array(CRITICAL_VIDEOS.length).fill(0)
    let realDone = false
    let raf

    Promise.all(
      CRITICAL_VIDEOS.map((url, i) =>
        preloadVideo(url, (p) => { progress[i] = p }),
      ),
    ).then(() => { realDone = true })

    const tick = () => {
      const elapsed = performance.now() - t0
      const real = progress.reduce((a, b) => a + b, 0) / CRITICAL_VIDEOS.length
      // smooth time curve that keeps creeping (eases toward ~0.97 over ~8s)
      // so the counter never parks at a flat number while the video buffers
      const timeCurve = (1 - Math.pow(1 - Math.min(elapsed / 8000, 1), 2)) * 0.97
      let shown = Math.max(real, timeCurve)

      const finished = (realDone && elapsed > MIN_MS) || elapsed > MAX_MS
      if (!finished) shown = Math.min(shown, 0.99)
      setN(Math.round(Math.min(shown, 1) * 100))

      if (finished) {
        setN(100)
        setDone(true)
        onComplete()
        setTimeout(() => setGone(true), 1300)
        return
      }
      raf = requestAnimationFrame(tick)
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
        <div className="pre-sub">{done ? 'READY' : 'LOADING FILMS'}</div>
        <div className="pre-bar"><i style={{ width: `${n}%` }} /></div>
      </div>
    </div>
  )
}
