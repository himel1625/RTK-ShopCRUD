import React from 'react';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import { useGetProductsQuery } from '../../../Services/ProductApi';

const ProductSliceView = () => {
   const { data, error, isLoading, isSuccess } = useGetProductsQuery();

   if (isLoading) return <LoadingSpinner />;

   if (error) return <div>Error: {error.message}</div>;

   return (
      <div className='p-4'>
         <h2 className='text-2xl font-bold mb-4'>Products</h2>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {isSuccess &&
               data?.map(product => (
                  <div key={product.id} className='border rounded-lg p-4 shadow-lg'>
                     <img
                        src={product.image}
                        alt={product.title}
                        className='w-full h-64 object-cover mb-4 rounded-md'
                     />
                     <h3 className='text-lg font-semibold mb-2'>{product.title}</h3>
                     <p className='text-gray-600 mb-2'>${product.price}</p>
                     <p className='text-sm text-gray-500 mb-2'>
                        {product.description.length > 100
                           ? `${product.description.slice(0, 100)}...`
                           : product.description}
                     </p>
                     <div className='flex items-center'>
                        <span className='text-yellow-500'>⭐ {product.rating.rate}</span>
                        <span className='text-gray-500 ml-2'>({product.rating.count} reviews)</span>
                     </div>
                  </div>
               ))}
         </div>
      </div>
   );
};

export default ProductSliceView;
