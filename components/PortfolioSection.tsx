'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import styles from './PortfolioSection.module.css';

const AUTO_INTERVAL = 3000;  // ms between auto-advances
const PAUSE_AFTER_MANUAL = 5000; // ms to pause after user interaction

import { useWorks } from '@/hooks/useWorks';

export function getDriveDirectLink(url: string) {
  if (!url) return '';

  // Extract the file ID from any Google Drive URL format
  let fileId = '';

  // Format: /file/d/{ID}/view
  let match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) fileId = match[1];

  // Format: ?id={ID} or &id={ID}
  if (!fileId) {
    match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) fileId = match[1];
  }

  // Format: /open?id={ID}
  if (!fileId) {
    match = url.match(/open\?id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) fileId = match[1];
  }

  if (fileId) {
    // Use thumbnail URL — more reliable for web embedding than uc?export=view
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }

  return url;
}

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
  const { works, loading } = useWorks();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
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
      setActiveIndex(i => works.length > 0 ? (i + 1) % works.length : 0);
      setProgress(0);
    }, AUTO_INTERVAL);
  }, [clearAllTimers, works.length]);

  // Pause and resume after PAUSE_AFTER_MANUAL ms
  const handleManualInteraction = useCallback((newIndex?: number) => {
    if (newIndex !== undefined) {
      setActiveIndex(newIndex);
    }
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
    if (works.length === 0) return;
    handleManualInteraction((activeIndex - 1 + works.length) % works.length);
  };
  const next = () => {
    if (works.length === 0) return;
    handleManualInteraction((activeIndex + 1) % works.length);
  };
  const goTo = (i: number) => {
    handleManualInteraction(i);
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
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
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
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Center glow beam */}
          <div className={styles.centerBeam} />

          {/* Cards */}
          <div className={styles.fanTrack}>
            {loading ? (
              <div style={{ color: 'var(--gray)', textAlign: 'center', paddingTop: '40px' }}>Loading projects...</div>
            ) : works.length === 0 ? (
              <div style={{ color: 'var(--gray)', textAlign: 'center', paddingTop: '40px' }}>No projects found. Add some in your database!</div>
            ) : (
              <>
                {works.map((p, i) => {
                  const { transform, opacity, zIndex } = getCardTransform(i, works.length, activeIndex);
                  const isActive = i === activeIndex;
                  return (
                    <motion.div
                      key={p.id}
                      className={`${styles.fanCard} ${isActive ? styles.fanCardActive : ''}`}
                      style={{ transform, opacity, zIndex }}
                      onClick={() => {
                        if (isActive && p.Link && p.Link !== '#') {
                          window.open(p.Link, '_blank');
                        } else if (!isActive) {
                          handleManualInteraction(i);
                        }
                      }}
                    >
                      <div className={styles.cardVisual} style={{ background: p.gradient }}>
                        {p.image ? (
                          <img 
                            src={getDriveDirectLink(p.image)} 
                            alt={p.title} 
                            style={{ 
                              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                              objectFit: 'cover', opacity: 1
                            }} 
                          />
                        ) : (
                          <>
                            <div className={styles.cardPattern}>
                              <PatternSvg type={p.pattern} accent={p.accent} />
                            </div>
                            <div
                              className={styles.cardAccentGlow}
                              style={{ background: `radial-gradient(circle at 50% 60%, ${p.accent}22 0%, transparent 70%)` }}
                            />
                            <div className={styles.cardNum} style={{ color: `${p.accent}18` }}>
                              {String(i + 1).padStart(2, '0')}
                            </div>
                          </>
                        )}
                        <div className={styles.cardTopLabel}>
                          <span
                            className={styles.cardCat}
                            style={{ color: p.accent, borderColor: `${p.accent}44` }}
                          >
                            {p.type}
                          </span>
                        </div>
                        <div className={styles.cardBottom}>
                          <h3 className={styles.cardTitle}>{p.title}</h3>
                          {isActive && (
                            <motion.p
                              className={styles.cardDesc}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {p.description}
                            </motion.p>
                          )}
                        </div>
                        {p.Link && p.Link !== '#' && (
                          <div className={styles.cardHover} aria-hidden="true">
                            <span className={styles.viewLabel}>View Project</span>
                          </div>
                        )}
                      </div>
                      
                      {isActive && (
                        <motion.div
                          className={styles.activeBar}
                          style={{ background: p.accent }}
                          layoutId="activeBar"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </>
            )}
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

            {/* Dot indicators */}
            <div className={styles.dots}>
              {works.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                  onClick={() => handleManualInteraction(i)}
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
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                role="img"
                aria-label={isPaused ? 'Auto-scroll paused' : `Auto-scroll progress: ${Math.round(progress)}%`}
              >
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
              <span className={styles.progressIcon} aria-hidden="true">{isPaused ? '⏸' : '▶'}</span>
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
