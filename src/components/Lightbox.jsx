import { useEffect, useRef, useState } from "react";
import { mediaOf, posterOf, thumbOf } from "../data/work.js";
import Icon from "./Icon.jsx";

export default function Lightbox({ item, onClose, onStart }) {
  const dialogRef = useRef(null);
  const videoRef = useRef(null);
  // Spinner until the video actually plays (or the embed has loaded).
  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(true), [item]);

  // Open / close the native <dialog> to match `item`.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  // Attach the HLS stream. hls.js is only downloaded when an HLS video is opened.
  useEffect(() => {
    const video = videoRef.current;
    if (!item?.hls || !video) return;

    // Prefer hls.js (MSE); fall back to native HLS where MSE is missing (e.g. iOS Safari).
    const src = mediaOf(item, item.hls);
    let hls;
    let cancelled = false;
    import("hls.js").then(({ default: Hls }) => {
      if (cancelled) return;
      if (!Hls.isSupported()) {
        video.src = src;
        return;
      }
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    });
    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [item]);

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label="Video player"
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
    >
      <button className="close" type="button" aria-label="Close" onClick={onClose}>
        &times;
      </button>
      {item && (
        <>
          <div className={`player${item.ratio === "9:16" ? " is-vertical" : ""}`}>
            {item.instagram ? (
              <div className={`ig-wrap${loading ? " is-loading" : ""}`}>
                <img className="ig-poster" src={thumbOf(item)} alt="" />
                <iframe
                  className="ig-embed"
                  src={`https://www.instagram.com/reel/${item.instagram}/embed/`}
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={item.title}
                  onLoad={() => setLoading(false)}
                />
              </div>
            ) : item.youtube ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${item.youtube}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                title={item.title}
                onLoad={() => setLoading(false)}
              />
            ) : (
              <video
                key={item.id}
                ref={videoRef}
                src={item.full ? mediaOf(item, item.full) : undefined}
                poster={posterOf(item)}
                controls
                autoPlay
                playsInline
                onPlaying={() => setLoading(false)}
                onWaiting={() => setLoading(true)}
                onCanPlay={() => setLoading(false)}
              />
            )}
            {loading && <span className="spinner" role="status" aria-label="Loading video" />}
          </div>
          <div className="lightbox-foot">
            <p className="caption">
              {item.title} — {item.kind}
            </p>
            {item.id !== "sizzle" && (
              <button type="button" className="btn btn-primary btn-sm" onClick={() => onStart(item)}>
                Want a video like this? <Icon name="arrow" size={14} />
              </button>
            )}
          </div>
        </>
      )}
    </dialog>
  );
}
