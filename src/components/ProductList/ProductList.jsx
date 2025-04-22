import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  loadProductsFromLocalStorage, 
  removeProductFromLocalStorage 
} from '../../features/products/productsThunks';
// import { filterProducts } from '../../features/products/productsSlice';
import './ProductList.css';

const ProductList = ({ setProductToEdit }) => {
  const dispatch = useDispatch();
  const { filteredItems } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(loadProductsFromLocalStorage());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(removeProductFromLocalStorage(id));
      toast.success('Product deleted successfully');
    }
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>
      {filteredItems.length === 0 ? (
        <p>No products found. Add some products to get started.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;