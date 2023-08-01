import React, { useState } from 'react';
import { Button } from '@mui/material';
import RecyclingLocationsModal from './RecyclingLocationsModal';
import { Item } from './types';

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="item-card">
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <h3>Recycling Protocol:</h3>
      <p>{item.protocol}</p>
      <Button onClick={handleOpenModal}>Recycling Locations</Button>
      <RecyclingLocationsModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        item={item}
      />
    </div>
  );
};

export default ItemCard;
