import React, { useState, useEffect } from 'react';

const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: '',
    categoryId: '',
    subCategoryId: '',
    imageUrl: '',
    price: '',
    discount: '0',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCategories, setIsFetchingCategories] = useState(false);
  const [isFetchingSubCategories, setIsFetchingSubCategories] = useState(false);

  // Calculate final price
  const finalPrice =
    productData.price && productData.discount
      ? (productData.price * (1 - parseInt(productData.discount) / 100)).toFixed(2)
      : productData.price;

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      setIsFetchingCategories(true);
      try {
        const response = await fetch('http://localhost:3000/api/categories/get');

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data);
        console.log('Fetched categories:', data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setMessage('Error: Could not fetch categories from server');
      } finally {
        setIsFetchingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (!productData.categoryId) {
      setSubCategories([]);
      return;
    }

    console.log('Selected categoryId:', productData.categoryId);
    const fetchSubCategories = async () => {
      setIsFetchingSubCategories(true);
      console.log('Fetching subcategories for categoryId:', productData.categoryId);

      try {
        const response = await fetch(`http://localhost:3000/api/subcategories/getsubcat/${productData.categoryId}`);
        if (!response.ok) throw new Error('Failed to fetch subcategories');

        const data = await response.json();
        setSubCategories(data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setMessage('Error: Could not fetch subcategories from server');
      } finally {
        setIsFetchingSubCategories(false);
      }
    };

    fetchSubCategories();
  }, [productData.categoryId]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!productData.name.trim()) {
      setMessage('Please enter a product name');
      return;
    }

    if (!productData.categoryId) {
      setMessage('Please select a category');
      return;
    }

    if (!productData.subCategoryId) {
      setMessage('Please select a subcategory');
      return;
    }

    if (!productData.price || isNaN(productData.price) || productData.price <= 0) {
      setMessage('Please enter a valid price');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...productData,
          finalPrice
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Product added successfully!');
        // Reset form
        setProductData({
          name: '',
          categoryId: '',
          subCategoryId: '',
          imageUrl: '',
          price: '',
          discount: '0',
        });
      } else {
        setMessage(`Error: ${data.message || 'Failed to add product'}`);
      }
    } catch (error) {
      setMessage('Error: Could not connect to the server');
      console.error('Error adding product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full flex items-center justify-center px-4">
      <div className="w-2/5 mx-auto my-10 p-8 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Add Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-4">
            {isFetchingCategories ? (
              <div className="text-white text-center py-2">Loading categories...</div>
            ) : (
              <select
                name="categoryId"
                value={productData.categoryId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Subcategory Dropdown */}
          <div className="mb-4">
            {isFetchingSubCategories ? (
              <div className="text-white text-center py-2">Loading subcategories...</div>
            ) : (
              <select
                name="subCategoryId"
                value={productData.subCategoryId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!productData.categoryId || subCategories.length === 0}
              >
                <option value="">Select a subcategory</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <input
              type="text"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              placeholder="Price"
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Discount */}
          <div className="mb-4">
            <input
              type="number"
              name="discount"
              value={productData.discount}
              onChange={handleInputChange}
              placeholder="Discount (%)"
              min="0"
              max="100"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Final Price (Calculated, Read-only) */}
          <div className="mb-6">
            <div className="flex items-center">
              <span className="text-white mr-2">Final Price:</span>
              <input
                type="text"
                value={finalPrice || ''}
                readOnly
                className="w-full px-4 py-2 border rounded-md bg-gray-200 text-gray-700"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isLoading ? 'Adding...' : 'Add Product'}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-md ${message.includes('Error')
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
              }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductForm;