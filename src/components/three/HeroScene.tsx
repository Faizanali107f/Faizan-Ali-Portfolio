import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, TorusKnot } from '@react-three/drei';
import * as THREE from 'three';
import { useMotionProfile, usePageVisible } from '@/hooks/useMotionProfile';

const ParticleField = ({ count, interactive }: { count: number; interactive: boolean }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.04 + (interactive ? pointer.x * 0.2 : 0);
    ref.current.rotation.x = interactive ? pointer.y * 0.12 : 0;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#ec2b62" transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
};

const Shapes = () => (
  <>
    <Float speed={1.4} rotationIntensity={1.1} floatIntensity={1.4}>
      <TorusKnot args={[0.85, 0.22, 128, 24]} position={[-4.2, 1.2, -2]}>
        <meshStandardMaterial color="#ec2b62" roughness={0.25} metalness={0.75} wireframe />
      </TorusKnot>
    </Float>
    <Float speed={1.1} rotationIntensity={0.9} floatIntensity={1.8}>
      <Icosahedron args={[0.9, 0]} position={[4.4, -1.4, -3]}>
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.6} wireframe />
      </Icosahedron>
    </Float>
    <Float speed={0.9} rotationIntensity={1.4} floatIntensity={1.2}>
      <mesh position={[2.6, 2.2, -4]}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial color="#ec2b62" wireframe />
      </mesh>
    </Float>
  </>
);

/** Static, GPU-free stand-in used when motion is reduced or the device is very weak. */
const StaticBackdrop = () => (
  <div className="absolute inset-0 -z-0 pointer-events-none" aria-hidden="true">
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-primary/[0.07] blur-[120px] rounded-full" />
  </div>
);

const HeroScene = () => {
  const { tier, dpr, particleCount, showShapes } = useMotionProfile();
  const visible = usePageVisible();

  if (tier === 'off') return <StaticBackdrop />;

  return (
    <div className="absolute inset-0 -z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={dpr}
        frameloop={visible ? 'always' : 'never'}
        gl={{ antialias: tier === 'full', alpha: true, powerPreference: tier === 'full' ? 'high-performance' : 'low-power' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[6, 6, 6]} intensity={40} color="#ec2b62" />
        {showShapes && <pointLight position={[-6, -4, 4]} intensity={20} color="#ffffff" />}
        <Suspense fallback={null}>
          <ParticleField count={particleCount} interactive={tier === 'full'} />
          {showShapes && <Shapes />}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
