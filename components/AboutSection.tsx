'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './AboutSection.module.css';

const skills = [
  'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Figma',
  'After Effects', 'Brand Identity', 'Motion Graphics', 'Typography',
  'Print Design', 'UI/UX Design', 'Color Theory', 'Visual Direction',
];

const balloonTags = [
  { label: 'Photoshop',    accent: '#aaff00' },
  { label: 'Illustrator',  accent: '#ff8844' },
  { label: 'Figma',        accent: '#00ccff' },
  { label: 'After Effects',accent: '#cc44ff' },
  { label: 'InDesign',     accent: '#ff4444' },
  { label: 'Lightroom',    accent: '#ffaa00' },
  { label: 'Blender',      accent: '#00ffaa' },
  { label: 'Premiere Pro', accent: '#4488ff' },
  { label: 'DaVinci',      accent: '#aaff00' },
  { label: 'Canva',        accent: '#00ccff' },
];

const TAG_POSITIONS: { x: number; y: number }[] = [
  { x: -140, y: -100 }, { x:  100, y: -80 }, { x: -60,  y:  20 },
  { x:  160, y:  30  }, { x: -180, y:  60 }, { x:  30,  y: -30 },
  { x: -100, y: 100  }, { x:  180, y:  90 }, { x: -20,  y: -110 },
  { x:  80,  y:  110 },
];

const BOB_OFFSETS = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={`${styles.about} section`} id="about" ref={ref}>
      <div className="grid-overlay" />
      <div className={styles.container}>
        {/* Left: Text */}
        <div className={styles.leftCol}>
          <motion.div
            className="section-tag"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.div>

          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            DESIGN IS
            <br />
            <span className="neon-text neon-glow">MY WEAPON</span>
            <br />
            OF CHOICE
          </motion.h2>

          <motion.p
            className={styles.bio}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            I&apos;m Pathum, a passionate graphic designer with over 5 years of experience
            creating bold visual identities and brand experiences. My work lives at the
            intersection of art and strategy — where aesthetics meet purpose.
          </motion.p>

          <motion.p
            className={styles.bio}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            From branding to motion, I bring ideas to life with precision, creativity,
            and an obsessive attention to detail.
          </motion.p>


        </div>

        {/* Right: Floating balloon tool tags */}
        <motion.div
          className={styles.rightCol}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className={styles.balloonArena}>
            <span className={styles.balloonLabel}>Tools &amp; Software</span>
            {balloonTags.map((tag, i) => (
              <BalloonTag
                key={tag.label}
                tag={tag}
                initPos={TAG_POSITIONS[i]}
                bobOffset={BOB_OFFSETS[i]}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BalloonTag({
  tag,
  initPos,
  bobOffset,
}: {
  tag: { label: string; accent: string };
  initPos: { x: number; y: number };
  bobOffset: number;
}) {
  return (
    <motion.div
      className={styles.balloonTag}
      drag
      dragMomentum
      dragElastic={0.18}
      initial={{ x: initPos.x, y: initPos.y, opacity: 0, scale: 0.5 }}
      animate={{
        x: initPos.x,
        y: [initPos.y, initPos.y - 16, initPos.y],
        opacity: 1,
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.5, delay: bobOffset * 0.08 },
        scale:   { duration: 0.5, delay: bobOffset * 0.08 },
        y: {
          duration: 3.4 + bobOffset * 0.25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: bobOffset * 0.5,
        },
      }}
      whileDrag={{ scale: 1.14, cursor: 'grabbing' }}
      whileHover={{ scale: 1.09 }}
      style={{
        borderColor: `${tag.accent}55`,
        boxShadow: `0 0 20px ${tag.accent}30, 0 4px 28px rgba(0,0,0,0.55)`,
        color: tag.accent,
      }}
    >
      {tag.label}
    </motion.div>
  );
}
