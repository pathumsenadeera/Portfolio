'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface PersonalInfo {
  Behance?: string;
  'Contact No'?: string;
  Email?: string;
  Facebook?: string;
  Github?: string;
  Instagram?: string;
  LinkedIn?: string;
  Medium?: string;
}

export function usePersonalInfo() {
  const [info, setInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        // Matching your exact collection name (with space) and typo'd document ID
        const docRef = doc(db, 'Personal Information', 'Infromation');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setInfo(docSnap.data() as PersonalInfo);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching personal info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  return { info, loading };
}
