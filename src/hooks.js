import { useEffect, useRef } from 'react'

export const isTouch = () =>
  matchMedia('(hover: none), (pointer: coarse)').matches
export const isReduced = () =>
  matchMedia('(prefers-reduced-motion: reduce)').matches

/* Adds .in-view once the element scrolls into the viewport */
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in-view')
          io.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

/* Fluid lerp scrolling: wrapper is fixed and translated, body keeps the height */
export function useSmoothScroll(ref) {
  useEffect(() => {
    if (isTouch() || isReduced()) {
      // still feed --scroll so parallax works with native scrolling
      const onScroll = () =>
        document.documentElement.style.setProperty('--scroll', String(scrollY))
      addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      return () => removeEventListener('scroll', onScroll)
    }
    const el = ref.current
    document.body.classList.add('js-smooth')

    const setH = () => {
      document.body.style.height = el.getBoundingClientRect().height + 'px'
    }
    setH()
    const ro = new ResizeObserver(setH)
    ro.observe(el)
    addEventListener('resize', setH)

    let current = 0
    let raf
    const loop = () => {
      const target = scrollY
      current += (target - current) * 0.07
      if (Math.abs(target - current) < 0.05) current = target
      el.style.transform = `translate3d(0,${-current}px,0)`
      document.documentElement.style.setProperty('--scroll', current.toFixed(1))
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      const t = document.querySelector(id)
      if (t) {
        e.preventDefault()
        const y = t.getBoundingClientRect().top + current - (id === '#top' ? 0 : 40)
        scrollTo({ top: y, behavior: 'auto' })
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      removeEventListener('resize', setH)
      document.removeEventListener('click', onClick)
      document.body.classList.remove('js-smooth')
      document.body.style.height = ''
      el.style.transform = ''
    }
  }, [ref])
}
