import React from 'react';
import { useDispatch } from 'react-redux';
import { filterProducts } from '../../features/products/productsSlice';
import './SearchBar.css';

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(filterProducts(e.target.value));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name or category..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;