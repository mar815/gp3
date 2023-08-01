import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [term, setTerm] = useState<string>('');
  const [searchDebounce, setSearchDebounce] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchDebounce);
    }, 500);  // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchDebounce, onSearch]);

  return (
    <input
      type="text"
      value={term}
      onChange={(e) => {
        setTerm(e.target.value);
        setSearchDebounce(e.target.value);
      }}
      placeholder="Search for items to recycle..."
    />
  );
};

export default SearchBar;
