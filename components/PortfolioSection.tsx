'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { FiArrowRight, FiArrowLeft, FiMapPin } from 'react-icons/fi';
import styles from './PortfolioSection.module.css';

const AUTO_INTERVAL = 4000;  // ms between auto-advances
const PAUSE_AFTER_MANUAL = 6000; // ms to pause after user interaction

import { useWorks } from '@/hooks/useWorks';

export function getDriveDirectLink(url: string) {
  if (!url) return '';
  let fileId = '';
  let match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) fileId = match[1];
  if (!fileId) {
    match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) fileId = match[1];
  }
  if (!fileId) {
    match = url.match(/open\?id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) fileId = match[1];
  }
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }
  return url;
}

// True Coverflow Transform
function getCardTransform(index: number, total: number, active: number) {
  const offset = index - active;
  const absOffset = Math.abs(offset);
  const sign = Math.sign(offset);

  // Active is flat, large, pushed slightly forward
  // Sibling cards are rotated and pushed behind.
  const rotateY = offset === 0 ? 0 : sign * -40;
  
  // Space them out
  const baseTranslateX = sign * 140; 
  const spreadX = offset * 110; 
  const translateX = offset === 0 ? 0 : baseTranslateX + spreadX;
  
  // Push side cards back
  const translateZ = offset === 0 ? 50 : -absOffset * 180;
  const scale = offset === 0 ? 1.05 : 1; 
  
  return {
    transform: `perspective(1200px) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity: Math.max(1 - absOffset * 0.3, 0),
    zIndex: total - absOffset,
  };
}

export default function PortfolioSection() {
  const { works, loading } = useWorks();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAllTimers = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
  }, []);

  const startAuto = useCallback(() => {
    clearAllTimers();
    autoRef.current = setInterval(() => {
      setActiveIndex(i => works.length > 0 ? (i + 1) % works.length : 0);
    }, AUTO_INTERVAL);
  }, [clearAllTimers, works.length]);

  const handleManualInteraction = useCallback((newIndex?: number) => {
    if (newIndex !== undefined) {
      setActiveIndex(newIndex);
    }
    setIsPaused(true);
    clearAllTimers();
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, PAUSE_AFTER_MANUAL);
  }, [clearAllTimers]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

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
  
  const activeWork = works[activeIndex];

  if (!mounted) {
    return <section className={`${styles.portfolio} section`} id="work" ref={ref} />;
  }

  return (
    <section className={`${styles.portfolio} section`} id="work" ref={ref}>
      <div className={styles.container}>
        {/* ─── SECTION HEADER ─── */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.sectionTag}>Showcase</div>
          <h2 className={styles.heading}>
            <span className={styles.headingAccent}>Creative Work</span>
          </h2>
        </motion.div>

        <motion.div
          className={styles.fanStage}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Cards Track */}
          <div className={styles.fanTrack}>
            {loading ? (
              <div style={{ color: 'var(--gray)' }}>Loading projects...</div>
            ) : works.length === 0 ? (
              <div style={{ color: 'var(--gray)' }}>No projects found.</div>
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
                      onClick={() => !isActive && handleManualInteraction(i)}
                    >
                      <div className={styles.cardVisual}>
                        {p.image ? (
                          <img 
                            src={getDriveDirectLink(p.image)} 
                            alt={p.title} 
                            className={styles.cardImg}
                          />
                        ) : (
                          <div className={styles.cardFallback}>
                            <PatternSvg type={p.pattern} accent={p.accent} />
                          </div>
                        )}


                        {/* Bottom Info Glass Pane */}
                        <div className={`${styles.glassInfo} ${isActive ? styles.glassInfoActive : ''}`}>
                          <div className={styles.glassInfoTop}>
                            <h3 className={styles.glassTitle}>{p.title}</h3>
                            {isActive && <span className={styles.glassPage}>{i + 1} / {works.length}</span>}
                          </div>
                          
                          {isActive ? (
                            <>
                              <p className={styles.glassDesc}>{p.description || "A creative project exploring new visual horizons and modern design principles."}</p>
                              <div className={styles.glassMeta}>
                                <FiMapPin className={styles.metaIcon} /> {p.type} Project, Online
                                <br />
                                <span className={styles.glassSubtext}>{p.id} • Creative Portfolio</span>
                              </div>
                            </>
                          ) : (
                            <p className={styles.glassSubtitle}>{p.type}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </>
            )}
          </div>

          {/* Floating Glass Bottom Nav */}
          {works.length > 0 && activeWork && (
            <motion.div 
              className={styles.bottomNavContainer}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className={styles.glassNav}>
                <button className={styles.navBtnSmall} onClick={prev}><FiArrowLeft /></button>
                
                <div className={styles.navThumbWrapper}>
                  {activeWork.image ? (
                    <img src={getDriveDirectLink(activeWork.image)} alt="thumb" className={styles.navThumb} />
                  ) : (
                    <div className={styles.navThumbFallback} style={{ background: activeWork.accent }} />
                  )}
                  <div className={styles.navThumbText}>
                    <div className={styles.navThumbTitle}>{activeWork.title}</div>
                    <div className={styles.navThumbSub}>{activeWork.type}</div>
                  </div>
                </div>

                <button className={styles.navBtnSmall} onClick={next}><FiArrowRight /></button>
              </div>
              
              {/* Dots */}
              <div className={styles.dots}>
                {works.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                    onClick={() => handleManualInteraction(i)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

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
