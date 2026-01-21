import { useRef, useEffect } from 'react';
import './LiquidBackground.css';

// Pure CSS/Canvas liquid background - NOT WebGL
function LiquidBackground() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    // Throttled resize
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 100);
    };
    window.addEventListener('resize', handleResize);

    // Optimized render - runs at ~30fps
    const render = () => {
      time += 0.015; // Increased from 0.008 for more visible movement

      const w = canvas.width;
      const h = canvas.height;

      // Base gradient
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, '#fce8ec');
      gradient.addColorStop(0.5, '#faf8f5');
      gradient.addColorStop(1, '#d4e4c4');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Organic blobs - matcha green
      ctx.globalAlpha = 0.15;
      for (let i = 0; i < 5; i++) {
        const x = w * (0.2 + 0.15 * i + Math.sin(time + i) * 0.1);
        const y = h * (0.3 + Math.sin(time * 0.7 + i * 1.5) * 0.2);
        const r = 150 + Math.sin(time + i * 0.5) * 50;

        const blobGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
        blobGrad.addColorStop(0, 'rgba(142, 179, 122, 0.4)');
        blobGrad.addColorStop(1, 'rgba(142, 179, 122, 0)');

        ctx.fillStyle = blobGrad;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      }

      // Organic blobs - soft pink
      for (let i = 0; i < 4; i++) {
        const x = w * (0.6 + 0.1 * i + Math.cos(time * 0.8 + i) * 0.12);
        const y = h * (0.5 + Math.cos(time * 0.6 + i * 2) * 0.25);
        const r = 120 + Math.cos(time + i * 0.7) * 40;

        const blobGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
        blobGrad.addColorStop(0, 'rgba(245, 209, 216, 0.35)');
        blobGrad.addColorStop(1, 'rgba(245, 209, 216, 0)');

        ctx.fillStyle = blobGrad;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      }

      ctx.globalAlpha = 1;

      // Run at ~30fps for performance
      setTimeout(() => {
        animationId = requestAnimationFrame(render);
      }, 33);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="liquid-background" />;
}

export default LiquidBackground;
