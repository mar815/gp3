import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(({ onSearch }) => {
  const theme = useTheme();
  const [term, setTerm] = useState('');

  const CustomTextField = styled(TextField)({
    '& label': {
      color: theme.palette.text.primary,
    },
    '& label.Mui-focused': {
      color: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiInputBase-input': {
      color: theme.palette.text.primary,
      background: theme.palette.secondary.light,
    },
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      onSearch(term);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [term, onSearch]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value;
    setTerm(newTerm);
  };

  return (
    <div className="search-container">
      <TextField
        label="Search items..."
        variant="outlined"
        className="search-bar"
        value={term}
        onChange={onInputChange}
      />
    </div>
  );
});

export default SearchBar;