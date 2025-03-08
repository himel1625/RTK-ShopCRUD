//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   Products: [],
   IsLoading: false,
   error: null,
};

// Slice to manage the products state, including async actions and reducers
const ProductSlice = createSlice({
   name: 'products',
   initialState,
});

// Export the reducer to be used in the store
export default ProductSlice.reducer;
