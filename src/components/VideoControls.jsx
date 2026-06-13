import { useEffect, useState } from 'react'

const PlayIcon = () => (
  <svg viewBox="0 0 12 12" width="11" height="11"><path d="M3 1.6l7 4.4-7 4.4z" fill="currentColor" /></svg>
)
const PauseIcon = () => (
  <svg viewBox="0 0 12 12" width="11" height="11"><path d="M2.5 1.5h2.4v9H2.5zM7.1 1.5h2.4v9H7.1z" fill="currentColor" /></svg>
)
const SoundIcon = () => (
  <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M1.2 4.2h1.9L6 1.8v8.4L3.1 7.8H1.2z" fill="currentColor" stroke="none" />
    <path d="M8 3.6a3.4 3.4 0 010 4.8M9.6 2.2a5.6 5.6 0 010 7.6" strokeLinecap="round" />
  </svg>
)
const MutedIcon = () => (
  <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M1.2 4.2h1.9L6 1.8v8.4L3.1 7.8H1.2z" fill="currentColor" stroke="none" />
    <path d="M8 4.4l3 3.2M11 4.4L8 7.6" strokeLinecap="round" />
  </svg>
)
const FullIcon = () => (
  <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <path d="M1.2 4.4V1.2h3.2M7.6 1.2h3.2v3.2M10.8 7.6v3.2H7.6M4.4 10.8H1.2V7.6" />
  </svg>
)

/*
 * Glassy control pill: play/pause, sound, fullscreen.
 * `mediaKey` re-binds listeners when the underlying <video> remounts.
 */
export default function VideoControls({ videoRef, containerRef, mediaKey = 0, onUserPause }) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = muted
    setPlaying(!v.paused)
    const on = () => setPlaying(true)
    const off = () => setPlaying(false)
    v.addEventListener('play', on)
    v.addEventListener('pause', off)
    return () => {
      v.removeEventListener('play', on)
      v.removeEventListener('pause', off)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaKey])

  const togglePlay = (e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (v.paused) {
      onUserPause?.(false)
      v.play().catch(() => {})
    } else {
      onUserPause?.(true)
      v.pause()
    }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    const v = videoRef.current
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const toggleFullscreen = (e) => {
    e.stopPropagation()
    const el = containerRef.current
    const v = videoRef.current
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      (document.exitFullscreen || document.webkitExitFullscreen)?.call(document)
    } else if (el?.requestFullscreen) {
      el.requestFullscreen()
    } else if (el?.webkitRequestFullscreen) {
      el.webkitRequestFullscreen()
    } else if (v?.webkitEnterFullscreen) {
      // iOS Safari: only the <video> element can go fullscreen
      v.webkitEnterFullscreen()
    }
  }

  return (
    <div className="vid-controls" onClick={(e) => e.stopPropagation()}>
      <button type="button" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button type="button" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
        {muted ? <MutedIcon /> : <SoundIcon />}
      </button>
      <button type="button" onClick={toggleFullscreen} aria-label="Fullscreen">
        <FullIcon />
      </button>
    </div>
  )
}
