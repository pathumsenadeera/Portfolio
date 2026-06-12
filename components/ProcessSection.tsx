'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './ProcessSection.module.css';

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We start with a deep dive into your brand, goals, and audience. I ask the right questions to build a strategic foundation before a single pixel is created.',
    icon: '🔍',
  },
  {
    num: '02',
    title: 'Concept',
    desc: 'From research to raw ideas — I sketch, explore directions, and develop a creative concept that aligns your brand vision with visual impact.',
    icon: '💡',
  },
  {
    num: '03',
    title: 'Design',
    desc: 'Ideas become pixels. I craft the final design with obsessive attention to detail — typography, colour, hierarchy, and layout all working in harmony.',
    icon: '✏️',
  },
  {
    num: '04',
    title: 'Refine',
    desc: "Your feedback drives the iteration. We review together, refine until it's perfect, and ensure every element is intentional and impactful.",
    icon: '🔄',
  },
  {
    num: '05',
    title: 'Deliver',
    desc: 'Final files are packaged cleanly in all required formats. I also provide brand guidelines so your identity stays consistent wherever it appears.',
    icon: '🚀',
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className={`${styles.process} section`} id="process" ref={ref}>
      <div className="grid-overlay" />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <motion.div
            className="section-tag"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            How I Work
          </motion.div>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            MY CREATIVE<br />
            <span className="neon-text neon-glow">PROCESS</span>
          </motion.h2>
          <motion.p
            className={styles.sub}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            A structured approach that turns ideas into unforgettable design.
          </motion.p>
        </div>

        {/* Steps */}
        <div className={styles.steps}>
          {/* Connector line */}
          <div className={styles.connectorLine} />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className={styles.step}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 + 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.stepTop}>
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
              <div className={styles.stepGlow} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
