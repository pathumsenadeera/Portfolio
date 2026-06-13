import Sidebar from '@/components/admin/Sidebar';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Admin Dashboard | Pathum Senadeera',
  description: 'Admin panel to manage portfolio content.',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: '250px', padding: '40px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
