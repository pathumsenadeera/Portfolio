'use client';
import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import styles from './AboutSection.module.css';
import { useTools } from '@/hooks/useTools';

/* ─── Balloon positions for up to 4 tools ──────────────────── */
const BALLOON_POS = [
  { x: -130, y: -90 },
  { x:  110, y: -70 },
  { x:  -60, y:  50 },
  { x:  130, y:  60 },
  { x:    0, y: -10 },
];
const BOB_OFFSETS = [0, 0.7, 1.4, 2.1, 2.8];

/* ─── Service data ─────────────────────────────────────────── */
const SERVICES = [
  {
    num: '01',
    tag: 'Visual Identity',
    title: 'Graphic Design',
    headline: ['DESIGN IS', 'MY WEAPON', 'OF CHOICE'],
    bio: "I create bold, strategic brand identities that command attention. From logo systems to complete visual languages, every element is crafted with intention, precision, and a deep understanding of your audience.",
    deliverables: ['Logo & Brand Mark', 'Brand Guidelines', 'Print & Packaging', 'Typography Systems', 'Visual Direction'],
    tools: ['Photoshop', 'Illustrator', 'InDesign', 'Lightroom'],
    stat1: { value: '80+', label: 'Brands Created' },
    stat2: { value: '5+', label: 'Years Experience' },
  },
  {
    num: '02',
    tag: 'Digital Experience',
    title: 'UI / UX Design',
    headline: ['INTUITIVE', 'DESIGN THAT', 'CONVERTS'],
    bio: "Human-centered digital interfaces that balance beauty with usability. I design from wireframe to pixel-perfect prototype — always putting the end user at the center of every decision.",
    deliverables: ['Wireframing', 'Prototyping', 'Design Systems', 'User Research', 'Figma Flows'],
    tools: ['Figma', 'Framer', 'Maze', 'Notion'],
    stat1: { value: '40+', label: 'UI Projects' },
    stat2: { value: '98%', label: 'Client Satisfaction' },
  },
  {
    num: '03',
    tag: 'Full-Stack',
    title: 'Web Development',
    headline: ['BUILT FOR', 'SPEED AND', 'IMPACT'],
    bio: "Modern, high-performance websites that bridge the gap between design and engineering. I deliver responsive, SEO-optimised experiences using the latest web technologies.",
    deliverables: ['Next.js / React', 'Responsive Design', 'CMS Integration', 'Performance Tuning', 'SEO Optimisation'],
    tools: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    stat1: { value: '30+', label: 'Websites Built' },
    stat2: { value: '100', label: 'Lighthouse Score' },
  },
  {
    num: '04',
    tag: 'Cross-Platform',
    title: 'Mobile App Dev',
    headline: ['APPS THAT', 'FEEL LIKE', 'MAGIC'],
    bio: "Native and cross-platform mobile applications built for iOS and Android. I engineer fast, scalable apps with seamless UX and clean architecture that users actually love.",
    deliverables: ['React Native Apps', 'iOS & Android', 'App Architecture', 'API Integration', 'App Store Launch'],
    tools: ['React Native', 'Expo', 'Firebase', 'Redux'],
    stat1: { value: '15+', label: 'Apps Published' },
    stat2: { value: '4.8★', label: 'Avg Store Rating' },
  },
];

/* ─── Main component ────────────────────────────────────────── */
export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { toolsMap } = useTools();

  const getDbKey = (title: string) => {
    if (title === 'UI / UX Design') return 'UI_UX Design';
    if (title === 'Web Development') return 'Web development';
    if (title === 'Mobile App Dev') return 'Mobile App Development';
    return title;
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const raw = v * SERVICES.length;
    const idx = Math.min(Math.floor(raw), SERVICES.length - 1);
    setActiveIndex(idx);
  });

  const svc = SERVICES[activeIndex];

  return (
    <div
      ref={containerRef}
      id="about"
      className={styles.scrollContainer}
      style={{ height: `${SERVICES.length * 100}vh` }}
    >
      {/* Sticky panel */}
      <div className={styles.stickyPanel}>
        <div className="grid-overlay" />

        {/* ── Progress rail (right edge) ── */}
        <div className={styles.progressRail}>
          {SERVICES.map((s, i) => (
            <button
              key={i}
              className={`${styles.railDot} ${i === activeIndex ? styles.railDotActive : ''}`}
              onClick={() => {
                if (!containerRef.current) return;
                const el = containerRef.current;
                const target = el.offsetTop + (i / SERVICES.length) * el.offsetHeight + 10;
                window.scrollTo({ top: target, behavior: 'smooth' });
              }}
              aria-label={`Go to ${s.title}`}
            />
          ))}
          <div
            className={styles.railBar}
            style={{ height: `${(activeIndex / (SERVICES.length - 1)) * 100}%` }}
          />
        </div>

        {/* ── Content grid ── */}
        <div className={styles.grid}>

          {/* LEFT — Text content */}
          <div className={styles.leftCol}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`tag-${activeIndex}`}
                className="section-tag"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.35 }}
              >
                {svc.tag}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h2
                key={`headline-${activeIndex}`}
                className={styles.heading}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {svc.headline.map((line, i) => (
                  <span key={i} className={i === 1 ? `${styles.headingAccent} neon-text` : ''}>
                    {line}
                    {i < svc.headline.length - 1 && <br />}
                  </span>
                ))}
              </motion.h2>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`bio-${activeIndex}`}
                className={styles.bio}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                {svc.bio}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.ul
                key={`list-${activeIndex}`}
                className={styles.deliverables}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                {svc.deliverables.map((item) => (
                  <li key={item} className={styles.deliverableItem}>
                    <span className={styles.dot} />
                    {item}
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>

            <div className={styles.counter}>
              <span className={`${styles.counterCurrent} neon-text`}>{svc.num}</span>
              <span className={styles.counterSep}>/</span>
              <span className={styles.counterTotal}>{String(SERVICES.length).padStart(2, '0')}</span>
              <span className={styles.counterLabel}>{svc.title}</span>
            </div>
          </div>

          {/* RIGHT — Stats + Balloon arena */}
          <div className={styles.rightCol}>
            {/* Stats */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`stats-${activeIndex}`}
                className={styles.statsRow}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.statBox}>
                  <div className={`${styles.statValue} neon-text`}>{svc.stat1.value}</div>
                  <div className={styles.statLabel}>{svc.stat1.label}</div>
                </div>
                <div className={styles.statBox}>
                  <div className={`${styles.statValue} neon-text`}>{svc.stat2.value}</div>
                  <div className={styles.statLabel}>{svc.stat2.label}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Floating balloon tool tags */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`balloons-${activeIndex}`}
                className={styles.balloonArena}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className={styles.balloonLabel}>Tools &amp; Software</span>
                {(toolsMap[getDbKey(svc.title)] && toolsMap[getDbKey(svc.title)].length > 0
                  ? toolsMap[getDbKey(svc.title)]
                  : svc.tools
                ).map((tool, i) => (
                  <BalloonTag
                    key={`${activeIndex}-${tool}`}
                    label={tool}
                    initPos={BALLOON_POS[i] ?? BALLOON_POS[0]}
                    bobOffset={BOB_OFFSETS[i] ?? 0}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Scroll cue */}
            <div className={styles.scrollCue}>
              <div className={styles.scrollCueLine} />
              <span className={styles.scrollCueText}>scroll to explore</span>
            </div>
          </div>
        </div>

        {/* Bottom progress bar */}
        <motion.div
          className={styles.bottomBar}
          animate={{ scaleX: (activeIndex + 1) / SERVICES.length }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform' }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

/* ─── Balloon tag component ─────────────────────────────────── */
function BalloonTag({
  label,
  initPos,
  bobOffset,
}: {
  label: string;
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
        y: [initPos.y, initPos.y - 14, initPos.y],
        opacity: 1,
        scale: 1,
      }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{
        opacity: { duration: 0.4, delay: bobOffset * 0.08 },
        scale:   { duration: 0.4, delay: bobOffset * 0.08 },
        y: {
          duration: 3.2 + bobOffset * 0.3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: bobOffset * 0.5,
        },
      }}
      whileDrag={{ scale: 1.12, cursor: 'grabbing' }}
      whileHover={{ scale: 1.08 }}
    >
      {label}
    </motion.div>
  );
}
