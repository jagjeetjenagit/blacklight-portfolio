import { useEffect, useRef, useState } from 'react'
import { isTouch, isReduced } from '../hooks'
import { focusFX } from '../fx'

const SPARK_COLORS = ['#bfe0ff', '#dff3ff', '#9fd4ff', '#7ad0ff']

function rgba(hex, a) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
}

/*
 * Four layers:
 *  - dot: pinned to the pointer
 *  - ring: lerped trail that stretches with velocity, morphs into a
 *    "PLAY" disc over videos and a solid disc over links
 *  - glow: slow icy halo dragging behind
 *  - canvas: wand-trail of glowing sparks that scatter and fade
 *    (suppressed while hovering videos so footage stays clean)
 */
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const glow = useRef(null)
  const canvasRef = useRef(null)
  const [label, setLabel] = useState('PLAY')

  useEffect(() => {
    if (isTouch() || isReduced()) return
    document.body.classList.add('has-cursor')

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

    let mx = innerWidth / 2, my = innerHeight / 2
    let tx = mx, ty = my, gx = mx, gy = my, px = mx, py = my
    let raf
    const sparks = []

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`
      if (!ring.current.classList.contains('is-video')) {
        for (let i = 0; i < 2; i++) {
          sparks.push({
            x: mx + (Math.random() - 0.5) * 8,
            y: my + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 1.3,
            vy: (Math.random() - 0.5) * 1.3 - 0.3,
            r: Math.random() * 1.7 + 0.7,
            life: 1,
            decay: Math.random() * 0.024 + 0.016,
            c: Math.random() < 0.1 ? '#e8c882' : SPARK_COLORS[(Math.random() * SPARK_COLORS.length) | 0],
          })
        }
        if (sparks.length > 240) sparks.splice(0, sparks.length - 240)
      }
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
      raf = requestAnimationFrame(loop)
    }

    const onOver = (e) => {
      const vid = e.target.closest?.('[data-cursor="video"]')
      const link = e.target.closest?.('a,button,.btn,.srv')
      ring.current.classList.toggle('is-video', !!vid && !link)
      ring.current.classList.toggle('is-link', !!link || (!vid && false))
      if (vid) {
        setLabel(vid.dataset.cursorLabel || 'PLAY')
        const r = vid.getBoundingClientRect()
        focusFX.nx = ((r.left + r.width / 2) / innerWidth) * 2 - 1
        focusFX.ny = -(((r.top + r.height / 2) / innerHeight) * 2 - 1)
        focusFX.rw = r.width / innerWidth
        focusFX.rh = r.height / innerHeight
      }
      focusFX.active = !!vid
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
