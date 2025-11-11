'use client';

import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  glowColor?: string;
  enableTilt?: boolean;
}

export function Card3D({
  children,
  className,
  intensity = 'medium',
  glowColor = 'rgba(139, 92, 246, 0.3)',
  enableTilt = true,
}: Card3DProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const intensityMap = {
    low: { rotate: 5, scale: 1.01, shadow: 15 },
    medium: { rotate: 10, scale: 1.03, shadow: 25 },
    high: { rotate: 15, scale: 1.05, shadow: 35 },
  };

  const { rotate, scale, shadow } = intensityMap[intensity];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -rotate;
    const rotateYValue = ((x - centerX) / centerX) * rotate;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={cn(
        'card-3d card-3d-shadow glass-3d preserve-3d',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      whileHover={{
        scale,
        boxShadow: `0 ${shadow}px 50px -12px rgba(0, 0, 0, 0.25), 0 0 60px ${glowColor}`,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}

export function Button3D({
  children,
  className,
  onClick,
  variant = 'primary',
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
}) {
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground glow-3d',
    secondary: 'bg-secondary text-secondary-foreground depth-3',
    outline: 'border-2 border-primary/40 bg-background/80 depth-2',
  };

  return (
    <motion.button
      className={cn(
        'btn-3d preserve-3d rounded-xl px-6 py-3 font-semibold',
        variantStyles[variant],
        className
      )}
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        y: -4,
      }}
      whileTap={{
        scale: 0.98,
        y: -1,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 15,
      }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

export function FloatingCard({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn('float-3d depth-4 preserve-3d', className)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxLayer({
  children,
  className,
  layer = 1,
}: {
  children: ReactNode;
  className?: string;
  layer?: 1 | 2 | 3;
}) {
  return (
    <div
      className={cn(
        'preserve-3d',
        layer === 1 && 'layer-1',
        layer === 2 && 'layer-2',
        layer === 3 && 'layer-3',
        className
      )}
    >
      {children}
    </div>
  );
}
