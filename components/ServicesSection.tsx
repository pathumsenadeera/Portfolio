'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FiPenTool,
  FiLayout,
  FiSmartphone,
  FiCode,
  FiArrowUpRight,
} from 'react-icons/fi';
import styles from './ServicesSection.module.css';
import { useTools } from '@/hooks/useTools';

const services = [
  {
    num: '01',
    icon: <FiPenTool />,
    tag: 'Visual Identity',
    title: 'Graphic Design',
    desc: 'Compelling visual communication that tells your brand story. From logos and brand kits to print collateral that leaves a lasting impression.',
    items: ['Logo Design', 'Brand Guidelines', 'Print & Packaging', 'Illustration'],
    accent: '#aaff00',
  },
  {
    num: '02',
    icon: <FiLayout />,
    tag: 'Digital Experience',
    title: 'UI/UX Design',
    desc: 'Human-centered digital experiences that blend aesthetics with intuitive usability — wireframes, prototypes, and pixel-perfect interfaces.',
    items: ['Wireframing', 'Prototyping', 'Design Systems', 'User Research'],
    accent: '#00ffcc',
  },
  {
    num: '03',
    icon: <FiSmartphone />,
    tag: 'Cross-Platform',
    title: 'Mobile App Development',
    desc: 'High-performance native and cross-platform mobile apps built for iOS and Android, engineered for speed, scalability, and seamless UX.',
    items: ['React Native', 'iOS & Android', 'App Architecture', 'API Integration'],
    accent: '#a78bfa',
  },
  {
    num: '04',
    icon: <FiCode />,
    tag: 'Full-Stack',
    title: 'Web Development',
    desc: 'Modern, responsive websites and web applications built with cutting-edge technologies — optimised for performance and search engines.',
    items: ['Next.js / React', 'Responsive Design', 'CMS Integration', 'SEO Optimisation'],
    accent: '#38bdf8',
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const { toolsMap, loading } = useTools();

  // Map service titles to exact Firestore document names
  const getDbKey = (title: string) => {
    if (title === 'UI/UX Design') return 'UI_UX Design';
    if (title === 'Web Development') return 'Web development';
    return title;
  };

  return (
    <section className={`${styles.services} section`} id="services" ref={ref}>
      <div className="grid-overlay" />

      {/* Background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.container}>
        {/* ── Header ── */}
        <div className={styles.header}>
          <motion.div
            className="section-tag"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Services
          </motion.div>

          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            WHAT I<br />
            <span className="neon-text neon-glow">DELIVER</span>
          </motion.h2>

          <motion.p
            className={styles.subheading}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            End-to-end creative &amp; technical services — from concept to launch.
          </motion.p>
        </div>

        {/* ── Cards ── */}
        <div className={styles.grid}>
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              className={styles.card}
              style={{ '--accent': service.accent } as React.CSSProperties}
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.12 * i + 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Top bar */}
              <div className={styles.cardTop}>
                <span className={styles.cardNum}>{service.num}</span>
                <span className={styles.cardTag}>{service.tag}</span>
              </div>

              {/* Icon — decorative, labelled by the card h3 */}
              <div className={styles.iconWrap} aria-hidden="true">
                {service.icon}
                <div className={styles.iconRing} />
              </div>

              {/* Title */}
              <h3 className={styles.cardTitle}>{service.title}</h3>

              {/* Divider */}
              <div className={styles.divider} />

              {/* Description */}
              <p className={styles.cardDesc}>{service.desc}</p>

              {/* Tags */}
              <ul className={styles.list}>
                {loading ? (
                  <li className={styles.listItem} style={{ color: 'var(--gray)' }}>Loading tools...</li>
                ) : (
                  (toolsMap[getDbKey(service.title)] && toolsMap[getDbKey(service.title)].length > 0 
                    ? toolsMap[getDbKey(service.title)] 
                    : service.items
                  ).map(item => (
                    <li key={item} className={styles.listItem}>
                      <span className={styles.listDot} />
                      {item}
                    </li>
                  ))
                )}
              </ul>

              {/* CTA */}
              <a href="#contact" className={styles.cardLink}>
                <span>Get Started</span>
                <FiArrowUpRight className={styles.linkIcon} aria-hidden="true" />
              </a>

              {/* Hover accent glow */}
              <div className={styles.cardGlow} />
              <div className={styles.cardCorner} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
