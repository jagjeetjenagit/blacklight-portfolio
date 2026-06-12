import { useEffect, useRef, useState } from 'react'
import { isTouch } from '../hooks'
import { PROJECTS } from '../data/projects'
import Reveal from './Reveal'
import VideoControls from './VideoControls'

function WorkCard({ project, index }) {
  const cardRef = useRef(null)
  const videoRef = useRef(null)
  const mediaRef = useRef(null)
  const userPaused = useRef(false)
  const [revealed, setRevealed] = useState(false)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    const v = videoRef.current

    // "live" mirrors real playback, however it was started
    const onPlay = () => setLive(true)
    const onPause = () => setLive(false)
    v.addEventListener('play', onPlay)
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

    // touch devices have no hover: play while the card fills the viewport
    let io
    if (isTouch()) {
      io = new IntersectionObserver(
        ([e]) => (e.intersectionRatio >= 0.55 ? v.play().catch(() => {}) : v.pause()),
        { threshold: [0, 0.55, 1] },
      )
      io.observe(el)
    }

    return () => {
      reveal.disconnect()
      io?.disconnect()
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
    }
  }, [])

  // 3D tilt + glare tracking the pointer
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
        if (!userPaused.current) videoRef.current?.play().catch(() => {})
      }}
      onMouseLeave={() => {
        if (isTouch()) return
        if (!document.fullscreenElement) videoRef.current?.pause()
        mediaRef.current.style.transform = ''
      }}
    >
      <div className="work-media" ref={mediaRef}>
        <div className={`ph p${(index % 6) + 1}`}>{project.tag}</div>
        <video ref={videoRef} src={project.src} muted loop playsInline preload="metadata" />
        <div className="glare" />
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
  return (
    <section id="work">
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
