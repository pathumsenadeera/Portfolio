'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function PersonalInfoAdminPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    Email: '',
    'Contact No': '',
    Facebook: '',
    Instagram: '',
    LinkedIn: '',
    Github: '',
    Behance: '',
    Medium: ''
  });

  const fetchInfo = async () => {
    setFetching(true);
    try {
      const docRef = doc(db, 'Personal Information', 'Infromation');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          Email: data.Email || '',
          'Contact No': data['Contact No'] || '',
          Facebook: data.Facebook || '',
          Instagram: data.Instagram || '',
          LinkedIn: data.LinkedIn || '',
          Github: data.Github || '',
          Behance: data.Behance || '',
          Medium: data.Medium || ''
        });
      }
    } catch (error) {
      console.error('Error fetching personal info:', error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => { fetchInfo(); });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, 'Personal Information', 'Infromation'), formData, { merge: true });
      alert('Personal Information updated successfully!');
    } catch (error) {
      console.error('Error updating info: ', error);
      alert('Error updating information. Check rules or config.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', color: 'var(--white)', marginBottom: '8px' }}>
        Manage <span className="neon-text">Personal Info</span>
      </h1>
      <p style={{ color: 'var(--gray)', marginBottom: '40px' }}>
        Update your email, contact number, and social media links across the entire site.
      </p>

      {fetching ? (
        <p style={{ color: 'var(--gray)' }}>Loading your information...</p>
      ) : (
        <form onSubmit={handleSubmit} className="glass" style={{ padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--gray)', fontSize: '14px' }}>Email Address</label>
              <input 
                type="email" 
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '12px', color: 'var(--white)', borderRadius: '8px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--gray)', fontSize: '14px' }}>Contact Number</label>
              <input 
                type="text" 
                name="Contact No"
                value={formData['Contact No']}
                onChange={handleChange}
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '12px', color: 'var(--white)', borderRadius: '8px' }}
              />
            </div>
          </div>

          <h3 style={{ fontSize: '20px', color: 'var(--white)', marginTop: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>Social Links</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {['Facebook', 'Instagram', 'LinkedIn', 'Github', 'Behance', 'Medium'].map(platform => (
              <div key={platform} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'var(--gray)', fontSize: '14px' }}>{platform}</label>
                <input 
                  type="url" 
                  name={platform}
                  value={(formData as Record<string, string>)[platform]}
                  onChange={handleChange}
                  placeholder={`https://${platform.toLowerCase()}.com/...`}
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '12px', color: 'var(--white)', borderRadius: '8px' }}
                />
              </div>
            ))}
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '24px', alignSelf: 'flex-start' }}>
            {loading ? 'Saving Changes...' : 'Save Information'}
          </button>
        </form>
      )}
    </div>
  );
}
