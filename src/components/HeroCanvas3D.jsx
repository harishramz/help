import React, { useEffect, useRef } from 'react';

/**
 * Lightweight 3D-projected ambient particle & organic depth field for the Hero section.
 * Automatically disables animation on reduced-motion or narrow mobile screens for optimal performance.
 */
export default function HeroCanvas3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D coordinates (x, y, z)
    const particles = Array.from({ length: 36 }, () => ({
      x: (Math.random() - 0.5) * width * 1.4,
      y: (Math.random() - 0.5) * height * 1.4,
      z: Math.random() * 900 + 100,
      size: Math.random() * 3.5 + 1.8,
      speedZ: Math.random() * 0.45 + 0.2,
      drift: Math.random() * Math.PI * 2
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const fov = 420;

      for (const p of particles) {
        p.z -= p.speedZ;
        p.drift += 0.008;
        if (p.z <= 40) {
          p.z = 950;
          p.x = (Math.random() - 0.5) * width * 1.4;
          p.y = (Math.random() - 0.5) * height * 1.4;
        }

        const scale = fov / (fov + p.z);
        const sx = cx + (p.x + Math.sin(p.drift) * 18) * scale;
        const sy = cy + (p.y + Math.cos(p.drift) * 14) * scale;
        const radius = Math.max(0.8, p.size * scale);
        const alpha = Math.min(0.45, (1 - p.z / 1000) * 0.55);

        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 185, 161, ${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas-3d" aria-hidden="true" />;
}
