'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface WorkItem {
  id: string;        // Document ID (e.g. Project-01)
  title: string;     // Same as ID or parsed
  description: string;
  type: string;
  Link: string;
  gradient: string;  // Auto-generated
  accent: string;    // Auto-generated
  pattern: string;   // Auto-generated
}

const GRADIENTS = [
  'linear-gradient(135deg, #0a0a0a 0%, #1a2a0a 50%, #0f1a0a 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #0a1520 50%, #050d15 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #100505 100%)',
  'linear-gradient(135deg, #080808 0%, #180a25 60%, #0d0515 100%)',
  'linear-gradient(135deg, #080808 0%, #1a1200 60%, #120d00 100%)',
  'linear-gradient(135deg, #080808 0%, #001a10 60%, #00100a 100%)',
  'linear-gradient(135deg, #080808 0%, #050510 60%, #03030d 100%)',
];

const ACCENTS = ['#aaff00', '#00ccff', '#ff4444', '#cc44ff', '#ffaa00', '#00ffaa', '#4488ff'];
const PATTERNS = ['cube', 'lines', 'grid', 'dots', 'waves', 'circles', 'hex'];

export function useWorks() {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const worksQuery = query(collection(db, 'Works'));
        const querySnapshot = await getDocs(worksQuery);
        
        const fetchedWorks = querySnapshot.docs.map((doc, index) => {
          const data = doc.data();
          // Generate deterministic styles based on index
          const gIndex = index % GRADIENTS.length;
          
          return {
            id: doc.id,
            // Format ID nicely if it uses dashes, e.g., "Project-01" -> "Project 01"
            title: doc.id.replace(/-/g, ' '), 
            description: data.description || '',
            type: data.type || 'WEB',
            Link: data.Link || '#',
            gradient: GRADIENTS[gIndex],
            accent: ACCENTS[gIndex],
            pattern: PATTERNS[gIndex],
          };
        });
        
        // Sort by ID to ensure Project-01, Project-02 order if IDs are named sequentially
        fetchedWorks.sort((a, b) => a.id.localeCompare(b.id));

        setWorks(fetchedWorks);
      } catch (error) {
        console.error("Error fetching works:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  return { works, loading };
}
