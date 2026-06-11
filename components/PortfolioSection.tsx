'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiArrowRight, FiExternalLink } from 'react-icons/fi';
import styles from './PortfolioSection.module.css';

const categories = ['All', 'Branding', 'Motion', 'Print', 'Digital'];

const projects = [
  {
    id: 1,
    title: 'Felicitious Event',
    category: 'Branding',
    description: 'Bold neon event identity design with 3D elements and vibrant green accents.',
    tags: ['Brand Identity', '3D Design', 'Event'],
    color: '#aaff00',
    featured: true,
  },
  {
    id: 2,
    title: 'Metal Expert Visual',
    category: 'Print',
    description: 'Dramatic key visual design with cinematic portrait and bold typography.',
    tags: ['Print', 'Visual Identity', 'Typography'],
    color: '#aaff00',
    featured: true,
  },
  {
    id: 3,
    title: 'Dark Matter Brand',
    category: 'Branding',
    description: 'Minimalist dark brand identity with neon accent strategy.',
    tags: ['Brand', 'Logo', 'Guidelines'],
    color: '#aaff00',
    featured: false,
  },
  {
    id: 4,
    title: 'Neon City Poster',
    category: 'Digital',
    description: 'Cyberpunk-inspired urban poster series with glitch aesthetics.',
    tags: ['Poster', 'Digital Art', 'Motion'],
    color: '#aaff00',
    featured: false,
  },
  {
    id: 5,
    title: 'Apex Motion Reel',
    category: 'Motion',
    description: 'Dynamic motion graphics reel with kinetic typography sequences.',
    tags: ['Motion', 'After Effects', 'Animation'],
    color: '#aaff00',
    featured: false,
  },
  {
    id: 6,
    title: 'Urban Collective',
    category: 'Print',
    description: 'Street culture magazine layout with editorial photo direction.',
    tags: ['Editorial', 'Layout', 'Print'],
    color: '#aaff00',
    featured: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function PortfolioSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className={`${styles.portfolio} section`} id="work" ref={ref}>
      <div className="grid-overlay" />
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.div
            className="section-tag"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Selected Work
          </motion.div>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            CRAFTED WITH
            <br />
            <span className="neon-text neon-glow">INTENTION</span>
          </motion.h2>

          {/* Filter buttons */}
          <motion.div
            className={styles.filters}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <div className={styles.grid}>
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              className={`${styles.card} ${project.featured ? styles.featured : ''}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {/* Card visual area */}
              <div className={styles.cardVisual}>
                <div className={styles.cardBg}>
                  <div className={styles.cardGlow} />
                  <div className={styles.cardPattern} />
                  <div className={styles.cardNum}>{String(project.id).padStart(2, '0')}</div>
                </div>
                <div className={styles.cardOverlay}>
                  <a href="#" className={styles.viewBtn}>
                    <FiExternalLink />
                    View Project
                  </a>
                </div>
              </div>

              {/* Card info */}
              <div className={styles.cardInfo}>
                <div className={styles.cardMeta}>
                  <span className={styles.cardCategory}>{project.category}</span>
                  {project.featured && <span className={styles.featuredBadge}>Featured</span>}
                </div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                <div className={styles.cardTags}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.viewAll}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <a href="#" className="btn-outline">
            View All Projects <FiArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
