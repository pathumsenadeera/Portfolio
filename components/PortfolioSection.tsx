'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import styles from './PortfolioSection.module.css';

const AUTO_INTERVAL = 3000;  // ms between auto-advances
const PAUSE_AFTER_MANUAL = 5000; // ms to pause after user interaction

const projects = [
  {
    id: 1,
    title: 'Felicitious Event',
    category: 'Branding',
    desc: 'Bold neon event identity with 3D glassmorphism elements.',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a2a0a 50%, #0f1a0a 100%)',
    accent: '#aaff00',
    pattern: 'cube',
  },
  {
    id: 2,
    title: 'Metal Expert Visual',
    category: 'Print',
    desc: 'Dramatic cinematic portrait with bold stencil typography.',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #0a1520 50%, #050d15 100%)',
    accent: '#00ccff',
    pattern: 'lines',
  },
  {
    id: 3,
    title: 'Apex Brand System',
    category: 'Branding',
    desc: 'Complete visual identity — logo, colors, and guidelines.',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #100505 100%)',
    accent: '#ff4444',
    pattern: 'grid',
  },
  {
    id: 4,
    title: 'Neon City Poster',
    category: 'Digital',
    desc: 'Cyberpunk urban poster with glitch and neon aesthetics.',
    gradient: 'linear-gradient(135deg, #080808 0%, #180a25 60%, #0d0515 100%)',
    accent: '#cc44ff',
    pattern: 'dots',
  },
  {
    id: 5,
    title: 'Apex Motion Reel',
    category: 'Motion',
    desc: 'Kinetic typography and dynamic brand animation sequences.',
    gradient: 'linear-gradient(135deg, #080808 0%, #1a1200 60%, #120d00 100%)',
    accent: '#ffaa00',
    pattern: 'waves',
  },
  {
    id: 6,
    title: 'Urban Collective',
    category: 'Print',
    desc: 'Street culture editorial with bold layout and photo direction.',
    gradient: 'linear-gradient(135deg, #080808 0%, #001a10 60%, #00100a 100%)',
    accent: '#00ffaa',
    pattern: 'circles',
  },
  {
    id: 7,
    title: 'Dark Matter Identity',
    category: 'Branding',
    desc: 'Minimalist sci-fi brand identity with space-age typography.',
    gradient: 'linear-gradient(135deg, #080808 0%, #050510 60%, #03030d 100%)',
    accent: '#4488ff',
    pattern: 'hex',
  },
];

// Calculate transform for each card in fan layout
function getCardTransform(index: number, total: number, active: number) {
  const offset = index - active;
  const absOffset = Math.abs(offset);

  // Fan spread config
  const rotateY = offset * 18;           // degrees of Y rotation
  const translateX = offset * 110;        // horizontal spread in px
  const translateZ = -absOffset * 80;    // depth recession
  const scale = 1 - absOffset * 0.08;   // scale down side cards
  const opacity = 1 - absOffset * 0.15; // fade side cards

  return {
    transform: `perspective(1200px) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity: Math.max(opacity, 0.2),
    zIndex: total - absOffset,
  };
}


export default function PortfolioSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100 for progress ring
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clear all timers helper
  const clearAllTimers = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
  }, []);

  // Start auto-scroll + progress tick
  const startAuto = useCallback(() => {
    clearAllTimers();
    setProgress(0);

    const tickMs = 50;
    progressRef.current = setInterval(() => {
      setProgress(p => {
        const next = p + (tickMs / AUTO_INTERVAL) * 100;
        return next >= 100 ? 100 : next;
      });
    }, tickMs);

    autoRef.current = setInterval(() => {
      setActiveIndex(i => (i + 1) % projects.length);
      setProgress(0);
    }, AUTO_INTERVAL);
  }, [clearAllTimers]);

  // Pause and resume after PAUSE_AFTER_MANUAL ms
  const handleManualInteraction = useCallback(() => {
    setIsPaused(true);
    clearAllTimers();
    setProgress(0);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, PAUSE_AFTER_MANUAL);
  }, [clearAllTimers]);

  // Start auto-scroll once section is in view
  useEffect(() => {
    if (inView && !isPaused) {
      startAuto();
    } else if (isPaused) {
      clearAllTimers();
    }
    return clearAllTimers;
  }, [inView, isPaused, startAuto, clearAllTimers]);

  const prev = () => {
    handleManualInteraction();
    setActiveIndex(i => (i - 1 + projects.length) % projects.length);
  };
  const next = () => {
    handleManualInteraction();
    setActiveIndex(i => (i + 1) % projects.length);
  };
  const goTo = (i: number) => {
    handleManualInteraction();
    setActiveIndex(i);
  };

  return (
    <section className={`${styles.portfolio} section`} id="work" ref={ref}>
      {/* Background glow */}
      <div className={styles.bgGlow} />
      <div className="grid-overlay" />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <motion.div
            className="section-tag"
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Selected Work
          </motion.div>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            Showcase My
            <br />
            <span className={`${styles.headingAccent} neon-text neon-glow`}>Creative Work</span>
          </motion.h2>
          <motion.p
            className={styles.subheading}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            Bold visuals crafted with intention — swipe through selected projects
          </motion.p>
        </div>

        {/* Fan Showcase */}
        <motion.div
          className={styles.fanStage}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Center glow beam */}
          <div className={styles.centerBeam} />

          {/* Cards */}
          <div className={styles.fanTrack}>
            {projects.map((project, i) => {
              const style = getCardTransform(i, projects.length, activeIndex);
              const isActive = i === activeIndex;
              return (
                <div
                  key={project.id}
                  className={`${styles.fanCard} ${isActive ? styles.fanCardActive : ''}`}
                  style={style}
                  onClick={() => goTo(i)}
                >
                  {/* Card visual */}
                  <div
                    className={styles.cardVisual}
                    style={{ background: project.gradient }}
                  >
                    {/* Pattern background */}
                    <div className={styles.cardPattern}>
                      <PatternSvg type={project.pattern} accent={project.accent} />
                    </div>

                    {/* Accent glow */}
                    <div
                      className={styles.cardAccentGlow}
                      style={{ background: `radial-gradient(circle at 50% 60%, ${project.accent}22 0%, transparent 70%)` }}
                    />

                    {/* Number */}
                    <div className={styles.cardNum}
                      style={{ color: `${project.accent}18` }}
                    >
                      {String(project.id).padStart(2, '0')}
                    </div>

                    {/* Top label */}
                    <div className={styles.cardTopLabel}>
                      <span
                        className={styles.cardCat}
                        style={{ color: project.accent, borderColor: `${project.accent}44` }}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Bottom info */}
                    <div className={styles.cardBottom}>
                      <h3 className={styles.cardTitle}>{project.title}</h3>
                      {isActive && (
                        <motion.p
                          className={styles.cardDesc}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {project.desc}
                        </motion.p>
                      )}
                    </div>

                    {/* Hover overlay */}
                    <div className={styles.cardHover}>
                      <span className={styles.viewLabel}>View Project</span>
                    </div>
                  </div>

                  {/* Active indicator line */}
                  {isActive && (
                    <motion.div
                      className={styles.activeBar}
                      style={{ background: project.accent }}
                      layoutId="activeBar"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className={styles.navBtns}>
            <button
              className={styles.navBtn}
              onClick={prev}
              aria-label="Previous project"
            >
              <FiArrowLeft />
            </button>

            {/* Dot indicators with auto-scroll progress ring */}
            <div className={styles.dots}>
              {projects.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            <button
              className={styles.navBtn}
              onClick={next}
              aria-label="Next project"
            >
              <FiArrowRight />
            </button>

            {/* Auto-scroll progress ring */}
            <div className={styles.progressRing} title={isPaused ? 'Paused — resumes automatically' : 'Auto-scrolling'}>
              <svg width="32" height="32" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                <circle
                  cx="16" cy="16" r="13"
                  fill="none"
                  stroke={isPaused ? 'rgba(170,255,0,0.3)' : 'var(--neon)'}
                  strokeWidth="2"
                  strokeDasharray={`${2 * Math.PI * 13}`}
                  strokeDashoffset={`${2 * Math.PI * 13 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 16 16)"
                  style={{ transition: 'stroke-dashoffset 0.05s linear, stroke 0.3s ease' }}
                />
              </svg>
              <span className={styles.progressIcon}>{isPaused ? '⏸' : '▶'}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


// Pattern SVG components for card backgrounds
function PatternSvg({ type, accent }: { type: string; accent: string }) {
  const color = accent + '20';
  const strokeColor = accent + '30';

  if (type === 'cube') return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="60" y="40" width="80" height="80" fill={color} stroke={strokeColor} strokeWidth="1" transform="skewX(-10) skewY(5)" />
      <rect x="70" y="50" width="80" height="80" fill="none" stroke={strokeColor} strokeWidth="1" transform="skewX(-10) skewY(5)" />
    </svg>
  );
  if (type === 'lines') return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={i} x1="0" y1={i * 22} x2="200" y2={i * 22 + 40} stroke={strokeColor} strokeWidth="1" />
      ))}
    </svg>
  );
  if (type === 'grid') return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 40} x2="200" y2={i * 40} stroke={strokeColor} strokeWidth="1" />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="200" stroke={strokeColor} strokeWidth="1" />
      ))}
    </svg>
  );
  if (type === 'dots') return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 6 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={c * 40 + 10} cy={r * 40 + 10} r="2" fill={strokeColor} />
        ))
      )}
    </svg>
  );
  if (type === 'waves') return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 6 }).map((_, i) => (
        <path key={i} d={`M0 ${i * 35 + 20} Q50 ${i * 35} 100 ${i * 35 + 20} T200 ${i * 35 + 20}`} fill="none" stroke={strokeColor} strokeWidth="1" />
      ))}
    </svg>
  );
  if (type === 'circles') return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {[20, 50, 80, 110].map((r) => (
        <circle key={r} cx="100" cy="100" r={r} fill="none" stroke={strokeColor} strokeWidth="1" />
      ))}
    </svg>
  );
  // hex
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" fill={color} stroke={strokeColor} strokeWidth="1" />
      <polygon points="100,50 145,75 145,125 100,150 55,125 55,75" fill="none" stroke={strokeColor} strokeWidth="1" />
    </svg>
  );
}
