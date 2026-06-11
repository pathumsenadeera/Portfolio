'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowRight, FiInstagram, FiBehance, FiLinkedin } from 'react-icons/fi';
import { SiBehance } from 'react-icons/si';
import styles from './HeroSection.module.css';

const floatVariant = {
  animate: {
    y: [-12, 12, -12],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

const glowPulse = {
  animate: {
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.05, 1],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export default function HeroSection() {
  return (
    <section className={styles.hero} id="home">
      <div className="grid-overlay" />

      {/* LEFT SIDE */}
      <div className={styles.left}>
        {/* Floating barcode label */}
        <motion.div
          className={styles.barcodeTag}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className={styles.barcodeLines}>
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className={styles.barLine} style={{ height: `${Math.random() * 16 + 8}px` }} />
            ))}
          </span>
          <span className={styles.barcodeText}>CREATIVE.STUDIO.2025</span>
        </motion.div>

        {/* Main content */}
        <div className={styles.leftContent}>
          <motion.div
            className="section-tag"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Available for work
          </motion.div>

          <div className={styles.titleWrap}>
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              CREATIVE
              <br />
              <span className={`${styles.titleNeon} neon-text neon-glow`}>DESIGNER</span>
              <br />
              &amp; VISUAL
              <br />
              ARTIST
            </motion.h1>
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

        {/* Floating featured work card */}
        <motion.div
          className={styles.featuredCard}
          variants={floatVariant}
          animate="animate"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <div className={styles.featuredCardInner}>
            <div className={styles.featuredGlow} />
            <div className={styles.featuredGrid}>
              <span className={styles.featuredLabel}>FEATURED</span>
              <div className={styles.featuredBox}>
                <span className={styles.featuredQuestion}>?</span>
              </div>
              <span className={styles.featuredSub}>LATEST WORK</span>
            </div>
            <span className={styles.featuredTag}>LUCKY DRAW</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          {[
            { num: '5+', label: 'Years Exp.' },
            { num: '120+', label: 'Projects' },
            { num: '80+', label: 'Clients' },
          ].map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={`${styles.statNum} neon-text`}>{s.num}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* RIGHT SIDE — Portrait */}
      <div className={styles.right}>
        {/* Background glow */}
        <motion.div
          className={styles.portraitGlow}
          variants={glowPulse}
          animate="animate"
        />

        {/* Cross/X graphic decoration */}
        <div className={styles.crossTopLeft} />
        <div className={styles.crossTopRight} />
        <div className={styles.crossBotLeft} />

        {/* Portrait Image */}
        <motion.div
          className={styles.portraitWrap}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.portraitPlaceholder}>
            <div className={styles.portraitSilhouette}>
              <div className={styles.silhouetteHead} />
              <div className={styles.silhouetteBody} />
            </div>
            <span className={styles.uploadHint}>Your portrait will appear here</span>
          </div>
          {/* Once portrait image is provided, replace above with:
          <Image src="/images/portrait.jpg" alt="Pathum" fill className={styles.portraitImg} /> */}
        </motion.div>

        {/* Name overlay at bottom */}
        <motion.div
          className={styles.portraitName}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <span className={styles.portraitTitle}>PATHUM</span>
          <span className={styles.portraitSubtitle}>SENADEERA</span>
          <span className={styles.portraitRole}>CREATIVE DIRECTOR</span>
        </motion.div>

        {/* Floating info labels */}
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

        {/* Year badge */}
        <motion.div
          className={styles.yearBadge}
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <span>EST.</span>
          <span className={styles.yearNum}>2020</span>
        </motion.div>
      </div>
    </section>
  );
}
