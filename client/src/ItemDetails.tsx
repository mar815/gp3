import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Item {
  id: string;
  name: string;
  description: string;
  protocol: string;
  image: string;
}

interface Props {
  item: Item | null;
  onClose: () => void;
}

const GreenButton = styled(Button)({
  background: '#17B978',
  '&:hover': {
    backgroundColor: '#128C7E',
  },
  color: '#F4F9F9',
});

const ItemDetails: React.FC<Props> = ({ item: propsItem, onClose }) => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(propsItem);

  useEffect(() => {
    if (!item) {
      fetch(`/items/${id}`)
        .then(res => res.json())
        .then(data => {
          setItem(data as Item);
        })
        .catch(console.error);
    }
  }, [id, item]);

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      <h2 style={{ color: theme.palette.primary.main }}>{item.name}</h2>
      <p>{item.description}</p>
      <p style={{ fontStyle: 'italic', color: theme.palette.secondary.main }}>Protocol: {item.protocol}</p>
      {/* <img src={item.image} alt={item.name} style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} /> */}
      <GreenButton variant="contained" onClick={onClose}>Close</GreenButton>
    </div>
  );
}

export default ItemDetails;