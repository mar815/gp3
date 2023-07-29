import React, { useState } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import RecyclingLocationsModal from './RecyclingLocationsModal';

interface Item {
  id: string;
  name: string;
  description: string;
  protocol: string;
  image: string;
}

interface ItemCardProps {
  item: Item;
}

const GreenButton = styled(Button)({
  background: 'green',
  '&:hover': {
    backgroundColor: 'darkgreen',
  }
});

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = async () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div
      className="item-card"
      style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}
    >
      <h2 style={{ color: theme.palette.primary.main }}>{item.name}</h2>
      <p>{item.description}</p>
      <p style={{ fontStyle: 'italic', color: theme.palette.secondary.main }}>Protocol: {item.protocol}</p>

      <GreenButton
        variant="contained"
        style={{ color: theme.palette.text.primary }}
        onClick={handleOpenModal}
      >
        Recycling Locations
      </GreenButton>

      <RecyclingLocationsModal open={openModal} handleClose={handleCloseModal} item={item} />
    </div>
  );
};

export default ItemCard;