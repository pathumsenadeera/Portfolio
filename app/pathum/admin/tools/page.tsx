'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import ToolForm from '@/components/admin/ToolForm';
import { FiTrash2 } from 'react-icons/fi';

export default function ToolsAdminPage() {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTools = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'tools'));
      const toolsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTools(toolsData);
    } catch (error) {
      console.error("Error fetching tools: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this tool?')) {
      try {
        await deleteDoc(doc(db, 'tools', id));
        fetchTools(); // Refresh the list
      } catch (error) {
        console.error("Error deleting tool: ", error);
        alert('Failed to delete tool.');
      }
    }
  };

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', color: 'var(--white)', marginBottom: '8px' }}>
        Manage <span className="neon-text">Tools</span>
      </h1>
      <p style={{ color: 'var(--gray)', marginBottom: '40px' }}>
        Add or remove software and tools you use from your database.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px', alignItems: 'start' }}>
        {/* Left Side: Add Form */}
        <div style={{ position: 'sticky', top: '40px' }}>
          <ToolForm onSuccess={fetchTools} />
        </div>

        {/* Right Side: List of Tools */}
        <div className="glass" style={{ padding: '32px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '24px', color: 'var(--white)', marginBottom: '24px' }}>Existing Tools</h3>
          
          {loading ? (
            <p style={{ color: 'var(--gray)' }}>Loading tools...</p>
          ) : tools.length === 0 ? (
            <p style={{ color: 'var(--gray)' }}>No tools found. Add one to get started.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {tools.map((tool) => (
                <div key={tool.id} style={{ display: 'flex', flexDirection: 'column', padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--bg-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      {tool.iconUrl ? (
                        <img src={tool.iconUrl} alt={tool.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      ) : (
                        <span style={{ color: 'var(--gray)' }}>?</span>
                      )}
                    </div>
                    <button 
                      onClick={() => handleDelete(tool.id)}
                      style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', padding: '4px' }}
                      title="Delete Tool"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                  <h4 style={{ color: 'var(--white)', fontSize: '16px', marginBottom: '4px' }}>{tool.name}</h4>
                  <span style={{ color: 'var(--neon)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>{tool.category}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
