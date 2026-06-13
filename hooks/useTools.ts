import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface ToolsMap {
  [category: string]: string[];
}

export function useTools() {
  const [toolsMap, setToolsMap] = useState<ToolsMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const toolsRef = collection(db, 'Tools and Software');
    const unsubscribe = onSnapshot(toolsRef, (snapshot) => {
      const data: ToolsMap = {};
      snapshot.forEach((doc) => {
        const docData = doc.data();
        const toolsList = [];
        // Extract Tool_1 through Tool_5
        for (let i = 1; i <= 5; i++) {
          if (docData[`Tool_${i}`]) {
            toolsList.push(docData[`Tool_${i}`]);
          }
        }
        data[doc.id] = toolsList;
      });
      setToolsMap(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching tools:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { toolsMap, loading };
}
