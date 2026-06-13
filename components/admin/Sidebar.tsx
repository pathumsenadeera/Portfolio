'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiGrid, FiTool, FiArrowLeft, FiPenTool, FiUser } from 'react-icons/fi';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/pathum/admin', icon: <FiHome /> },
    { name: 'Personal Info', path: '/pathum/admin/personal-info', icon: <FiUser /> },
    { name: 'Projects', path: '/pathum/admin/projects', icon: <FiGrid /> },
    { name: 'Tools & Software', path: '/pathum/admin/tools', icon: <FiTool /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        P<span>.</span> <FiPenTool style={{ color: 'var(--neon)', fontSize: '0.8em' }} /> ADMIN
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className={styles.bottomSection}>
        <Link href="/" className={styles.backLink}>
          <FiArrowLeft /> Back to Main Site
        </Link>
      </div>
    </aside>
  );
}
