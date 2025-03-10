import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ProductApi } from '../Services/ProductApi';
import ProductReducer from './Features/Products/ProductSlice';
const Store = configureStore({
   reducer: {
      productsR: ProductReducer,
      [ProductApi.reducerPath]: ProductApi.reducer,
   },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
         .prepend(createListenerMiddleware().middleware)
         .concat(ProductApi.middleware),
});
setupListeners(Store.dispatch);
export default Store;
