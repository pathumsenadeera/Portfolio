'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { SiBehance } from 'react-icons/si';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', project: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormData({ name: '', email: '', project: '', message: '' });
  };

  return (
    <section className={`${styles.contact} section`} id="contact" ref={ref}>
      <div className="grid-overlay" />
      <div className={styles.container}>
        {/* Left: info */}
        <div className={styles.leftCol}>
          <motion.div
            className="section-tag"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </motion.div>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            LET&apos;S BUILD
            <br />
            <span className="neon-text neon-glow">SOMETHING</span>
            <br />
            BOLD
          </motion.h2>
          <motion.p
            className={styles.subtext}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Have a project in mind? Let&apos;s talk about how we can bring your 
            vision to life with bold, intentional design.
          </motion.p>

          <motion.div
            className={styles.contactItems}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}><FiMail /></div>
              <div>
                <div className={styles.contactLabel}>Email</div>
                <a href="mailto:pathum@design.com" className={styles.contactValue}>
                  pathum@design.com
                </a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}><FiPhone /></div>
              <div>
                <div className={styles.contactLabel}>Phone</div>
                <a href="tel:+94771234567" className={styles.contactValue}>
                  +94 77 123 4567
                </a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}><FiMapPin /></div>
              <div>
                <div className={styles.contactLabel}>Location</div>
                <span className={styles.contactValue}>Colombo, Sri Lanka</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.socialRow}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {[
              { icon: <FiInstagram />, href: '#', label: 'Instagram' },
              { icon: <SiBehance />, href: '#', label: 'Behance' },
              { icon: <FiLinkedin />, href: '#', label: 'LinkedIn' },
            ].map(s => (
              <a key={s.label} href={s.href} aria-label={s.label} className={styles.socialIcon}>
                {s.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: Form */}
        <motion.div
          className={styles.formWrap}
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {sent ? (
            <div className={styles.successMsg}>
              <div className={styles.successIcon}>✓</div>
              <h3>Message Sent!</h3>
              <p>I&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Project Type</label>
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className={styles.select}
                  required
                >
                  <option value="">Select a service</option>
                  <option value="brand">Brand Identity</option>
                  <option value="print">Print & Editorial</option>
                  <option value="motion">Motion Graphics</option>
                  <option value="digital">Digital Design</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Tell Me About Your Project</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="Describe your project, goals, and timeline..."
                  rows={5}
                  required
                />
              </div>
              <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
                Send Message <FiSend />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
