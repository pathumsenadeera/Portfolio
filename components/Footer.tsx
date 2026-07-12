'use client';
import { motion } from 'framer-motion';
import { FiInstagram, FiLinkedin, FiArrowUp, FiGithub, FiFacebook } from 'react-icons/fi';
import { SiBehance } from 'react-icons/si';
import styles from './Footer.module.css';
import { usePersonalInfo } from '@/hooks/usePersonalInfo';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const { info, loading } = usePersonalInfo();

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
              {['UI/UX Design', 'Web Development', 'Mobile App Development', 'Graphic Design'].map(s => (
                <span key={s} className={styles.linkPlain}>{s}</span>
              ))}
            </div>
            <div className={styles.linkGroup}>
              <span className={styles.groupLabel}>Connect</span>
              <a href={info?.Email ? `mailto:${info.Email}` : "#"} className={styles.link}>
                {loading ? 'Loading...' : info?.Email || 'Email unavailable'}
              </a>
              <a href={info?.['Contact No'] ? `tel:${info['Contact No'].replace(/\s+/g, '')}` : "#"} className={styles.link}>
                {loading ? 'Loading...' : info?.['Contact No'] || 'Phone unavailable'}
              </a>
              <span className={styles.linkPlain}>Matara, Sri Lanka</span>
              <div className={styles.socials}>
                {loading ? null : [
                  { icon: <FiInstagram aria-hidden="true" />, href: info?.Instagram, label: 'Instagram' },
                  { icon: <SiBehance aria-hidden="true" />, href: info?.Behance, label: 'Behance' },
                  { icon: <FiLinkedin aria-hidden="true" />, href: info?.LinkedIn, label: 'LinkedIn' },
                  { icon: <FiFacebook aria-hidden="true" />, href: info?.Facebook, label: 'Facebook' },
                  { icon: <FiGithub aria-hidden="true" />, href: info?.Github, label: 'GitHub' },
                ].filter(s => s.href).map(s => (
                  <a key={s.label} href={s.href} aria-label={s.label} className={styles.social} target="_blank" rel="noreferrer">
                    {s.icon}
                  </a>
                ))}
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
            <FiArrowUp aria-hidden="true" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
