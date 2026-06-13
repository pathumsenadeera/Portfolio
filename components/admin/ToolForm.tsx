'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function ToolForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    iconUrl: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'tools'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      alert('Tool added successfully!');
      setFormData({ name: '', category: '', iconUrl: '' });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error adding tool: ', error);
      alert('Error adding tool. Make sure your Firebase config is correct.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass" style={{ padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3 style={{ fontSize: '24px', color: 'var(--white)', marginBottom: '8px' }}>Add New Tool</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ color: 'var(--gray)', fontSize: '14px' }}>Name</label>
        <input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g. Figma, React, etc."
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '12px', color: 'var(--white)', borderRadius: '8px' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ color: 'var(--gray)', fontSize: '14px' }}>Category</label>
        <input 
          type="text" 
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          placeholder="e.g. Design, Development"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '12px', color: 'var(--white)', borderRadius: '8px' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ color: 'var(--gray)', fontSize: '14px' }}>Icon URL</label>
        <input 
          type="url" 
          name="iconUrl"
          value={formData.iconUrl}
          onChange={handleChange}
          required
          placeholder="https://.../icon.png"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '12px', color: 'var(--white)', borderRadius: '8px' }}
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '16px', justifyContent: 'center' }}>
        {loading ? 'Adding...' : 'Add Tool'}
      </button>
    </form>
  );
}
