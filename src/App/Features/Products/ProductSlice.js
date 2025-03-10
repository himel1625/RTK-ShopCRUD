//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   Products: [],
};

// Slice to manage the products state, including async actions and reducers
const ProductSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      addProduct: (state, action) => {
         state.Products.push(action.payload);
      },
   },
});
export const { addProduct } = ProductSlice.actions;
// Export the reducer to be used in the store
export default ProductSlice.reducer;
