'use client';

import Image from 'next/image';
import Link from 'next/link';
import ReactLenis from 'lenis/react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { ImageAsset, Project } from '@/content/types';

type StickyProjectCardProps = {
  project: Project;
  image: ImageAsset;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
};

export function LazyLoopingVideo({ project, className = 'images-scroll__media' }: { project: Project; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !project.video) return;

    let isVisible = false;
    const playWhenReady = () => {
      if (!isVisible || document.hidden) return;
      if (!video.src) {
        video.src = project.video!.src;
        video.load();
      }
      void video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) playWhenReady();
      else video.pause();
    }, { threshold: 0.25, rootMargin: '120px 0px' });
    const handleVisibility = () => {
      if (document.hidden) video.pause();
      else playWhenReady();
    };

    observer.observe(video);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      video.pause();
    };
  }, [project.video]);

  if (!project.video) return null;

  return (
    <video
      ref={videoRef}
      className={className}
      poster={project.video.poster.src}
      preload="none"
      muted
      loop
      playsInline
      aria-label={`${project.client} project film`}
    />
  );
}

function StickyProjectCard({ project, image, index, progress, range, targetScale }: StickyProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const scale = useTransform(progress, range, [1, targetScale]);
  const titleIsClient = project.name.toLowerCase().includes(project.client.split(/\s+/)[0].toLowerCase());
  const eventName = project.year ? project.name.replace(new RegExp(`\\s*${project.year}\\s*$`), '') : project.name;

  return (
    <div className="images-scroll__sticky">
      <motion.article
        className="images-scroll__card"
        style={{ scale: reducedMotion ? 1 : scale, top: `calc(8vh + ${index * 7}px)` }}
      >
        <Link href={`/work/${project.slug}`} className="images-scroll__link" aria-label={`View ${project.name} for ${project.client}`}>
          <div className="images-scroll__visual">
            {project.video ? (
              <LazyLoopingVideo project={project} />
            ) : (
              <Image
                className="images-scroll__media"
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 700px) 92vw, 500px"
                quality={95}
                priority={index === 0}
              />
            )}
            <span className="images-scroll__frame" aria-hidden="true" />
            <div className="images-scroll__caption">
              <span className="images-scroll__client">{project.client}</span>
              {!titleIsClient && <span className="images-scroll__title">{eventName}</span>}
              <span className="images-scroll__category">{project.category}{project.year ? ` · ${project.year}` : ''}</span>
            </div>
            <span className="images-scroll__index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          </div>
        </Link>
      </motion.article>
    </div>
  );
}

export function ImagesScrollingAnimation({ projects, includeGallery = false }: { projects: Project[]; includeGallery?: boolean }) {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  if (projects.length === 0) return null;

  const cards = projects.flatMap((project) => [
    { project, image: project.cover, key: `${project.slug}-cover` },
    ...(includeGallery ? (project.gallery ?? []).map((image, viewIndex) => ({ project, image, key: `${project.slug}-gallery-${viewIndex}` })) : []),
  ]);

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <section ref={container} className="images-scroll" aria-label="Selected completed projects">
        {cards.map(({ project, image }, index) => {
          const targetScale = Math.max(0.6, 1 - (cards.length - index - 1) * 0.08);
          const range: [number, number] = [index / Math.max(cards.length - 1, 1), 1];
          return (
            <StickyProjectCard
              key={cards[index].key}
              project={project}
              image={image}
              index={index}
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
            />
          );
        })}
      </section>
    </ReactLenis>
  );
}
