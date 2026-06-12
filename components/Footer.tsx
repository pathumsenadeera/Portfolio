'use client';
import { motion } from 'framer-motion';
import { FiInstagram, FiLinkedin, FiArrowUp } from 'react-icons/fi';
import { SiBehance } from 'react-icons/si';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.container}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoMark}>P</span>
              <span className={styles.logoText}>PATHUM</span>
            </div>
            <p className={styles.tagline}>
              Bold design. Lasting impressions.
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <span className={styles.groupLabel}>Navigation</span>
              {['Home', 'Work', 'About', 'Services', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className={styles.link}>{link}</a>
              ))}
            </div>
            <div className={styles.linkGroup}>
              <span className={styles.groupLabel}>Services</span>
              {['Brand Identity', 'Print & Editorial', 'Motion Graphics', 'Digital Design'].map(s => (
                <span key={s} className={styles.linkPlain}>{s}</span>
              ))}
            </div>
            <div className={styles.linkGroup}>
              <span className={styles.groupLabel}>Connect</span>
              <a href="mailto:hrmpathum21@gmail.com" className={styles.link}>hrmpathum21@gmail.com</a>
              <a href="tel:+94776394567" className={styles.link}>+94 77 639 4567</a>
              <span className={styles.linkPlain}>Matara, Sri Lanka</span>
              <div className={styles.socials}>
                <a href="#" aria-label="Instagram" className={styles.social}><FiInstagram /></a>
                <a href="#" aria-label="Behance" className={styles.social}><SiBehance /></a>
                <a href="#" aria-label="LinkedIn" className={styles.social}><FiLinkedin /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.container}>
          <span className={styles.copyright}>
            © 2025 Pathum Senadeera. All rights reserved.
          </span>
          <button onClick={scrollTop} className={styles.scrollTop} aria-label="Back to top">
            <FiArrowUp />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
