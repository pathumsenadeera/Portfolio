'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ToolForm from '@/components/admin/ToolForm';

export default function ToolsAdminPage() {
  const [toolsMap, setToolsMap] = useState<Record<string, Record<string, unknown>>>({});
  const [loading, setLoading] = useState(true);

  const fetchTools = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'Tools and Software'));
      const data: Record<string, Record<string, unknown>> = {};
      querySnapshot.forEach(doc => {
        data[doc.id] = doc.data();
      });
      setToolsMap(data);
    } catch (error) {
      console.error("Error fetching tools: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => { fetchTools(); });
  }, []);

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', color: 'var(--white)', marginBottom: '8px' }}>
        Manage <span className="neon-text">Tools</span>
      </h1>
      <p style={{ color: 'var(--gray)', marginBottom: '40px' }}>
        Update the software and tools listed under each of your 4 services.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px', alignItems: 'start' }}>
        {/* Left Side: Edit Form */}
        <div style={{ position: 'sticky', top: '40px' }}>
          <ToolForm onSuccess={fetchTools} />
        </div>

        {/* Right Side: List of Current Tools */}
        <div className="glass" style={{ padding: '32px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '24px', color: 'var(--white)', marginBottom: '24px' }}>Current Tools</h3>
          
          {loading ? (
            <p style={{ color: 'var(--gray)' }}>Loading tools...</p>
          ) : Object.keys(toolsMap).length === 0 ? (
            <p style={{ color: 'var(--gray)' }}>No tools found in the database. Update them on the left.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {['Graphic Design', 'Mobile App Development', 'UI_UX Design', 'Web development'].map((cat) => {
                const docData = toolsMap[cat];
                if (!docData) return null;
                
                const tools = [docData.Tool_1, docData.Tool_2, docData.Tool_3, docData.Tool_4, docData.Tool_5].filter(Boolean);
                
                if (tools.length === 0) return null;

                return (
                  <div key={cat} style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <h4 style={{ color: 'var(--neon)', fontSize: '18px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                      {cat.replace('_', '/')}
                    </h4>
                    <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', listStyle: 'none' }}>
                      {tools.map((tool, i) => (
                        <li key={i} style={{ background: 'var(--bg-primary)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', border: '1px solid var(--border)' }}>
                          {String(tool ?? '')}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
