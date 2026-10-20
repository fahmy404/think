'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { PortfolioVideo } from '@/content/videos';

let stopActiveVideo: (() => void) | null = null;
let activeVideoOwner: symbol | null = null;

function InteractiveVideo({ video, index }: { video: PortfolioVideo; index: number }) {
  const visualRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ownerRef = useRef(Symbol());
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const stop = useCallback((release = true) => {
    const element = videoRef.current;
    if (!element) return;
    element.pause();
    setIsPlaying(false);
    if (activeVideoOwner === ownerRef.current) {
      activeVideoOwner = null;
      stopActiveVideo = null;
    }
    if (release) {
      element.removeAttribute('src');
      element.load();
    }
  }, []);

  const play = useCallback(async () => {
    const element = videoRef.current;
    if (!element || !isVisible || document.hidden) return;
    if (stopActiveVideo && activeVideoOwner !== ownerRef.current) stopActiveVideo();
    activeVideoOwner = ownerRef.current;
    stopActiveVideo = stop;
    if (!element.getAttribute('src')) {
      element.setAttribute('src', video.src);
      element.load();
    }
    try {
      await element.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [isVisible, stop, video.src]);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual) return;
    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      setIsVisible(visible);
      if (!visible) stop(true);
    }, { threshold: 0.01 });
    const onVisibility = () => {
      if (document.hidden) stop(true);
    };
    observer.observe(visual);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      stop(true);
    };
  }, [stop]);

  return (
    <div
      ref={visualRef}
      className="video-showcase__visual"
      role="button"
      tabIndex={0}
      aria-label={`${isPlaying ? 'Pause' : 'Play'} ${video.client} ${video.title} video`}
      aria-pressed={isPlaying}
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') void play(); }}
      onPointerLeave={(event) => { if (event.pointerType === 'mouse') stop(true); }}
      onPointerDown={(event) => {
        if (event.pointerType === 'touch') touchStartRef.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={(event) => {
        if (event.pointerType === 'touch') {
          const start = touchStartRef.current;
          touchStartRef.current = null;
          if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) < 10) {
            if (isPlaying) stop(true);
            else void play();
          }
        }
      }}
      onPointerCancel={() => { touchStartRef.current = null; }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          if (isPlaying) stop(true);
          else void play();
        }
      }}
    >
      <video
        ref={videoRef}
        className="video-showcase__media"
        poster={video.poster}
        preload="none"
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <span className="video-showcase__frame" aria-hidden="true" />
      {!isPlaying && <span className="video-showcase__play" aria-hidden="true"><i /></span>}
      <span className="video-showcase__index">{String(index + 1).padStart(2, '0')}</span>
    </div>
  );
}

export function VideoShowcase({ videos }: { videos: PortfolioVideo[] }) {
  if (videos.length === 0) return null;

  return (
    <div className="video-showcase" aria-labelledby="video-showcase-title">
      <div className="video-showcase__head">
        <div>
          <p className="eyebrow">THINK in motion</p>
          <h3 id="video-showcase-title" className="video-showcase__title">Spaces, experienced.</h3>
        </div>
        <p className="video-showcase__note">A closer look at the details, scale and energy of each stand.</p>
      </div>
      <div className="video-showcase__grid">
        {videos.map((video, index) => (
          <motion.article
            key={video.slug}
            className="video-showcase__card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5 }}
          >
            <InteractiveVideo video={video} index={index} />
            <div className="video-showcase__caption">
              <div>
                <span className="video-showcase__client">{video.client}</span>
                <h4>{video.title}</h4>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
