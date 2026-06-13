import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', color: 'var(--white)', marginBottom: '8px' }}>
        Admin <span className="neon-text">Dashboard</span>
      </h1>
      <p style={{ color: 'var(--gray)', marginBottom: '40px', fontSize: '18px' }}>
        Welcome back. Manage your portfolio content from here.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Quick Links / Stats Cards */}
        <div className="glass" style={{ padding: '32px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--white)' }}>Projects</h3>
          <p style={{ color: 'var(--gray)', marginBottom: '24px' }}>Add, edit, or remove your creative work and projects.</p>
          <Link href="/pathum/admin/projects" className="btn-primary" style={{ padding: '10px 24px', fontSize: '12px' }}>
            Manage Projects
          </Link>
        </div>

        <div className="glass" style={{ padding: '32px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--white)' }}>Software & Tools</h3>
          <p style={{ color: 'var(--gray)', marginBottom: '24px' }}>Update the list of software and tools you use.</p>
          <Link href="/pathum/admin/tools" className="btn-primary" style={{ padding: '10px 24px', fontSize: '12px' }}>
            Manage Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
