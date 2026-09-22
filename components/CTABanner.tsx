'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import styles from './CTABanner.module.css';
import { usePersonalInfo } from '@/hooks/usePersonalInfo';

export default function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });
  const { info } = usePersonalInfo();
  const email = info?.Email || 'hrmpathum21@gmail.com';

  return (
    <section className={styles.cta} ref={ref}>
      {/* Scrolling background text */}
      <div className={styles.marqueeBack} aria-hidden="true">
        <div className={styles.marqueeLine}>
          {Array(6).fill('LETS WORK TOGETHER •').join(' ')}
        </div>
      </div>

      <div className={styles.inner}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.eyebrow}>Open for Projects</div>
          <h2 className={styles.heading}>
            GOT A PROJECT<br />
            <span className="neon-text neon-glow">IN MIND?</span>
          </h2>
          <p className={styles.sub}>
            I&apos;m currently taking on new clients. Let&apos;s create something bold, beautiful, and built to last.
          </p>
          <div className={styles.actions}>
            <a href="#contact" className="btn-primary">
              <span className="btn-content">Start a Project <FiArrowRight /></span>
              <span className="btn-content-clone" aria-hidden="true">Start a Project <FiArrowRight /></span>
            </a>
            <a href={`mailto:${email}`} className="btn-outline">
              <span className="btn-content">{email}</span>
              <span className="btn-content-clone" aria-hidden="true">{email}</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Neon accent line */}
      <div className={styles.neonLine} />
    </section>
  );
}
