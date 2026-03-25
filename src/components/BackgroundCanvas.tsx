import { useEffect, useRef } from 'react';

type AuroraBlob = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  wanderRadiusX: number;
  wanderRadiusY: number;
  wanderSpeedX: number;
  wanderSpeedY: number;
  wanderOffsetX: number;
  wanderOffsetY: number;
  radius: number;
  colorInner: string;
  colorOuter: string;
  breatheSpeed: number;
  breatheAmount: number;
  breatheOffset: number;
};

type Ember = {
  x: number;
  y: number;
  baseX: number;
  size: number;
  opacity: number;
  maxOpacity: number;
  riseSpeed: number;
  swaySpeed: number;
  swayAmount: number;
  swayOffset: number;
  life: number;
  lifeSpeed: number;
  color: string;
};

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  width: number;
  life: number;
  decay: number;
};

function initEffects(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): () => void {
  const blobs: AuroraBlob[] = [
    {
      baseX: canvas.width * 0.78,
      baseY: canvas.height * 0.18,
      x: canvas.width * 0.78,
      y: canvas.height * 0.18,
      wanderRadiusX: 120,
      wanderRadiusY: 90,
      wanderSpeedX: 0.00035,
      wanderSpeedY: 0.00028,
      wanderOffsetX: 0,
      wanderOffsetY: 1.2,
      radius: canvas.width * 0.38,
      colorInner: 'rgba(255, 77, 0, 0.13)',
      colorOuter: 'rgba(255, 77, 0, 0)',
      breatheSpeed: 0.00045,
      breatheAmount: 0.08,
      breatheOffset: 0,
    },
    {
      baseX: canvas.width * 0.18,
      baseY: canvas.height * 0.78,
      x: canvas.width * 0.18,
      y: canvas.height * 0.78,
      wanderRadiusX: 100,
      wanderRadiusY: 130,
      wanderSpeedX: 0.00028,
      wanderSpeedY: 0.00022,
      wanderOffsetX: 2.1,
      wanderOffsetY: 0.7,
      radius: canvas.width * 0.32,
      colorInner: 'rgba(196, 58, 0, 0.11)',
      colorOuter: 'rgba(196, 58, 0, 0)',
      breatheSpeed: 0.00038,
      breatheAmount: 0.07,
      breatheOffset: 1.8,
    },
    {
      baseX: canvas.width * 0.42,
      baseY: canvas.height * 0.45,
      x: canvas.width * 0.42,
      y: canvas.height * 0.45,
      wanderRadiusX: 80,
      wanderRadiusY: 70,
      wanderSpeedX: 0.00020,
      wanderSpeedY: 0.00031,
      wanderOffsetX: 4.3,
      wanderOffsetY: 2.9,
      radius: canvas.width * 0.25,
      colorInner: 'rgba(255, 120, 20, 0.07)',
      colorOuter: 'rgba(255, 120, 20, 0)',
      breatheSpeed: 0.00055,
      breatheAmount: 0.09,
      breatheOffset: 3.4,
    },
  ];

  function drawBlob(ctx: CanvasRenderingContext2D, blob: AuroraBlob, time: number) {
    blob.x = blob.baseX + Math.sin(time * blob.wanderSpeedX + blob.wanderOffsetX) * blob.wanderRadiusX;
    blob.y = blob.baseY + Math.sin(time * blob.wanderSpeedY + blob.wanderOffsetY) * blob.wanderRadiusY;

    const breathe = 1 + Math.sin(time * blob.breatheSpeed + blob.breatheOffset) * blob.breatheAmount;
    const currentRadius = blob.radius * breathe;
    
    if (currentRadius <= 0) return;

    const gradient = ctx.createRadialGradient(
      blob.x, blob.y, 0,
      blob.x, blob.y, currentRadius
    );
    gradient.addColorStop(0, blob.colorInner);
    gradient.addColorStop(0.4, blob.colorInner.replace(/[\d.]+\)$/, '0.06)'));
    gradient.addColorStop(1, blob.colorOuter);

    ctx.beginPath();
    ctx.arc(blob.x, blob.y, currentRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  function createEmber(W: number, H: number, randomY = false): Ember {
    const colors = [
      'rgba(255, 77, 0, OPACITY)',
      'rgba(255, 120, 30, OPACITY)',
      'rgba(255, 160, 60, OPACITY)',
      'rgba(255, 200, 80, OPACITY)',
    ];

    const colorWeights = [0.45, 0.30, 0.18, 0.07];
    const rand = Math.random();
    let colorIndex = 0;
    let cumulative = 0;
    for (let i = 0; i < colorWeights.length; i++) {
      cumulative += colorWeights[i];
      if (rand < cumulative) { colorIndex = i; break; }
    }

    return {
      x: Math.random() * W,
      baseX: Math.random() * W,
      y: randomY ? Math.random() * H : H + 10,
      size: 0.8 + Math.random() * 1.7,
      opacity: 0,
      maxOpacity: 0.08 + Math.random() * 0.18,
      riseSpeed: 0.5 + Math.random() * 0.7,
      swaySpeed: 0.0008 + Math.random() * 0.0012,
      swayAmount: 15 + Math.random() * 35,
      swayOffset: Math.random() * Math.PI * 2,
      life: 0,
      lifeSpeed: 0.0025 + Math.random() * 0.0025,
      color: colors[colorIndex],
    };
  }

  const isMobile = window.innerWidth < 768;
  const emberCount = isMobile ? 18 : 28;
  const embers: Ember[] = Array.from({ length: emberCount }, () =>
    createEmber(canvas.width, canvas.height, true)
  );

  function updateAndDrawEmber(
    ctx: CanvasRenderingContext2D,
    ember: Ember,
    time: number,
    W: number,
    H: number
  ) {
    ember.life += ember.lifeSpeed;

    if (ember.life < 0.2) {
      ember.opacity = (ember.life / 0.2) * ember.maxOpacity;
    } else if (ember.life < 0.7) {
      ember.opacity = ember.maxOpacity;
    } else {
      ember.opacity = ((1 - ember.life) / 0.3) * ember.maxOpacity;
    }

    ember.y -= ember.riseSpeed;
    ember.x = ember.baseX + Math.sin(time * ember.swaySpeed + ember.swayOffset) * ember.swayAmount;

    if (ember.opacity > 0) {
      const colorWithOpacity = ember.color.replace('OPACITY', String(ember.opacity));
      const glowColor = ember.color.replace('OPACITY', String(ember.opacity * 0.3));

      ctx.beginPath();
      ctx.arc(ember.x, ember.y, ember.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = glowColor;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
      ctx.fillStyle = colorWithOpacity;
      ctx.fill();
    }

    if (ember.life >= 1 || ember.y < -20) {
      Object.assign(ember, createEmber(W, H, false));
    }
  }

  function createStar(W: number, H: number): Star {
    const fromLeft = Math.random() > 0.5;
    const speed = 2 + Math.random() * 2.5; 
    const angle = (-35 + Math.random() * 20) * (Math.PI / 180);

    return {
      x: fromLeft ? -50 : Math.random() * W,
      y: fromLeft ? Math.random() * H * 0.7 : H + 50,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length: 120 + Math.random() * 150,
      opacity: 0.12 + Math.random() * 0.15,
      width: 0.6 + Math.random() * 0.8,
      life: 1.0,
      decay: 0.0015 + Math.random() * 0.0015,
    };
  }

  const starCount = isMobile ? 1 : 3;
  const stars: Star[] = Array.from({ length: starCount }, () =>
    createStar(canvas.width, canvas.height)
  );

  function drawStar(ctx: CanvasRenderingContext2D, star: Star) {
    if (star.life <= 0) return;
    const tailX = star.x - star.vx * (star.length / 6);
    const tailY = star.y - star.vy * (star.length / 6);

    const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
    gradient.addColorStop(0, `rgba(255, 140, 60, ${star.opacity * star.life})`);
    gradient.addColorStop(0.3, `rgba(255, 77, 0, ${star.opacity * star.life * 0.5})`);
    gradient.addColorStop(1, `rgba(255, 77, 0, 0)`);

    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(tailX, tailY);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = star.width;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.width * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 200, 100, ${star.opacity * star.life * 1.2})`;
    ctx.fill();
  }

  function updateStar(star: Star, W: number, H: number) {
    star.x += star.vx;
    star.y += star.vy;
    star.life -= star.decay;

    if (star.life <= 0 || star.x > W + 100 || star.y < -100) {
      Object.assign(star, createStar(W, H));
      star.life = 0.3 + Math.random() * 0.7;
    }
  }

  let animId: number;
  let lastTime = 0;

  function animate(timestamp: number) {
    animId = requestAnimationFrame(animate);

    if (timestamp - lastTime < 16.67) return;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const W = canvas.width;
    const H = canvas.height;

    blobs.forEach(blob => drawBlob(ctx, blob, timestamp));

    embers.forEach(ember =>
      updateAndDrawEmber(ctx, ember, timestamp, W, H)
    );

    stars.forEach(star => {
      updateStar(star, W, H);
      drawStar(ctx, star);
    });
  }

  animId = requestAnimationFrame(animate);

  const handleResize = () => {
    const oldW = canvas.width;
    const oldH = canvas.height;
    
    // Safety check against instantaneous redundant fires
    if (window.innerWidth === oldW && window.innerHeight === oldH) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    blobs.forEach(blob => {
      blob.baseX = (blob.baseX / oldW) * canvas.width;
      blob.baseY = (blob.baseY / oldH) * canvas.height;
      blob.x = blob.baseX;
      blob.y = blob.baseY;
      blob.radius = canvas.width * (blob === blobs[0] ? 0.38 : blob === blobs[1] ? 0.32 : 0.25);
    });
  };

  window.addEventListener('resize', handleResize);

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', handleResize);
  };
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Run initial dimensional scale
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cleanup = initEffects(canvas, ctx);

    return () => {
      cleanup();
    };
  }, []);

  return (
    <canvas
      className="bg-canvas"
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
