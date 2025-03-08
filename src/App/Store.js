   import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
   import { setupListeners } from '@reduxjs/toolkit/query';
   import { ProductApi } from '../Services/ProductApi';
   import ProductSlice from './Features/Products/ProductSlice';
   const Store = configureStore({
      reducer: {
         [ProductApi.reducerPath]: ProductApi.reducer,
         productsR: ProductSlice,
      },
      middleware: getDefaultMiddleware =>
         getDefaultMiddleware()
            .prepend(createListenerMiddleware.middleware)
            .concat(ProductApi.middleware),
   });
   export default Store;
   setupListeners(Store.dispatch);
