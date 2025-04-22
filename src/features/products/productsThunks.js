import { setProducts, addProduct, updateProduct, deleteProduct } from './productsSlice';

export const loadProductsFromLocalStorage = () => (dispatch) => {
  try {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    dispatch(setProducts(products));
  } catch (error) {
    console.error('Error loading products from localStorage:', error);
  }
};

export const saveProductToLocalStorage = (product) => (dispatch) => {
  try {
    dispatch(addProduct(product));
    const products = JSON.parse(localStorage.getItem('products')) || [];
    localStorage.setItem('products', JSON.stringify([...products, product]));
  } catch (error) {
    console.error('Error saving product to localStorage:', error);
  }
};

export const updateProductInLocalStorage = (product) => (dispatch) => {
  try {
    dispatch(updateProduct(product));
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = products.map(p => 
      p.id === product.id ? product : p
    );
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  } catch (error) {
    console.error('Error updating product in localStorage:', error);
  }
};

export const removeProductFromLocalStorage = (id) => (dispatch) => {
  try {
    dispatch(deleteProduct(id));
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  } catch (error) {
    console.error('Error removing product from localStorage:', error);
  }
};