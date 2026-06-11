'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiMonitor, FiLayers, FiPlay, FiPenTool, FiArrowRight } from 'react-icons/fi';
import styles from './ServicesSection.module.css';

const services = [
  {
    icon: <FiLayers />,
    title: 'Brand Identity',
    desc: 'Complete brand identity systems — from logo design to full visual guidelines, crafted to make lasting impressions.',
    items: ['Logo Design', 'Brand Guidelines', 'Visual System', 'Brand Strategy'],
    num: '01',
  },
  {
    icon: <FiPenTool />,
    title: 'Print & Editorial',
    desc: 'High-impact print materials, editorial layouts, and publication design with typographic excellence.',
    items: ['Posters', 'Magazine Layout', 'Packaging', 'Brochures'],
    num: '02',
  },
  {
    icon: <FiPlay />,
    title: 'Motion Graphics',
    desc: 'Dynamic motion graphics, kinetic typography, and animated visuals that bring brands to life.',
    items: ['Brand Animation', 'Title Sequences', 'Social Content', 'Video Intros'],
    num: '03',
  },
  {
    icon: <FiMonitor />,
    title: 'Digital Design',
    desc: 'Digital-first design for screens — social media, web graphics, and digital campaign assets.',
    items: ['Social Media', 'Web Graphics', 'Digital Ads', 'Email Design'],
    num: '04',
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className={`${styles.services} section`} id="services" ref={ref}>
      <div className="grid-overlay" />
      <div className={styles.container}>
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
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            WHAT I
            <br />
            <span className="neon-text neon-glow">CREATE</span>
          </motion.h2>
          <motion.p
            className={styles.subheading}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            End-to-end creative services that transform ideas into visual impact.
          </motion.p>
        </div>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i + 0.2, duration: 0.6 }}
            >
              <div className={styles.cardNum}>{service.num}</div>
              <div className={styles.iconWrap}>
                {service.icon}
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.desc}</p>
              <ul className={styles.list}>
                {service.items.map(item => (
                  <li key={item} className={styles.listItem}>
                    <span className={styles.listDot} />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={styles.cardLink}>
                Get Started <FiArrowRight />
              </a>
              <div className={styles.cardGlow} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
