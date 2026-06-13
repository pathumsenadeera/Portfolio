'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { setDoc, doc } from 'firebase/firestore';

export default function ProjectForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    description: '',
    type: '',
    Link: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.id.trim()) {
        alert('Document ID is required!');
        setLoading(false);
        return;
      }
      
      await setDoc(doc(db, 'Works', formData.id), {
        description: formData.description,
        type: formData.type,
        Link: formData.Link,
        createdAt: new Date().toISOString()
      });
      alert('Work added successfully!');
      setFormData({ id: '', description: '', type: '', Link: '' });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error adding project. Make sure your Firebase config is correct.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass" style={{ padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3 style={{ fontSize: '24px', color: 'var(--white)', marginBottom: '8px' }}>Add New Project</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ color: 'var(--gray)', fontSize: '14px' }}>Document ID (e.g., Project-01)</label>
        <input 
          type="text" 
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '12px', color: 'var(--white)', borderRadius: '8px' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ color: 'var(--gray)', fontSize: '14px' }}>Description</label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '12px', color: 'var(--white)', borderRadius: '8px' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ color: 'var(--gray)', fontSize: '14px' }}>Type (e.g., WEB)</label>
          <input 
            type="text" 
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="e.g. WEB"
            required
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '12px', color: 'var(--white)', borderRadius: '8px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ color: 'var(--gray)', fontSize: '14px' }}>Link</label>
          <input 
            type="url" 
            name="Link"
            value={formData.Link}
            onChange={handleChange}
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '12px', color: 'var(--white)', borderRadius: '8px' }}
          />
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '16px', justifyContent: 'center' }}>
        {loading ? 'Adding...' : 'Add Project'}
      </button>
    </form>
  );
}
