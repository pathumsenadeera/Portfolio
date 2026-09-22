'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './Preloader.module.css';

interface Skill {
  id: string;
  name: string;
  svg: React.ReactNode;
}

const SKILLS: Skill[] = [
  {
    id: 'brackets',
    name: 'Code',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.iconSvg}>
        <path d="M15 14L5 24L15 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M33 14L43 24L33 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="28" y1="10" x2="20" y2="38" stroke="var(--neon, #aaff00)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'html',
    name: 'HTML5',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.iconSvg}>
        <path d="M8 6L11.5 39L24 43L36.5 39L40 6H8Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M24 13V37L32.5 34.5L35 13H24Z" fill="rgba(170, 255, 0, 0.15)" stroke="var(--neon, #aaff00)" strokeWidth="2" />
        <path d="M16 20H32M15 26H31M24 26L23 33L18 31.5" stroke="var(--neon, #aaff00)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'css',
    name: 'CSS3',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.iconSvg}>
        <rect x="6" y="8" width="36" height="32" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M6 18H42M18 18V40" stroke="currentColor" strokeWidth="2" />
        <circle cx="30" cy="29" r="5" stroke="var(--neon, #aaff00)" strokeWidth="2" fill="rgba(170, 255, 0, 0.2)" />
        <path d="M27 32L33 26" stroke="var(--neon, #aaff00)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'js',
    name: 'JavaScript',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.iconSvg}>
        <rect x="6" y="6" width="36" height="36" rx="6" stroke="var(--neon, #aaff00)" strokeWidth="2.5" fill="rgba(170, 255, 0, 0.08)" />
        <path d="M17 26V33C17 35 15.5 36.5 13 36.5" stroke="var(--neon, #aaff00)" strokeWidth="3" strokeLinecap="round" />
        <path d="M26 34.5C28 35.8 30.2 36.5 32.5 36.5C35.5 36.5 37.5 35 37.5 32.5C37.5 30 35.5 29 33 28C30.5 27 28.5 26 28.5 23.5C28.5 21.5 30.2 20 32.5 20C34.5 20 36.2 20.8 37.5 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'react',
    name: 'React',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.iconSvg}>
        <circle cx="24" cy="24" r="3.5" fill="var(--neon, #aaff00)" />
        <ellipse cx="24" cy="24" rx="20" ry="7.5" stroke="var(--neon, #aaff00)" strokeWidth="2" />
        <ellipse cx="24" cy="24" rx="20" ry="7.5" stroke="currentColor" strokeWidth="2" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="20" ry="7.5" stroke="currentColor" strokeWidth="2" transform="rotate(120 24 24)" />
      </svg>
    ),
  },
  {
    id: 'flutter',
    name: 'Flutter',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.iconSvg}>
        <path d="M27 6L10 23L15.5 28.5L38 6H27Z" fill="rgba(170, 255, 0, 0.15)" stroke="var(--neon, #aaff00)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M27 23L15.5 34.5L21 40L38 23H27Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M21.5 28.5L27 34L21.5 39.5L16 34L21.5 28.5Z" fill="var(--neon, #aaff00)" stroke="var(--neon, #aaff00)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'database',
    name: 'Database',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.iconSvg}>
        <ellipse cx="24" cy="11" rx="16" ry="5" stroke="var(--neon, #aaff00)" strokeWidth="2.5" fill="rgba(170, 255, 0, 0.15)" />
        <path d="M8 11V22C8 24.8 15.2 27 24 27C32.8 27 40 24.8 40 22V11" stroke="currentColor" strokeWidth="2.5" />
        <path d="M8 22V33C8 35.8 15.2 38 24 38C32.8 38 40 35.8 40 33V22" stroke="var(--neon, #aaff00)" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'ui',
    name: 'UI Design',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.iconSvg}>
        <rect x="6" y="8" width="36" height="32" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <line x1="6" y1="16" x2="42" y2="16" stroke="currentColor" strokeWidth="2" />
        <circle cx="11" cy="12" r="1.5" fill="var(--neon, #aaff00)" />
        <circle cx="16" cy="12" r="1.5" fill="currentColor" />
        <rect x="11" y="21" width="11" height="13" rx="2" fill="rgba(170, 255, 0, 0.2)" stroke="var(--neon, #aaff00)" strokeWidth="2" />
        <line x1="26" y1="22" x2="37" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="26" y1="27" x2="35" y2="27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="26" y1="32" x2="32" y2="32" stroke="var(--neon, #aaff00)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'ux',
    name: 'UX Design',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.iconSvg}>
        <circle cx="24" cy="14" r="6" stroke="var(--neon, #aaff00)" strokeWidth="2.5" fill="rgba(170, 255, 0, 0.15)" />
        <path d="M12 36C12 29.4 17.4 24 24 24C30.6 24 36 29.4 36 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="38" cy="18" r="3" stroke="var(--neon, #aaff00)" strokeWidth="2" />
        <path d="M38 21V29" stroke="var(--neon, #aaff00)" strokeWidth="2" strokeDasharray="2 3" />
        <path d="M10 21V29" stroke="currentColor" strokeWidth="2" strokeDasharray="2 3" />
        <circle cx="10" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'figma',
    name: 'Figma & Vector',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.iconSvg}>
        <path d="M16 8H24V16H16C13.8 16 12 14.2 12 12C12 9.8 13.8 8 16 8Z" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 8H32C34.2 8 36 9.8 36 12C36 14.2 34.2 16 32 16H24V8Z" stroke="var(--neon, #aaff00)" strokeWidth="2.5" fill="rgba(170, 255, 0, 0.2)" />
        <path d="M16 16H24V24H16C13.8 24 12 22.2 12 20C12 17.8 13.8 16 16 16Z" stroke="var(--neon, #aaff00)" strokeWidth="2.5" />
        <path d="M24 16H32C34.2 16 36 17.8 36 20C36 22.2 34.2 24 32 24C29.8 24 28 22.2 28 20" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 24H24V32C24 34.2 22.2 36 20 36C17.8 36 16 34.2 16 32V24Z" stroke="var(--neon, #aaff00)" strokeWidth="2.5" fill="rgba(170, 255, 0, 0.15)" />
        <circle cx="24" cy="20" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'mobile',
    name: 'Mobile App',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.iconSvg}>
        <rect x="13" y="6" width="22" height="36" rx="5" stroke="currentColor" strokeWidth="2.5" />
        <line x1="20" y1="10" x2="28" y2="10" stroke="var(--neon, #aaff00)" strokeWidth="2" strokeLinecap="round" />
        <rect x="17" y="16" width="6" height="6" rx="1.5" fill="rgba(170, 255, 0, 0.2)" stroke="var(--neon, #aaff00)" strokeWidth="1.5" />
        <rect x="25" y="16" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="17" y="24" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="25" y="24" width="6" height="6" rx="1.5" fill="rgba(170, 255, 0, 0.2)" stroke="var(--neon, #aaff00)" strokeWidth="1.5" />
        <circle cx="24" cy="37" r="1.5" fill="var(--neon, #aaff00)" />
      </svg>
    ),
  },
  {
    id: 'web',
    name: 'Web Dev',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.iconSvg}>
        <rect x="6" y="8" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <line x1="6" y1="16" x2="42" y2="16" stroke="currentColor" strokeWidth="2" />
        <circle cx="11" cy="12" r="1.5" fill="var(--neon, #aaff00)" />
        <circle cx="16" cy="12" r="1.5" fill="#888" />
        <path d="M17 23L13 27L17 31" stroke="var(--neon, #aaff00)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 23L27 27L23 31" stroke="var(--neon, #aaff00)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="21" y1="22" x2="19" y2="32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="18" y1="40" x2="30" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="24" y1="36" x2="24" y2="40" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'creative',
    name: 'Creative Direction',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.iconSvg}>
        <path d="M12 36L30 18L36 24L18 42H12V36Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M30 18L26 14L29 11C30.2 9.8 32.1 9.8 33.3 11L37 14.7C38.2 15.9 38.2 17.8 37 19L34 22L30 18Z" stroke="var(--neon, #aaff00)" fill="rgba(170, 255, 0, 0.2)" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="15" cy="39" r="1.5" fill="var(--neon, #aaff00)" />
        <path d="M34 10L38 6" stroke="var(--neon, #aaff00)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'terminal',
    name: 'System Architecture',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className={styles.iconSvg}>
        <rect x="6" y="9" width="36" height="30" rx="5" stroke="currentColor" strokeWidth="2.5" />
        <path d="M14 20L21 25L14 30" stroke="var(--neon, #aaff00)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="25" y1="30" x2="34" y2="30" stroke="var(--neon, #aaff00)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
];

type Phase = 'icons' | 'brand' | 'name' | 'hold' | 'exit';

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>('icons');
  const [iconIndex, setIconIndex] = useState(0);
  const [done, setDone] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // 1. Temporarily disable scrolling
    document.body.classList.add('preloader-active');
    document.body.style.overflow = 'hidden';

    // 2. Phase 1: Rapid cycle through skills (14 icons × 160ms = ~2240ms)
    const iconInterval = setInterval(() => {
      setIconIndex((prev) => {
        if (prev < SKILLS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(iconInterval);
          return prev;
        }
      });
    }, 160);

    // 3. Phase 2: Transition into brand monogram 'P' (at 2240ms, duration ~500ms)
    const tBrand = setTimeout(() => {
      setPhase('brand');
    }, SKILLS.length * 160);

    // 4. Phase 3: Reveal name 'PATHUM SENADEERA' (at 2740ms, duration ~850ms)
    const tName = setTimeout(() => {
      setPhase('name');
    }, SKILLS.length * 160 + 500);

    // 5. Phase 4: Hold completed state (at 3600ms, hold ~600ms)
    const tHold = setTimeout(() => {
      setPhase('hold');
    }, SKILLS.length * 160 + 500 + 850);

    // 6. Exit: Fade entire preloader out (at 4200ms, fade 500ms)
    const tExit = setTimeout(() => {
      setPhase('exit');
    }, SKILLS.length * 160 + 500 + 850 + 600);

    // 7. Cleanup & Unmount (at 4700ms)
    const tDone = setTimeout(() => {
      setDone(true);
      document.body.classList.remove('preloader-active');
      document.body.style.overflow = '';
    }, SKILLS.length * 160 + 500 + 850 + 600 + 500);

    timeoutsRef.current = [tBrand, tName, tHold, tExit, tDone];

    return () => {
      clearInterval(iconInterval);
      timeoutsRef.current.forEach(clearTimeout);
      document.body.classList.remove('preloader-active');
      document.body.style.overflow = '';
    };
  }, []);

  if (done) return null;

  const currentSkill = SKILLS[iconIndex];

  return (
    <motion.div
      className={styles.preloader}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      aria-hidden={done}
    >
      <div className={styles.glowAmbient} />

      <div className={styles.inner}>
        <div className={styles.stage}>
          <AnimatePresence mode="wait">
            {phase === 'icons' && (
              <motion.div
                key={currentSkill.id}
                className={styles.iconWrapper}
                initial={{ opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(2px)' }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
              >
                {currentSkill.svg}
                <span className={styles.iconLabel}>{currentSkill.name}</span>
              </motion.div>
            )}

            {(phase === 'brand' || phase === 'name' || phase === 'hold' || phase === 'exit') && (
              <motion.div
                key="brand-mark"
                className={styles.brandMark}
                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Pathum Senadeera Logo"
                  width={80}
                  height={80}
                  className={styles.brandImg}
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Phase 3 & 4: Name & Subtitle Reveal with clean left-to-right clip-path */}
        {(phase === 'name' || phase === 'hold' || phase === 'exit') && (
          <motion.div
            className={styles.nameRevealContainer}
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className={styles.preloaderName}>PATHUM SENADEERA</h1>
            <p className={styles.preloaderSubtitle}>Creative Designer Portfolio</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
