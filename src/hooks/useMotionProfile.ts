import { useEffect, useState } from 'react';

export type MotionTier = 'full' | 'reduced' | 'off';

export interface MotionProfile {
  /** User asked for less motion via OS setting. */
  prefersReducedMotion: boolean;
  /** Device looks low powered (few cores, little RAM, data saver, small touch screen). */
  isLowPower: boolean;
  /** Rendering budget tier for the WebGL hero. */
  tier: MotionTier;
  /** Max device pixel ratio to render at. */
  dpr: [number, number];
  /** Particle count for the hero field. */
  particleCount: number;
  /** Whether decorative floating geometry should render. */
  showShapes: boolean;
}

const readProfile = (): MotionProfile => {
  if (typeof window === 'undefined') {
    return {
      prefersReducedMotion: false,
      isLowPower: false,
      tier: 'full',
      dpr: [1, 1.75],
      particleCount: 900,
      showShapes: true,
    };
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  const saveData = Boolean(nav.connection?.saveData);
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const width = window.innerWidth;

  const isLowPower = saveData || cores <= 4 || memory <= 4 || (coarse && width < 768);
  const isMidPower = coarse || width < 1024;

  const tier: MotionTier = prefersReducedMotion ? 'off' : isLowPower ? 'reduced' : 'full';

  return {
    prefersReducedMotion,
    isLowPower,
    tier,
    dpr: tier === 'full' ? [1, isMidPower ? 1.5 : 1.75] : [1, 1],
    particleCount: tier === 'off' ? 0 : tier === 'reduced' ? 260 : isMidPower ? 500 : 900,
    showShapes: tier === 'full',
  };
};

/** Detects reduced-motion preference and weak hardware to scale back 3D/WebGL work. */
export function useMotionProfile(): MotionProfile {
  const [profile, setProfile] = useState<MotionProfile>(() => readProfile());

  useEffect(() => {
    const update = () => setProfile(readProfile());
    const queries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(pointer: coarse)'),
    ];
    queries.forEach((q) => q.addEventListener('change', update));
    window.addEventListener('resize', update);
    update();
    return () => {
      queries.forEach((q) => q.removeEventListener('change', update));
      window.removeEventListener('resize', update);
    };
  }, []);

  return profile;
}

/** True while the tab is visible — used to pause render loops in the background. */
export function usePageVisible(): boolean {
  const [visible, setVisible] = useState(() =>
    typeof document === 'undefined' ? true : document.visibilityState === 'visible'
  );
  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);
  return visible;
}
