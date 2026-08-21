import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMotionProfile } from '@/hooks/useMotionProfile';

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

/** Wraps content in a mouse-reactive 3D tilt with parallax depth. */
const Tilt3D = ({ children, className = '', intensity = 10 }: Tilt3DProps) => {
  const { tier } = useMotionProfile();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  // Touch / low-power / reduced-motion devices skip the tilt entirely (no transforms, no springs).
  if (tier !== 'full') {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={reset} style={{ perspective: 1000 }} className={className}>
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
};

export default Tilt3D;