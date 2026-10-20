'use client';

import { useEffect, useRef } from 'react';

/** Lightweight animated dot mesh for the THINK hero. */
export function WaveField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true, desynchronized: true });
    if (!canvas || !context) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    }, { threshold: 0 });

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastFrame = 0;
    let inView = true;
    let isRunning = false;
    let time = 0;

    const draw = (timestamp: number) => {
      if (!isRunning) return;
      if (motionPreference.matches) isRunning = false;
      else frame = window.requestAnimationFrame(draw);
      if (!motionPreference.matches && timestamp - lastFrame < 40) return;
      lastFrame = timestamp;
      if (!motionPreference.matches) time += 0.018;

      context.clearRect(0, 0, width, height);
      const stepX = width < 640 ? 15 : 17;
      const stepY = width < 640 ? 13 : 14;
      const columns = Math.ceil(width / stepX) + 3;
      const rows = Math.ceil(height / stepY);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      context.fillStyle = 'rgb(218, 215, 207)';

      for (let row = 0; row < rows; row += 1) {
        const progress = row / Math.max(1, rows - 1);
        const fade = Math.max(0, Math.min(1, (progress - 0.14) * 2.1));
        const dotPaths = [new Path2D(), new Path2D(), new Path2D()];
        for (let column = 0; column < columns; column += 1) {
          const seed = column * 127.1 + row * 311.7;
          const noiseX = Math.sin(seed) * 43758.5453;
          const jitterX = (noiseX - Math.floor(noiseX) - 0.5) * stepX * 0.8;
          const noiseY = Math.sin(seed + 74.7) * 24634.6345;
          const jitterY = (noiseY - Math.floor(noiseY) - 0.5) * stepY * 0.8;
          const x = column * stepX + (row % 2) * stepX * 0.5 - stepX + jitterX;
          const broadWave = Math.sin(x * 0.003 + time + row * 0.19) * height * 0.15;
          const fineWave = Math.sin(x * 0.008 - time * 0.72 + row * 0.31) * height * 0.04;
          const y = progress * height + jitterY + (broadWave + fineWave) * fade;
          const crest = (Math.sin(x * 0.004 + time * 0.8 + row * 0.12) + 1) * 0.5;
          const noiseSize = Math.sin(seed + 213.4) * 7351.124;
          const radius = (0.55 + crest * 0.28 + (noiseSize - Math.floor(noiseSize)) * 0.25) * dpr;
          const noiseBrightness = Math.sin(seed + 513.2) * 9164.836;
          const brightness = Math.floor((noiseBrightness - Math.floor(noiseBrightness)) * dotPaths.length);
          // Start a separate sub-path for every particle; otherwise Canvas connects
          // consecutive arcs with straight edges and fills them as a faceted mesh.
          dotPaths[brightness].moveTo(x + radius, y);
          dotPaths[brightness].arc(x, y, radius, 0, Math.PI * 2);
        }
        dotPaths.forEach((path, index) => {
          context.globalAlpha = fade * (0.1 + index * 0.08);
          context.fill(path);
        });
      }
      context.globalAlpha = 1;
    };

    const start = () => {
      if (isRunning || !inView || document.hidden) return;
      isRunning = true;
      frame = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      isRunning = false;
      window.cancelAnimationFrame(frame);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastFrame = 0;
      start();
    };

    const handleVisibility = () => document.hidden ? stop() : start();
    const handleMotionPreference = () => { time = 0; lastFrame = 0; stop(); start(); };

    resize();
    visibility.observe(canvas);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    document.addEventListener('visibilitychange', handleVisibility);
    motionPreference.addEventListener('change', handleMotionPreference);
    start();

    return () => {
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      motionPreference.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__wave" aria-hidden="true" />;
}
