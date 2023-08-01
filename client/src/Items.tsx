import React, { useEffect, useState, useCallback } from 'react';
import { Container } from '@mui/material';
import './App.scss';
import ItemCard from './ItemCard';
import SearchBar from './SearchBar';
import { Item } from './types';



const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/items');
      const data = await response.json() as Item[];
      setItems(data);
      setFilteredItems(data);
    } catch (error) {
      console.error('Error: ', error);
      setError('An error occurred while fetching items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = useCallback((searchTerm: string) => {
    if (searchTerm === '') {
      setFilteredItems(items);
      return;
    }
    const filtered = items.filter(item =>
      `${item.name} ${item.description} ${item.protocol}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [items]);


  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const displayItems = filteredItems || [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container className="main-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <SearchBar onSearch={handleSearch} />

          <div className="items-grid">
            {currentItems.map((item: Item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>

          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}> Previous </button>
            {Array.from({ length: Math.ceil(displayItems.length / itemsPerPage) }, (_, i) => i + 1).map(pageNum => (
              <button key={pageNum} onClick={() => handlePageChange(pageNum)}>
                {pageNum}
              </button>
            ))}
            <button disabled={currentPage === Math.ceil(displayItems.length / itemsPerPage)} onClick={() => handlePageChange(currentPage + 1)}> Next </button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Items;