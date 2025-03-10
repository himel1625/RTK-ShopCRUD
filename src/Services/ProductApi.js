import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ProductApi = createApi({
   reducerPath: 'ProductApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:4004/',
   }),
   tagTypes: ['products'],
   endpoints: builder => ({
      getProducts: builder.query({
         query: () => 'products',
         providesTags: result =>
            result
               ? [
                    ...result.map(id => [{ type: 'product', id }], {
                       type: 'product',
                       id: 'LIST',
                    }),
                 ]
               : [{ type: 'product', id: 'LIST' }],
      }),
      deleteProducts: builder.mutation({
         query: id => ({
            url: `products/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: (results, id) => [
            {
               type: 'product',
               id,
            },
         ],
      }),
      createProduct: builder.mutation({
         query: body => ({
            url: 'products/',
            method: 'POST',
            body,
         }),
         invalidatesTags: () => [
            {
               type: 'product',
               id: 'LIST',
            },
         ],
      }),
      updateProduct: builder.mutation({
         query: ({ id, ...updatedFields }) => ({
            url: `products/${id}`,
            method: 'PUT',
            body: updatedFields,
         }),
         invalidatesTags: ({ id }) => [
            {
               type: 'product',
               id: id,
            },
         ],
      }),
   }),
});

export const {
   useGetProductsQuery,
   useDeleteProductsMutation,
   useCreateProductMutation,
   useUpdateProductMutation,
} = ProductApi;
