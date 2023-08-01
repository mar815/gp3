import React, { useEffect, useState, useCallback } from 'react';
import { Container } from '@mui/material';
import './App.scss';
import ItemCard from './ItemCard';
import SearchBar from './SearchBar';
import { Item } from './types';

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);

  // Function to fetch items based on search term
  const fetchItems = useCallback(async (term: string) => {
    try {
      let url = '/api/items';
      if (term) {
        url += `?term=${term}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }, []);

  useEffect(() => {
    // Fetch all items on initial render
    fetchItems('');
  }, [fetchItems]);

  return (
    <Container>
      <SearchBar onSearch={fetchItems} />
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </Container>
  );
};

export default Items;
