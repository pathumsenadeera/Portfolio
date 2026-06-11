'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './AboutSection.module.css';

const skills = [
  'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Figma',
  'After Effects', 'Brand Identity', 'Motion Graphics', 'Typography',
  'Print Design', 'UI/UX Design', 'Color Theory', 'Visual Direction',
];

const tools = [
  { name: 'Photoshop', level: 95 },
  { name: 'Illustrator', level: 92 },
  { name: 'Figma', level: 88 },
  { name: 'After Effects', level: 80 },
  { name: 'InDesign', level: 85 },
];

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

          {/* Skill badges */}
          <motion.div
            className={styles.skillsWrap}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                className={styles.skillBadge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.04, duration: 0.4 }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Right: Tools + profile card */}
        <div className={styles.rightCol}>
          {/* Profile card */}
          <motion.div
            className={styles.profileCard}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className={styles.profileCardTop}>
              <div className={styles.profileAvatar}>
                <span>P</span>
                <div className={styles.avatarGlow} />
              </div>
              <div>
                <div className={styles.profileName}>Pathum Senadeera</div>
                <div className={styles.profileRole}>Creative Designer</div>
                <div className={styles.profileBadge}>
                  <span className={styles.badgeDot} />
                  Available for projects
                </div>
              </div>
            </div>

            <div className={styles.profileStats}>
              {[
                { num: '5+', label: 'Years' },
                { num: '120+', label: 'Projects' },
                { num: '80+', label: 'Clients' },
                { num: '15+', label: 'Awards' },
              ].map((s) => (
                <div key={s.label} className={styles.profileStat}>
                  <span className={`${styles.profileStatNum} neon-text`}>{s.num}</span>
                  <span className={styles.profileStatLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tool proficiency bars */}
          <motion.div
            className={styles.toolsCard}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            <div className={styles.toolsTitle}>
              <span className="section-tag" style={{ marginBottom: 0 }}>Tools</span>
            </div>
            {tools.map((tool, i) => (
              <div key={tool.name} className={styles.toolItem}>
                <div className={styles.toolHeader}>
                  <span className={styles.toolName}>{tool.name}</span>
                  <span className={styles.toolLevel}>{tool.level}%</span>
                </div>
                <div className={styles.toolBar}>
                  <motion.div
                    className={styles.toolFill}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${tool.level}%` } : {}}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
