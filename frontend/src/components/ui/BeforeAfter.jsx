import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '../../lib/utils';

export default function BeforeAfter({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e) => {
      e.preventDefault();
      updatePosition(e.clientX);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden select-none touch-none",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className
      )}
      onPointerDown={handlePointerDown}
    >
      {/* Before Image */}
      <img
        src={beforeImage}
        alt={beforeLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      
      {/* After Image */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      />

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-dark/60 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
        {beforeLabel}
      </div>
      
      <div className="absolute top-4 right-4 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full pointer-events-none shadow-md">
        <span>AI Virtual Try-On - {afterLabel}</span>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-text-secondary text-[10px] gap-1 z-10 pointer-events-auto">
          <span>◄</span>
          <span>►</span>
        </div>
      </div>
    </div>
  );
}
