import { useState, useEffect } from 'react';
import { fetchInventoryItems } from '../services/inventoryService';

export const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const items = await fetchInventoryItems();
        setInventory(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadInventory();
  }, []);

  return { inventory, loading, error };
}; 