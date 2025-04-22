import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filteredItems: [],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
      state.filteredItems.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        state.filteredItems = state.items;
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      state.filteredItems = state.filteredItems.filter(p => p.id !== action.payload);
    },
    filterProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredItems = state.items.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      );
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct, filterProducts } = productsSlice.actions;

export default productsSlice.reducer;