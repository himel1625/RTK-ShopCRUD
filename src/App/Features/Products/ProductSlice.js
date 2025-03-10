//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   reduxProduct: [],
};

const ProductSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      addProduct: (state, action) => {
         state.reduxProduct = [...state.reduxProduct, action.payload];
      },
   },
});

export const { addProduct } = ProductSlice.actions;
// Export the reducer to be used in the store
export default ProductSlice.reducer;
