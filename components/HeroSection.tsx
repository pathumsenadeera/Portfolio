'use client';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiArrowRight, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { SiBehance } from 'react-icons/si';
import styles from './HeroSection.module.css';

const WORDS = ['DESIGNER', 'CREATOR', 'VISIONARY', 'DEVELOPER'];

const floatVariant: Variants = {
  animate: {
    y: [-12, 12, -12],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

const glowPulse: Variants = {
  animate: {
    opacity: [0.4, 0.7, 0.4],
    scale: [1, 1.05, 1],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.hero} id="home">
      {/* ─── BACKGROUND LAYERS ─── */}
      <div className="grid-overlay" />

      {/* Large watermark letter */}
      <div className={styles.watermarkLetter}>P</div>

      {/* Neon light beams from top */}
      <div className={styles.lightBeamContainer}>
        <div className={`${styles.lightBeam} ${styles.beam1}`} />
        <div className={`${styles.lightBeam} ${styles.beam2}`} />
        <div className={`${styles.lightBeam} ${styles.beam3}`} />
      </div>

      {/* Central glow aura */}
      <motion.div
        className={styles.centralGlow}
        variants={glowPulse}
        animate="animate"
      />

      {/* Vignette */}
      <div className={styles.vignette} />

      {/* ─── CONTENT ─── */}
      <div className={styles.content}>
        {/* LEFT COLUMN — Text */}
        <div className={styles.leftCol}>
          <div className={styles.titleWrap}>
            <motion.div
              role="heading"
              aria-level={1}
              className={styles.title}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>CREATIVE</div>
              <div className={styles.animatedWordWrap}>
                {/* Invisible spacer — longest word holds the row height */}
                <div className={styles.titleNeon} aria-hidden="true" style={{ visibility: 'hidden', pointerEvents: 'none' }}>
                  VISIONARY
                </div>
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={WORDS[wordIndex]}
                    className={styles.slidingWord}
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: -90, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    style={{ transformOrigin: 'center center' }}
                  >
                    <span className="neon-text neon-glow">{WORDS[wordIndex]}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div>&amp; VISUAL</div>
              <div>ARTIST</div>
            </motion.div>
          </div>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Crafting bold brand identities, cinematic visuals, and unforgettable
            design experiences that push creative boundaries.
          </motion.p>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <a href="#work" className="btn-primary">
              View Work <FiArrowRight />
            </a>
            <a href="#contact" className="btn-outline">
              Let&apos;s Talk
            </a>
          </motion.div>

          <motion.div
            className={styles.socials}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <span className={styles.socialLabel}>Follow</span>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Instagram" className={styles.socialLink}>
                <FiInstagram />
              </a>
              <a href="#" aria-label="Behance" className={styles.socialLink}>
                <SiBehance />
              </a>
              <a href="#" aria-label="LinkedIn" className={styles.socialLink}>
                <FiLinkedin />
              </a>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN — Portrait */}
        <div className={styles.rightCol}>
          {/* Cross decorations */}
          <div className={styles.crossTopRight} />

          {/* Portrait */}
          <motion.div
            className={styles.portraitWrap}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/portraits.png"
              alt="Pathum"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className={styles.portraitImg}
            />
            <div className={styles.greenTint} />
          </motion.div>

          {/* Floating labels */}
          <motion.div
            className={`${styles.floatLabel} ${styles.floatLabel1}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <span className={styles.floatDot} />
            Brand Identity Expert
          </motion.div>

          <motion.div
            className={`${styles.floatLabel} ${styles.floatLabel2}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <span className={styles.floatDot} />
            Visual Storyteller
          </motion.div>

          {/* NAME BELOW PORTRAIT */}
          <motion.div
            className={styles.portraitNameBar}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className={styles.nameInner}>
              <span className={styles.nameTitle}>PATHUM</span>
              <span className={styles.nameSubtitle}>SENADEERA</span>
            </div>
            <div className={styles.nameRoleRow}>
              <span className={styles.nameRole}>CREATIVE DIRECTOR</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
