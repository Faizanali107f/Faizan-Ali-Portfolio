import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const touch = window.matchMedia('(hover: none)').matches;
    setIsTouch(touch);
    if (touch) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]')) {
        setIsHovering(true);
      }
    };
    const out = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]')) {
        setIsHovering(false);
      }
    };
    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    document.documentElement.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouch) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        aria-hidden
        style={{ translateX: ringX, translateY: ringY, opacity: isVisible ? 1 : 0 }}
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          marginLeft: isHovering ? -28 : -16,
          marginTop: isHovering ? -28 : -16,
          backgroundColor: isHovering ? 'hsl(var(--primary) / 0.25)' : 'hsl(var(--primary) / 0)',
          borderColor: isHovering ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.7)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border-2 backdrop-blur-[1px] hidden md:block"
      />
      {/* Inner dot */}
      <motion.div
        aria-hidden
        style={{ translateX: cursorX, translateY: cursorY, opacity: isVisible ? 1 : 0 }}
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 400 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))] hidden md:block"
      />
    </>
  );
};

export default CustomCursor;