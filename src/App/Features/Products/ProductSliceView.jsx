import React from 'react';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import { useDeleteProductsMutation, useGetProductsQuery } from '../../../Services/ProductApi';
import { addProduct } from './ProductSlice';

const ProductSliceView = () => {
   const dispatch = useDispatch();
   const { data, error, isLoading, isSuccess } = useGetProductsQuery();
   const [deleteProducts] = useDeleteProductsMutation();

   const handleDelete = async id => {
      await deleteProducts(id);
   };

   const handleEdit = async product => {
      console.log(product);
      await dispatch(addProduct(product));
   };

   if (isLoading) return <LoadingSpinner />;
   if (error) return <div>Error: {error?.message || 'Failed to load products.'}</div>;

   return (
      <div className='p-4'>
         <h2 className='text-2xl font-bold mb-6 text-center'>Products</h2>
         <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
            {isSuccess && data?.length > 0 ? (
               data.map(product => (
                  <div
                     key={product?.id}
                     className='bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300'
                  >
                     <img
                        src={product?.image || 'https://via.placeholder.com/300'}
                        alt={product?.title || 'Product Image'}
                        className='w-full h-64 object-cover rounded-t-lg'
                     />
                     <div className='p-4'>
                        <h3 className='text-lg font-semibold mb-2'>
                           {product?.title || 'Untitled Product'}
                        </h3>
                        <p className='text-gray-600 mb-2'>${product?.price ?? 'N/A'}</p>
                        <p className='text-sm text-gray-500 mb-4'>
                           {product?.description?.length > 100
                              ? `${product?.description.slice(0, 100)}...`
                              : product?.description || 'No description available.'}
                        </p>
                        <div className='flex items-center mb-4'>
                           <span className='text-yellow-500'>
                              ⭐ {product?.rating?.rate ?? 'N/A'}
                           </span>
                           <span className='text-gray-500 ml-2'>
                              ({product?.rating?.count ?? 0} reviews)
                           </span>
                        </div>
                        <div className='flex gap-4 justify-center'>
                           <button
                              onClick={() => handleDelete(product?.id)}
                              className='w-full h-10 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md uppercase'
                           >
                              DELETE
                           </button>
                           <button
                              onClick={() => handleEdit(product)}
                              className='w-full h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md uppercase'
                           >
                              Edit
                           </button>
                        </div>
                     </div>
                  </div>
               ))
            ) : (
               <p className='text-center text-gray-500'>No products available.</p>
            )}
         </div>
      </div>
   );
};

export default ProductSliceView;
