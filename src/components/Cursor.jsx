import { useEffect, useRef, useState } from 'react'
import { isReduced } from '../hooks'
import { focusFX, setFocusTarget } from '../fx'

const SPARK_COLORS = ['#bfe0ff', '#dff3ff', '#9fd4ff', '#7ad0ff']

function rgba(hex, a) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
}

/*
 * Desktop: dot + lerped ring + icy glow + a wand-trail of glowing sparks.
 * Touch:   just the spark trail, emitted under the moving finger.
 */
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const glow = useRef(null)
  const canvasRef = useRef(null)
  const [label, setLabel] = useState('PLAY')

  useEffect(() => {
    if (isReduced()) return
    // Show the full fluid cursor whenever a real pointer (mouse/trackpad)
    // exists — including touchscreen laptops / 2-in-1s, which a plain
    // isTouch() check wrongly treats as touch-only. Pure touch devices
    // (phones/tablets, no fine pointer) get the spark trail instead.
    const finePointer = matchMedia('(any-hover: hover) and (any-pointer: fine)').matches
    const touch = !finePointer
    if (finePointer) document.body.classList.add('has-cursor')

    const cv = canvasRef.current
    const ctx = cv.getContext('2d')
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      cv.width = innerWidth * dpr
      cv.height = innerHeight * dpr
      cv.style.width = innerWidth + 'px'
      cv.style.height = innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    addEventListener('resize', resize)

    const sparks = []
    const emit = (x, y, count, scatter) => {
      for (let i = 0; i < count; i++) {
        sparks.push({
          x: x + (Math.random() - 0.5) * scatter,
          y: y + (Math.random() - 0.5) * scatter,
          vx: (Math.random() - 0.5) * 1.3,
          vy: (Math.random() - 0.5) * 1.3 - 0.3,
          r: Math.random() * 1.7 + 0.7,
          life: 1,
          decay: Math.random() * 0.024 + 0.016,
          c: Math.random() < 0.1 ? '#e8c882' : SPARK_COLORS[(Math.random() * SPARK_COLORS.length) | 0],
        })
      }
      if (sparks.length > 280) sparks.splice(0, sparks.length - 280)
    }

    const drawSparks = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      ctx.globalCompositeOperation = 'lighter'
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.life -= s.decay
        if (s.life <= 0) { sparks.splice(i, 1); continue }
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.012
        const halo = s.r * 4 * (1 + (1 - s.life) * 0.8)
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, halo)
        g.addColorStop(0, rgba(s.c, 0.85 * s.life))
        g.addColorStop(0.35, rgba(s.c, 0.3 * s.life))
        g.addColorStop(1, rgba(s.c, 0))
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(s.x, s.y, halo, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let raf

    /* ---------------- TOUCH: finger-trail sparks only ---------------- */
    if (touch) {
      const onTouch = (e) => {
        const t = e.touches[0]
        if (t) emit(t.clientX, t.clientY, 3, 12)
      }
      addEventListener('touchstart', onTouch, { passive: true })
      addEventListener('touchmove', onTouch, { passive: true })
      const loop = () => { drawSparks(); raf = requestAnimationFrame(loop) }
      raf = requestAnimationFrame(loop)
      return () => {
        cancelAnimationFrame(raf)
        removeEventListener('resize', resize)
        removeEventListener('touchstart', onTouch)
        removeEventListener('touchmove', onTouch)
      }
    }

    /* ---------------- DESKTOP: full custom cursor ---------------- */
    let mx = innerWidth / 2, my = innerHeight / 2
    let tx = mx, ty = my, gx = mx, gy = my, px = mx, py = my

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`
      if (!ring.current.classList.contains('is-video')) emit(mx, my, 2, 8)
    }

    const loop = () => {
      tx += (mx - tx) * 0.16
      ty += (my - ty) * 0.16
      gx += (mx - gx) * 0.055
      gy += (my - gy) * 0.055
      const vx = tx - px, vy = ty - py
      px = tx; py = ty
      const stretch = Math.min(Math.hypot(vx, vy) / 36, 0.32)
      const ang = Math.atan2(vy, vx)
      ring.current.style.transform =
        `translate(${tx}px,${ty}px) translate(-50%,-50%) ` +
        `rotate(${ang}rad) scale(${1 + stretch},${1 - stretch}) rotate(${-ang}rad)`
      glow.current.style.transform = `translate(${gx}px,${gy}px) translate(-50%,-50%)`
      drawSparks()
      raf = requestAnimationFrame(loop)
    }

    const onOver = (e) => {
      const vid = e.target.closest?.('[data-cursor="video"]')
      const link = e.target.closest?.('a,button,.btn,.srv')
      ring.current.classList.toggle('is-video', !!vid && !link)
      ring.current.classList.toggle('is-link', !!link)
      if (vid && !link) {
        setLabel(vid.dataset.cursorLabel || 'PLAY')
        setFocusTarget(vid)
      } else {
        focusFX.active = false
      }
    }

    addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('mousemove', onMove)
      removeEventListener('resize', resize)
      document.removeEventListener('mouseover', onOver)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <canvas className="cursor-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="cursor-glow" ref={glow} aria-hidden="true" />
      <div className="cursor" ref={dot} aria-hidden="true" />
      <div className="cursor-trail" ref={ring} aria-hidden="true">
        <span>{label}</span>
      </div>
    </>
  )
}
