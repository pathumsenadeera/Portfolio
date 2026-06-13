'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiHome, FiGrid, FiTool, FiArrowLeft, FiPenTool, FiUser, FiLogOut } from 'react-icons/fi';
import styles from './Sidebar.module.css';
import { useAuth } from '@/hooks/useAuth';

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', path: '/pathum/admin', icon: <FiHome /> },
    { name: 'Personal Info', path: '/pathum/admin/personal-info', icon: <FiUser /> },
    { name: 'Projects', path: '/pathum/admin/projects', icon: <FiGrid /> },
    { name: 'Tools & Software', path: '/pathum/admin/tools', icon: <FiTool /> },
  ];

  const handleLogout = async () => {
    await logout();
    router.replace('/pathum/admin/login');
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        P<span>.</span> <FiPenTool style={{ color: 'var(--neon)', fontSize: '0.8em' }} /> ADMIN
      </div>

      {user && (
        <div style={{
          padding: '8px 16px 16px',
          fontSize: '12px', color: 'var(--gray)',
          borderBottom: '1px solid var(--border)',
          marginBottom: '8px',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {user.email}
        </div>
      )}

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
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'none', border: '1px solid rgba(255,68,68,0.3)',
            borderRadius: '8px', padding: '10px 14px',
            color: '#ff6b6b', cursor: 'pointer', fontSize: '13px',
            width: '100%', marginTop: '8px', transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,68,68,0.1)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#ff4444';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'none';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,68,68,0.3)';
          }}
        >
          <FiLogOut /> Sign Out
        </button>
      </div>
    </aside>
  );
}
