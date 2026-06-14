import { useEffect, useRef, useState } from 'react'
import { isTouch } from '../hooks'
import { focusFX, setFocusTarget } from '../fx'
import { PROJECTS } from '../data/projects'
import Reveal from './Reveal'
import VideoControls from './VideoControls'

function WorkCard({ project, index }) {
  const cardRef = useRef(null)
  const videoRef = useRef(null)
  const mediaRef = useRef(null)
  const userPaused = useRef(false)
  const showTimer = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const [live, setLive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const el = cardRef.current
    const v = videoRef.current

    // download % from the buffered ranges
    const buffered = () =>
      v.duration && v.buffered.length
        ? Math.min(100, Math.round((v.buffered.end(v.buffered.length - 1) / v.duration) * 100))
        : 0

    // show the loader only if it's still not ready after a short beat, so a
    // cached/instant video doesn't flash an overlay
    const clearShow = () => { clearTimeout(showTimer.current); showTimer.current = null }
    const scheduleShow = () => {
      if (showTimer.current) return
      showTimer.current = setTimeout(() => {
        if (v.readyState < 3) { setPct(buffered()); setLoading(true) }
      }, 180)
    }

    // "live" mirrors real playback, however it was started (hover, or the
    // centered-card controller on touch)
    const onPlay = () => { setLive(true); if (v.readyState < 3) scheduleShow() }
    const onWaiting = () => scheduleShow()
    const onPlaying = () => { clearShow(); setLoading(false) }
    const onProgress = () => setPct(buffered())
    const onPause = () => { setLive(false); clearShow(); setLoading(false) }

    v.addEventListener('play', onPlay)
    v.addEventListener('waiting', onWaiting)
    v.addEventListener('playing', onPlaying)
    v.addEventListener('progress', onProgress)
    v.addEventListener('pause', onPause)

    const reveal = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(true)
          reveal.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
    )
    reveal.observe(el)

    return () => {
      reveal.disconnect()
      clearShow()
      v.removeEventListener('play', onPlay)
      v.removeEventListener('waiting', onWaiting)
      v.removeEventListener('playing', onPlaying)
      v.removeEventListener('progress', onProgress)
      v.removeEventListener('pause', onPause)
    }
  }, [])

  // 3D tilt + glare tracking the pointer (desktop)
  const onMouseMove = (e) => {
    if (isTouch()) return
    const el = mediaRef.current
    if (document.fullscreenElement === el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.transform =
      `perspective(950px) rotateX(${(0.5 - py) * 9}deg) rotateY(${(px - 0.5) * 11}deg) scale3d(1.02,1.02,1.02)`
    el.style.setProperty('--gx', `${px * 100}%`)
    el.style.setProperty('--gy', `${py * 100}%`)
  }

  return (
    <div
      ref={cardRef}
      className={`work${revealed ? ' in-view' : ''}${live ? ' live' : ''}`}
      data-cursor="video"
      onMouseMove={onMouseMove}
      onMouseEnter={() => {
        if (isTouch() || userPaused.current) return
        videoRef.current?.play().catch(() => {})
      }}
      onMouseLeave={() => {
        if (isTouch()) return
        if (!document.fullscreenElement) videoRef.current?.pause()
        mediaRef.current.style.transform = ''
      }}
    >
      <div className="work-media" ref={mediaRef}>
        <div className={`ph p${(index % 6) + 1}`}>{project.tag}</div>
        <video ref={videoRef} src={project.src} poster={project.poster} muted loop playsInline preload="metadata" />
        <div className="glare" />
        {loading && (
          <div className="vid-loading" aria-hidden="true">
            <svg className="vl-ring" viewBox="0 0 36 36">
              <circle className="vl-bg" cx="18" cy="18" r="16" pathLength="100" />
              <circle className="vl-fg" cx="18" cy="18" r="16" pathLength="100" style={{ strokeDashoffset: 100 - pct }} />
            </svg>
            <span>{pct}%</span>
          </div>
        )}
        <div className="work-live-tag"><i /> PLAYING</div>
        <VideoControls
          videoRef={videoRef}
          containerRef={mediaRef}
          onUserPause={(p) => { userPaused.current = p }}
        />
      </div>
      <div className="work-info">
        <h3>{project.title}</h3>
        <p>{project.meta}</p>
      </div>
    </div>
  )
}

export default function WorkGrid() {
  const sectionRef = useRef(null)

  // On touch there's no hover, so play only the card nearest the screen
  // centre — one at a time — and aim the particle drain at it so the
  // energy-absorb + bursts happen as you scroll.
  useEffect(() => {
    if (!isTouch()) return
    const root = sectionRef.current
    let ticking = false

    const update = () => {
      ticking = false
      const cy = innerHeight * 0.5
      const cards = [...root.querySelectorAll('.work')]
      let best = null
      let bestDist = Infinity
      for (const card of cards) {
        const r = card.querySelector('.work-media').getBoundingClientRect()
        const visible = r.bottom > innerHeight * 0.12 && r.top < innerHeight * 0.88
        if (!visible) continue
        const dist = Math.abs((r.top + r.bottom) / 2 - cy)
        if (dist < bestDist) { bestDist = dist; best = card }
      }
      for (const card of cards) {
        const v = card.querySelector('video')
        if (!v) continue
        if (card === best) { if (v.paused) v.play().catch(() => {}) }
        else if (!v.paused) v.pause()
      }
      if (best) setFocusTarget(best.querySelector('.work-media'))
      else focusFX.active = false
    }

    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update) }
    }
    addEventListener('scroll', onScroll, { passive: true })
    const t = setTimeout(update, 400)
    return () => {
      removeEventListener('scroll', onScroll)
      clearTimeout(t)
      focusFX.active = false
    }
  }, [])

  return (
    <section id="work" ref={sectionRef}>
      <div className="sec-head">
        <Reveal as="h2" className="sec-title">SELECTED <em>work</em></Reveal>
        <Reveal className="sec-tag">{String(PROJECTS.length).padStart(2, '0')} PROJECTS</Reveal>
      </div>
      <div className="work-grid">
        {PROJECTS.map((p, i) => (
          <WorkCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
