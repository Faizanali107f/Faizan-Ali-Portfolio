import { motion } from 'framer-motion';

interface TechCubeProps {
  label: string;
  color: string;
  delay?: number;
}

/** CSS 3D rotating cube showing a tech label on every face. */
const TechCube = ({ label, color, delay = 0 }: TechCubeProps) => {
  const size = 56;
  const half = size / 2;
  const faces = [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];

  return (
    <div style={{ perspective: 600, width: size, height: size }}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay }}
      >
        {faces.map((transform) => (
          <div
            key={transform}
            className="absolute inset-0 flex items-center justify-center rounded-xl glass-card shadow-2xl"
            style={{ transform, backfaceVisibility: 'hidden' }}
          >
            <span className="text-[10px] font-bold tracking-wider font-mono-tech" style={{ color }}>
              {label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechCube;