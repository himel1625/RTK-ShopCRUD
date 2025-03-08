import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ProductApi = createApi({
   reducerPath: 'ProductApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://fakestoreapi.com',
   }),
   endpoints: builder => ({
      getProducts: builder.query({
         query: () => '/products',
      }),
   }),
});

export const { useGetProductsQuery } = ProductApi;
