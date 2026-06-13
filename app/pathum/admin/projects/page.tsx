'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import ProjectForm from '@/components/admin/ProjectForm';
import { FiTrash2 } from 'react-icons/fi';

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'Works'));
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'Works', id));
        fetchProjects(); // Refresh the list
      } catch (error) {
        console.error("Error deleting project: ", error);
        alert('Failed to delete project.');
      }
    }
  };

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', color: 'var(--white)', marginBottom: '8px' }}>
        Manage <span className="neon-text">Projects</span>
      </h1>
      <p style={{ color: 'var(--gray)', marginBottom: '40px' }}>
        Add, edit, or remove projects from your portfolio database.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px', alignItems: 'start' }}>
        {/* Left Side: Add Form */}
        <div style={{ position: 'sticky', top: '40px' }}>
          <ProjectForm onSuccess={fetchProjects} />
        </div>

        {/* Right Side: List of Projects */}
        <div className="glass" style={{ padding: '32px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '24px', color: 'var(--white)', marginBottom: '24px' }}>Existing Projects</h3>
          
          {loading ? (
            <p style={{ color: 'var(--gray)' }}>Loading projects...</p>
          ) : projects.length === 0 ? (
            <p style={{ color: 'var(--gray)' }}>No projects found. Add one to get started.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {projects.map((project) => (
                <div key={project.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <div>
                    <h4 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '4px' }}>{project.id}</h4>
                    <span style={{ color: 'var(--neon)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{project.type}</span>
                  </div>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', padding: '8px' }}
                    title="Delete Project"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
