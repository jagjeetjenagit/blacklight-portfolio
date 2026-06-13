import { useEffect, useRef, useState } from 'react'
import { useReveal, isTouch } from '../hooks'
import { SHOWREEL } from '../data/projects'
import Reveal from './Reveal'
import VideoControls from './VideoControls'

const pad = (i) => String(i + 1).padStart(2, '0')

export default function Showreel() {
  const [idx, setIdx] = useState(0)
  const reelRef = useReveal()
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const tryPlay = () => v.play().catch(() => {})
    tryPlay()
    v.addEventListener('loadeddata', tryPlay)
    return () => v.removeEventListener('loadeddata', tryPlay)
  }, [idx])

  // on touch, only play while the reel is on screen (battery + "one at a time")
  useEffect(() => {
    if (!isTouch()) return
    const el = reelRef.current
    const v = videoRef.current
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.45 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // cinematic tilt: the whole frame leans and the footage pans toward the pointer
  const onMouseMove = (e) => {
    if (isTouch()) return
    const el = reelRef.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.transition = 'transform .25s ease-out, box-shadow .8s var(--ease)'
    el.style.transform =
      `perspective(1300px) rotateX(${(0.5 - py) * 3.5}deg) rotateY(${(px - 0.5) * 4.5}deg)`
    el.style.setProperty('--gx', `${px * 100}%`)
    el.style.setProperty('--gy', `${py * 100}%`)
    if (videoRef.current) {
      videoRef.current.style.transform =
        `translate(${(px - 0.5) * -2.4}%, ${(py - 0.5) * -2}%) scale(1.07)`
    }
  }

  const onMouseLeave = () => {
    if (isTouch()) return
    const el = reelRef.current
    el.style.transform = ''
    if (videoRef.current) videoRef.current.style.transform = ''
  }

  return (
    <section className="reel-wrap" id="reel">
      <div className="sec-head">
        <Reveal as="h2" className="sec-title">THE <em>showreel</em></Reveal>
        <Reveal className="sec-tag">2026 / {pad(idx)} OF {pad(SHOWREEL.length - 1)}</Reveal>
      </div>
      <div
        ref={reelRef}
        className="reel"
        data-cursor="video"
        data-cursor-label="NEXT"
        onClick={() => setIdx((i) => (i + 1) % SHOWREEL.length)}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <video
          key={SHOWREEL[idx]}
          ref={videoRef}
          src={SHOWREEL[idx]}
          muted loop playsInline autoPlay preload="auto"
        />
        <div className="glare" />
        <div className="reel-badge"><i /> NOW PLAYING — BLACKLIGHT REEL '26 — {pad(idx)}/{pad(SHOWREEL.length - 1)}</div>
        <VideoControls videoRef={videoRef} containerRef={reelRef} mediaKey={idx} />
      </div>
    </section>
  )
}
