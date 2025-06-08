import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    category: '',
    subCategory: '',
    image: '',
    price: '',
    discount: '',
    finalPrice: ''
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isFetchingCategories, setIsFetchingCategories] = useState(false);
  const [isFetchingSubCategories, setIsFetchingSubCategories] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/getOneProd/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const prod = await response.json();
        console.log(prod)
        setProduct({
          name: prod.name || '',
          category: prod.category || '',
          subCategory: prod.subCategory || '',
          image: prod.image || '',
          price: prod.price || '',
          discount: prod.discount || 0,
          finalPrice: prod.finalPrice || (prod.price - (prod.price * (prod.discount || 0) / 100))
        });
      } catch {
        setError('Error fetching product details');
      }
    };
    fetchProductDetails();
  }, [id]);

  // Fetch categories
  useEffect(() => {
    setIsFetchingCategories(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories/get`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setCategories([]))
      .finally(() => setIsFetchingCategories(false));
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (!product.category) {
      setSubCategories([]);
      return;
    }
    setIsFetchingSubCategories(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subcategories/get`)
      .then(res => res.json())
      .then(data => {
        // Filter subcategories to only those that match the selected category
        const filtered = data.filter(sub => sub.category === product.category);
        setSubCategories(filtered);
      })
      .catch(() => setSubCategories([]))
      .finally(() => setIsFetchingSubCategories(false));
  }, [product.category]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedProduct = { ...product, [name]: value };
    // Recalculate final price if price or discount changes
    if (name === 'price' || name === 'discount') {
      const price = parseFloat(name === 'price' ? value : updatedProduct.price) || 0;
      const discount = parseFloat(name === 'discount' ? value : updatedProduct.discount) || 0;
      updatedProduct.finalPrice = (price - (price * discount / 100)).toFixed(2);
    }
    setProduct(updatedProduct);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/update/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product)
        }
      );
      if (!res.ok) throw new Error('Failed to update product');
      navigate('/');
    } catch {
      setError('Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md">
        {/* Product Name */}
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Category Dropdown */}
        <div className="mb-4">
          {isFetchingCategories ? (
            <div className="text-gray-600 text-center py-2">Loading categories...</div>
          ) : (
            <select
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>
        {/* Subcategory Dropdown */}
        <div className="mb-4">
          {isFetchingSubCategories ? (
            <div className="text-gray-600 text-center py-2">Loading subcategories...</div>
          ) : (
            <select
              name="subCategory"
              value={product.subCategory}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!product.category || subCategories.length === 0}
              required
            >
              <option value="">Select a subcategory</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory._id} value={subCategory.name}>
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
            name="image"
            value={product.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Price */}
        <div className="mb-4">
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            placeholder="Price"
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Discount */}
        <div className="mb-4">
          <input
            type="number"
            name="discount"
            value={product.discount}
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
            <span className="text-gray-700 mr-2">Final Price:</span>
            <input
              type="text"
              value={product.finalPrice}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-200 text-gray-700"
            />
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Edit;