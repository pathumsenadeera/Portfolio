'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './StatsSection.module.css';

const stats = [
  { value: '5+',  label: 'Years of Experience', desc: 'Delivering bold creative work' },
  { value: '120+', label: 'Projects Completed',  desc: 'Across brands and industries' },
  { value: '60+',  label: 'Happy Clients',       desc: 'From startups to enterprises' },
  { value: '15+',  label: 'Awards & Features',   desc: 'Recognized creative excellence' },
];

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className={styles.stats} ref={ref}>
      <div className={styles.inner}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className={styles.item}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.value}>{s.value}</div>
            <div className={styles.label}>{s.label}</div>
            <div className={styles.desc}>{s.desc}</div>
            {i < stats.length - 1 && <div className={styles.divider} />}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
