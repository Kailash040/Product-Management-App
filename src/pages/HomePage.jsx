import React, { useState } from 'react';
import ProductForm from '../components/ProductForm/ProductForm';
import ProductList from '../components/ProductList/ProductList';
import SearchBar from '../components/SearchBar/SearchBar';
import './HomePage.css';

const HomePage = () => {
  const [productToEdit, setProductToEdit] = useState(null);

  return (
    <div className="home-page">
      <div className='product_container'>
      <h1>Product Management</h1>

      <ProductForm 
        productToEdit={productToEdit} 
        setProductToEdit={setProductToEdit} 
      />
      </div>
      <div>

      <SearchBar />
      <ProductList setProductToEdit={setProductToEdit} />
      </div>
    </div>
  );
};

export default HomePage;