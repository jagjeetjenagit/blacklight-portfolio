import { useEffect, useRef, useState } from 'react'
import { SHOWREEL, SERVICES, STATS } from '../data/projects'
import { isReduced } from '../hooks'
import Reveal from './Reveal'

export function Nav() {
  return (
    <nav>
      <a className="logo" href="#top">BLACKLIGHT <em>motion</em></a>
      <div className="nav-links">
        <a href="#work">WORK</a>
        <a href="#services">SERVICES</a>
        <a href="#contact">CONTACT</a>
      </div>
    </nav>
  )
}

export function Hero() {
  const videoRef = useRef(null)

  // autoplay can be blocked or interrupted — retry on load and first interaction
  useEffect(() => {
    const v = videoRef.current
    const tryPlay = () => v.play().catch(() => {})
    tryPlay()
    v.addEventListener('loadeddata', tryPlay)
    addEventListener('pointerdown', tryPlay, { once: true })
    return () => {
      v.removeEventListener('loadeddata', tryPlay)
      removeEventListener('pointerdown', tryPlay)
    }
  }, [])

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <video ref={videoRef} src={SHOWREEL[1]} muted loop playsInline autoPlay preload="auto" />
      </div>
      <div className="rays" aria-hidden="true" />
      <div className="hero-eyebrow">AI FILM &amp; VFX STUDIO — NOIDA, INDIA</div>
      <h1>
        <span className="line"><span>CINEMA AT THE</span></span>
        <span className="line"><span>SPEED OF</span></span>
        <span className="line"><span><em>imagination.</em></span></span>
      </h1>
      <div className="hero-foot">
        <p className="hero-sub">
          Blacklight Motion builds AI-generated films, VFX and brand stories frame
          by frame — wedding cinema, mythology animation and ads watched by millions.
        </p>
        <div className="hero-cta">
          <a className="btn solid" href="#reel">▶&nbsp; WATCH SHOWREEL</a>
          <a className="btn" href="#contact">START A PROJECT</a>
        </div>
      </div>
      <div className="hero-meta">
        <span>NOIDA — INDIA</span>
        <span>AI FILMS / VFX / ANIMATION</span>
        <span>10M+ VIEWS</span>
        <span className="hm-scroll">SCROLL ↓</span>
      </div>
    </section>
  )
}

export function Marquee() {
  const items = (
    <span>
      AI FILMS <b>✦</b> VFX &amp; POST <b>✦</b> BRAND ADS <b>✦</b> MYTHOLOGY
      ANIMATION <b>✦</b> WEDDING CINEMA <b>✦</b> MUSIC VIDEOS <b>✦</b>&nbsp;
    </span>
  )
  return (
    <div className="marquee">
      <div className="marquee-track">{items}{items}</div>
    </div>
  )
}

export function Services() {
  return (
    <section className="services" id="services">
      <div className="sec-head">
        <Reveal as="h2" className="sec-title">WHAT WE <em>create</em></Reveal>
        <Reveal className="sec-tag">CAPABILITIES</Reveal>
      </div>
      {SERVICES.map((s) => (
        <Reveal key={s.num} className="srv">
          <div className="srv-left"><span className="num">{s.num}</span><h3>{s.title}</h3></div>
          <p>{s.desc}</p>
        </Reveal>
      ))}
    </section>
  )
}

function Stat({ end, suffix, label }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const D = isReduced() ? 10 : 1600
        const step = (t) => {
          const p = Math.min(1, (t - start) / D)
          const eased = 1 - Math.pow(1 - p, 3)
          el.textContent = Math.round(eased * end) + (p === 1 ? suffix : '')
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [end, suffix])

  return (
    <div className="stat">
      <b ref={ref}>0</b>
      <span>{label[0]}<br />{label[1]}</span>
    </div>
  )
}

export function Stats() {
  return (
    <section>
      <div className="sec-head">
        <Reveal as="h2" className="sec-title">IN <em>numbers</em></Reveal>
        <Reveal className="sec-tag">PROOF</Reveal>
      </div>
      <Reveal className="stats">
        {STATS.map((s) => <Stat key={s.label[0]} {...s} />)}
      </Reveal>
    </section>
  )
}

export function Contact() {
  return (
    <section className="cta-sec" id="contact">
      <Reveal className="sec-tag">HAVE AN IDEA?</Reveal>
      <Reveal as="h2" className="cta-title">LET'S MAKE<br /><em>light move.</em></Reveal>
      <Reveal as="a" className="cta-mail" href="mailto:contact@blacklightmotions.com">
        CONTACT@BLACKLIGHTMOTIONS.COM
      </Reveal>
    </section>
  )
}

export function FloatingCta() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(scrollY > innerHeight * 0.7)
    addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => removeEventListener('scroll', onScroll)
  }, [])
  return (
    <a className={`fab${show ? ' show' : ''}`} href="#contact">
      <i /> START A PROJECT
    </a>
  )
}

export function Footer() {
  return (
    <footer>
      <div>© 2026 BLACKLIGHT MOTION</div>
      <div className="socials">
        <a href="https://instagram.com/itsjackcruise" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
        <a href="https://youtube.com/@theunsaidlores" target="_blank" rel="noopener noreferrer">YOUTUBE</a>
        <a href="tel:+918791907735">+91 87919 07735</a>
      </div>
    </footer>
  )
}
