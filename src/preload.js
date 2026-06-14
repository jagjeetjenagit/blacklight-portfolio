// Video preloading helpers.
//
// We preload through real <video> elements (not fetch) so the browser uses
// the same range-request path the on-page <video> will use — the warmed data
// is served from cache with no double download and no cache-mode errors.
// Resolves on canplaythrough / error / timeout (never rejects), so the
// preloader can't get stuck on one slow or missing file.

export function preloadVideo(url, onProgress, timeout = 20000) {
  return new Promise((resolve) => {
    const v = document.createElement('video')
    v.muted = true
    v.preload = 'auto'
    v.playsInline = true

    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      onProgress?.(1)
      clearTimeout(timer)
      // detach so the hidden element is freed; the HTTP cache keeps the data
      v.removeAttribute('src')
      v.load()
      resolve()
    }

    // "canplay" = enough buffered to start (loops keep buffering after) —
    // much faster to fire than canplaythrough, so the loader doesn't stall
    v.addEventListener('canplay', finish, { once: true })
    v.addEventListener('error', finish, { once: true })
    v.addEventListener('progress', () => {
      try {
        if (v.duration && v.buffered.length) {
          onProgress?.(Math.min(v.buffered.end(v.buffered.length - 1) / v.duration, 1))
        }
      } catch { /* buffered can throw mid-load */ }
    })

    const timer = setTimeout(finish, timeout)
    v.src = url
    v.load()
  })
}

// Preload an image (poster thumbnail). Resolves on load or error.
export function preloadImage(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = img.onerror = () => resolve()
    img.src = url
  })
}

// Warm a list of videos one at a time in the background (after the site has
// already revealed) so they're cached by the time the user scrolls to them,
// without saturating bandwidth up front.
export async function prefetchSequential(urls) {
  for (const url of urls) {
    await preloadVideo(url)
  }
}
