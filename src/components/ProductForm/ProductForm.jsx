import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  saveProductToLocalStorage, 
  updateProductInLocalStorage 
} from '../../features/products/productsThunks';
import './ProductForm.css';

const ProductForm = ({ productToEdit, setProductToEdit }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: ''
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!product.name || !product.price || !product.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const productData = {
      ...product,
      id: productToEdit ? product.id : Date.now(),
      price: parseFloat(product.price)
    };

    if (productToEdit) {
      dispatch(updateProductInLocalStorage(productData));
      toast.success('Product updated successfully');
    } else {
      dispatch(saveProductToLocalStorage(productData));
      toast.success('Product added successfully');
    }

    setProduct({
      name: '',
      price: '',
      category: '',
      description: ''
    });
    
    if (productToEdit) {
      setProductToEdit(null);
    }
  };

  return (
    <div className="product-form">
      <h2>{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name*</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price*</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label>Category*</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-btn">
          {productToEdit ? 'Update Product' : 'Add Product'}
        </button>
        {productToEdit && (
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => setProductToEdit(null)}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default ProductForm;