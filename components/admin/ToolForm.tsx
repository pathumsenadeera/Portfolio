'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const categories = [
  'Graphic Design',
  'Mobile App Development',
  'UI_UX Design',
  'Web development'
];

export default function ToolForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [category, setCategory] = useState(categories[0]);
  const [formData, setFormData] = useState({
    Tool_1: '',
    Tool_2: '',
    Tool_3: '',
    Tool_4: '',
    Tool_5: ''
  });

  const fetchCategoryTools = async (cat: string) => {
    setFetching(true);
    try {
      const docRef = doc(db, 'Tools and Software', cat);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          Tool_1: data.Tool_1 || '',
          Tool_2: data.Tool_2 || '',
          Tool_3: data.Tool_3 || '',
          Tool_4: data.Tool_4 || '',
          Tool_5: data.Tool_5 || ''
        });
      } else {
        setFormData({ Tool_1: '', Tool_2: '', Tool_3: '', Tool_4: '', Tool_5: '' });
      }
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCategoryTools(category);
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setCategory(value);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, 'Tools and Software', category), formData, { merge: true });
      alert('Tools updated successfully!');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error updating tools: ', error);
      alert('Error updating tools. Check rules or config.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass" style={{ padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3 style={{ fontSize: '24px', color: 'var(--white)', marginBottom: '8px' }}>Update Tools</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ color: 'var(--gray)', fontSize: '14px' }}>Service Category</label>
        <select 
          name="category"
          value={category}
          onChange={handleChange}
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '12px', color: 'var(--white)', borderRadius: '8px', cursor: 'pointer' }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.replace('_', '/')}</option>
          ))}
        </select>
      </div>

      {fetching ? (
        <p style={{ color: 'var(--gray)' }}>Loading tools...</p>
      ) : (
        <>
          {[1, 2, 3, 4, 5].map(num => (
            <div key={`Tool_${num}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--gray)', fontSize: '14px' }}>Tool {num}</label>
              <input 
                type="text" 
                name={`Tool_${num}`}
                value={(formData as any)[`Tool_${num}`]}
                onChange={handleChange}
                placeholder={`e.g. Next.js, Figma...`}
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '12px', color: 'var(--white)', borderRadius: '8px' }}
              />
            </div>
          ))}
        </>
      )}

      <button type="submit" disabled={loading || fetching} className="btn-primary" style={{ marginTop: '16px', justifyContent: 'center' }}>
        {loading ? 'Updating...' : 'Update Tools'}
      </button>
    </form>
  );
}
