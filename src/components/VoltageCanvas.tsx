import { useEffect, useRef } from 'react';
import { initVoltageScene } from '../three/voltageScene';

export default function VoltageCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const cleanup = initVoltageScene(canvasRef.current);
    return cleanup;
  }, []);

  return (
    <div className="w-full h-full min-h-[420px] relative">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
