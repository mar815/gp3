import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import Map from './Map';
import { Item } from './types';

interface RecyclingLocationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item;
}

const RecyclingLocationsModal: React.FC<RecyclingLocationsModalProps> = ({ isOpen, onClose, item }) => {
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Fetch recycling locations for the provided item when the modal opens
      const fetchRecyclingLocations = async () => {
        try {
          const response = await fetch(`/api/locations?item=${item.name}`);
          const data = await response.json();
          setLocations(data);
        } catch (error) {
          console.error('Error fetching recycling locations:', error);
        }
      };

      fetchRecyclingLocations();
    }
  }, [isOpen, item]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div>
        <h2>Recycling Locations for {item.name}</h2>
        <Map locations={locations} />
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default RecyclingLocationsModal;
