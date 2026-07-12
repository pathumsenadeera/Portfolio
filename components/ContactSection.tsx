'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiInstagram, FiLinkedin, FiGithub, FiFacebook } from 'react-icons/fi';
import { SiBehance } from 'react-icons/si';
import emailjs from '@emailjs/browser';
import styles from './ContactSection.module.css';
import { usePersonalInfo } from '@/hooks/usePersonalInfo';

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const { info, loading } = usePersonalInfo();
  const [formData, setFormData] = useState({ name: '', email: '', project: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:    formData.name,
          reply_to:     formData.email,
          project_type: formData.project,
          message:      formData.message,
        },
        PUBLIC_KEY,
      );
      setStatus('sent');
      setFormData({ name: '', email: '', project: '', message: '' });
      // Auto-reset so the form can be reused after 5 s
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
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
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
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
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}><FiMail /></div>
              <div>
                <div className={styles.contactLabel}>Email</div>
                <a href={info?.Email ? `mailto:${info.Email}` : "#"} className={styles.contactValue}>
                  {loading ? 'Loading...' : info?.Email || 'Not available'}
                </a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}><FiPhone /></div>
              <div>
                <div className={styles.contactLabel}>Phone</div>
                <a href={info?.['Contact No'] ? `tel:${info['Contact No'].replace(/\s+/g, '')}` : "#"} className={styles.contactValue}>
                  {loading ? 'Loading...' : info?.['Contact No'] || 'Not available'}
                </a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}><FiMapPin /></div>
              <div>
                <div className={styles.contactLabel}>Location</div>
                <span className={styles.contactValue}>Matara, Sri Lanka</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.socialRow}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {loading ? null : [
              { icon: <FiInstagram />, href: info?.Instagram, label: 'Instagram' },
              { icon: <SiBehance />, href: info?.Behance, label: 'Behance' },
              { icon: <FiLinkedin />, href: info?.LinkedIn, label: 'LinkedIn' },
              { icon: <FiFacebook />, href: info?.Facebook, label: 'Facebook' },
              { icon: <FiGithub />, href: info?.Github, label: 'GitHub' },
            ].filter(s => s.href).map(s => (
              <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer" className={styles.socialIcon}>
                {s.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: Form */}
        <motion.div
          className={styles.formWrap}
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {status === 'sent' ? (
            <div className={styles.successMsg}>
              <div className={styles.successIcon}>✓</div>
              <h3>Message Sent!</h3>
              <p>I&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="contact-name" className={styles.label}>Your Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="John Doe"
                    required
                    disabled={status === 'sending'}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-email" className={styles.label}>Email Address</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="john@example.com"
                    required
                    disabled={status === 'sending'}
                    suppressHydrationWarning
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-project" className={styles.label}>Project Type</label>
                <select
                  id="contact-project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className={styles.select}
                  required
                  disabled={status === 'sending'}
                >
                  <option value="">Select a service</option>
                  <option value="uiux">UI/UX Design</option>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile App Development</option>
                  <option value="graphic">Graphic Design</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-message" className={styles.label}>Tell Me About Your Project</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="Describe your project, goals, and timeline..."
                  rows={5}
                  required
                  disabled={status === 'sending'}
                />
              </div>

              {/* Error message */}
              {status === 'error' && (
                <p className={styles.errorMsg}>⚠ {errorMsg}</p>
              )}

              <button
                type="submit"
                className={`btn-primary ${styles.submitBtn}`}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <span className={styles.spinner} /> Sending…
                  </>
                ) : (
                  <>Send Message <FiSend /></>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
