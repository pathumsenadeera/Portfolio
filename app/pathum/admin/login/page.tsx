'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { FiLock, FiMail, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.replace('/pathum/admin');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-primary)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(170,255,0,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="grid-overlay" />

      {/* Login Card */}
      <div className="glass" style={{
        width: '100%', maxWidth: '440px', padding: '48px 40px',
        borderRadius: '24px', position: 'relative', zIndex: 1,
        border: '1px solid rgba(170,255,0,0.12)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #aaff00, #66cc00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '28px', fontWeight: '900', color: '#000',
            fontFamily: 'var(--font-display)',
            boxShadow: '0 0 30px rgba(170,255,0,0.3)',
          }}>P</div>
          <h1 style={{ fontSize: '28px', fontFamily: 'var(--font-display)', color: 'var(--white)', marginBottom: '6px' }}>
            Admin <span className="neon-text">Login</span>
          </h1>
          <p style={{ color: 'var(--gray)', fontSize: '14px' }}>Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'var(--gray)', fontSize: '13px', fontWeight: '500', letterSpacing: '0.05em' }}>
              EMAIL ADDRESS
            </label>
            <div style={{ position: 'relative' }}>
              <FiMail style={{
                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                color: 'var(--gray)', fontSize: '16px',
              }} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                style={{
                  width: '100%', padding: '14px 14px 14px 44px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px', color: 'var(--white)',
                  fontSize: '15px', outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#aaff00'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'var(--gray)', fontSize: '13px', fontWeight: '500', letterSpacing: '0.05em' }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <FiLock style={{
                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                color: 'var(--gray)', fontSize: '16px',
              }} />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '14px 44px 14px 44px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px', color: 'var(--white)',
                  fontSize: '15px', outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#aaff00'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                style={{
                  position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--gray)', fontSize: '16px', padding: '4px',
                }}
              >
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              padding: '12px 16px', borderRadius: '10px',
              background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.3)',
              color: '#ff6b6b', fontSize: '14px',
            }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: '100%', justifyContent: 'center', padding: '14px',
              fontSize: '15px', marginTop: '4px',
              opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            <FiLogIn />
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
