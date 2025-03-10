import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ProductApi = createApi({
   reducerPath: 'ProductApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:4004/',
   }),
   endpoints: builder => ({
      getProducts: builder.query({
         query: () => 'products',
      }),
      deleteProducts: builder.mutation({
         query: id => ({
            url: `products/${id}`,
            method: 'DELETE',
         }),
      }),
   }),
});

export const { useGetProductsQuery, useDeleteProductsMutation } = ProductApi;
