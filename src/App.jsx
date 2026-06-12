import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { useSmoothScroll, isTouch, isReduced } from './hooks'
import Cursor from './components/Cursor'

const Particles = lazy(() => import('./components/Particles'))
import Preloader from './components/Preloader'
import Showreel from './components/Showreel'
import WorkGrid from './components/WorkGrid'
import { Nav, Hero, Marquee, Services, Stats, Contact, Footer, FloatingCta } from './components/Sections'

export default function App() {
  const smoothRef = useRef(null)
  const [, setLoaded] = useState(false)
  const [particles, setParticles] = useState(false)
  useSmoothScroll(smoothRef)

  useEffect(() => {
    setParticles(!isReduced() && !(isTouch() && innerWidth < 760))
  }, [])

  const onPreloadComplete = useCallback(() => {
    document.body.classList.add('loaded')
    setLoaded(true)
  }, [])

  return (
    <>
      <Preloader onComplete={onPreloadComplete} />
      <Cursor />
      <div className="ambient" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      {particles && (
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      )}
      <Nav />
      <FloatingCta />
      <div className="smooth" ref={smoothRef}>
        <Hero />
        <Marquee />
        <Showreel />
        <WorkGrid />
        <Services />
        <Stats />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
