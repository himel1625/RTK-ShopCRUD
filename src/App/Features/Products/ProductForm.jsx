import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCreateProductMutation, useUpdateProductMutation } from '../../../Services/ProductApi';

const ProductForm = () => {
   const { reduxProduct } = useSelector(state => state.productsR);
   const [createProduct] = useCreateProductMutation();
   const [updateProduct] = useUpdateProductMutation();

   const [product, setProduct] = useState({
      id: '',
      title: '',
      price: '',
      description: '',
      category: '',
      image: '',
      rating: {
         rate: '',
         count: '',
      },
   });

   // Handle reduxProduct updates efficiently
   useEffect(() => {
      if (reduxProduct) {
         const selectedProduct =
            Array.isArray(reduxProduct) && reduxProduct.length > 0 ? reduxProduct[0] : reduxProduct;

         setProduct(prevProduct => ({
            ...prevProduct,
            id: selectedProduct?.id ?? prevProduct.id,
            title: selectedProduct?.title ?? prevProduct.title,
            price: selectedProduct?.price ?? prevProduct.price,
            description: selectedProduct?.description ?? prevProduct.description,
            category: selectedProduct?.category ?? prevProduct.category,
            image: selectedProduct?.image ?? prevProduct.image,
            rating: {
               rate: selectedProduct?.rating?.rate ?? prevProduct.rating.rate,
               count: selectedProduct?.rating?.count ?? prevProduct.rating.count,
            },
         }));
      }
   }, [reduxProduct, createProduct, updateProduct]);

   // Handle input changes
   const handleChange = e => {
      const { name, value } = e.target;
      setProduct(prevProduct => ({
         ...prevProduct,
         [name.includes('rating.') ? 'rating' : name]: name.includes('rating.')
            ? { ...prevProduct.rating, [name.split('.')[1]]: value }
            : value,
      }));
   };

   // Handle form submission
   const handleSubmit = async e => {
      e.preventDefault();
      if (product.id) {
         const { id, ...updatedFields } = product;
         await updateProduct({ id, ...updatedFields });
      } else {
         const newProduct = { ...product, id: nanoid() };
         await createProduct(newProduct);
      }
   };

   return (
      <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md'>
         <h2 className='text-2xl font-semibold text-center mb-6'>Product Form</h2>
         <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
               <label className='block text-sm font-medium text-gray-700'>Title:</label>
               <input
                  type='text'
                  name='title'
                  value={product.title}
                  onChange={handleChange}
                  placeholder='Enter product title'
                  className='w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
               />
            </div>

            <div>
               <label className='block text-sm font-medium text-gray-700'>Price:</label>
               <input
                  type='number'
                  name='price'
                  value={product.price}
                  onChange={handleChange}
                  placeholder='Enter product price'
                  className='w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
               />
            </div>

            <div>
               <label className='block text-sm font-medium text-gray-700'>Description:</label>
               <textarea
                  name='description'
                  value={product.description}
                  onChange={handleChange}
                  placeholder='Enter product description'
                  className='w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
               />
            </div>

            <div>
               <label className='block text-sm font-medium text-gray-700'>Category:</label>
               <input
                  type='text'
                  name='category'
                  value={product.category}
                  onChange={handleChange}
                  placeholder='Enter product category'
                  className='w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
               />
            </div>

            <div>
               <label className='block text-sm font-medium text-gray-700'>Image URL:</label>
               <input
                  type='url'
                  name='image'
                  value={product.image}
                  onChange={handleChange}
                  placeholder='Enter product image URL'
                  className='w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
               />
            </div>

            <div>
               <label className='block text-sm font-medium text-gray-700'>Rating - Rate:</label>
               <input
                  type='number'
                  name='rating.rate'
                  value={product.rating.rate}
                  onChange={handleChange}
                  placeholder='Enter product rating rate'
                  className='w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
               />
            </div>

            <div>
               <label className='block text-sm font-medium text-gray-700'>Rating - Count:</label>
               <input
                  type='number'
                  name='rating.count'
                  value={product.rating.count}
                  onChange={handleChange}
                  placeholder='Enter product rating count'
                  className='w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
               />
            </div>

            <div className='col-span-2 text-center'>
               <button
                  type='submit'
                  className='w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
               >
                  {product.id ? 'Update Product' : 'Submit'}
               </button>
            </div>
         </form>
      </div>
   );
};

export default ProductForm;
