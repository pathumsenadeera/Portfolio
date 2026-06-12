'use client';
import styles from './MarqueeSection.module.css';

const TEXT_ITEMS_1 = [
  "CREATIVE DIRECTOR", "VISUAL ARTIST", "BRAND IDENTITY", "UI/UX DESIGN", "MOTION GRAPHICS"
];

const TEXT_ITEMS_2 = [
  "INNOVATIVE THINKER", "PIXEL PERFECT", "DIGITAL EXPERIENCES", "WEB DEVELOPMENT", "PROBLEM SOLVER"
];

const TEXT_ITEMS_3 = [
  "BOLD VISUALS", "AESTHETIC EXCELLENCE", "CINEMATIC DESIGN", "CREATIVE BOUNDARIES", "STORYTELLING"
];

// Create a long array that easily covers the screen width several times
const createRepeatedArray = (items: string[]) => {
  const half = Array(10).fill(items).flat();
  return [...half, ...half]; // Double it so we can slide from 0 to -50% seamlessly
};

export default function MarqueeSection() {
  return (
    <section className={styles.marqueeSection}>
      {/* Background Grid Pattern */}
      <div className="grid-overlay" style={{ zIndex: 0 }} />

      {/* Ribbon 3 (Back-most) */}
      <div className={`${styles.ribbon} ${styles.ribbon3}`}>
        <div className={styles.marqueeTrack}>
          {createRepeatedArray(TEXT_ITEMS_3).map((text, i) => (
            <span key={`r3-${i}`} className={styles.marqueeItem}>
              {text} <span className={styles.dot}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Ribbon 2 (Middle) */}
      <div className={`${styles.ribbon} ${styles.ribbon2}`}>
        <div className={styles.marqueeTrackReverse}>
          {createRepeatedArray(TEXT_ITEMS_2).map((text, i) => (
            <span key={`r2-${i}`} className={styles.marqueeItem}>
              {text} <span className={styles.dot}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Ribbon 1 (Front-most) */}
      <div className={`${styles.ribbon} ${styles.ribbon1}`}>
        <div className={styles.marqueeTrack}>
          {createRepeatedArray(TEXT_ITEMS_1).map((text, i) => (
            <span key={`r1-${i}`} className={styles.marqueeItem}>
              {text} <span className={styles.dot}>•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
