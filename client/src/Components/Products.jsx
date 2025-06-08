import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, subCatRes, prodRes] = await Promise.all([
          axios.get('http://localhost:3000/categories/get'),
          axios.get('http://localhost:3000/subcategories/get'),
          axios.get('http://localhost:3000/products/get'),
        ]);
        setCategories(catRes.data);
        setSubCategories(subCatRes.data);
        setProducts(prodRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 space-y-8">
      {/* Categories Table */}
      <div>
        <h2 className="text-xl font-bold mb-2">Categories</h2>
        <table className="w-full border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Category Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{cat.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SubCategories Table */}
      <div>
        <h2 className="text-xl font-bold mb-2">Subcategories</h2>
        <table className="w-full border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Subcategory Name</th>
              <th className="border px-4 py-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map((sub, index) => (
              <tr key={sub._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{sub.name}</td>
                <td className="border px-4 py-2">{sub.category?.name || sub.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Products Table */}
      <div>
        <h2 className="text-xl font-bold mb-2">Products</h2>
        <table className="w-full border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">SubCategory</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Discount</th>
              <th className="border px-4 py-2">Final Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={prod._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{prod.name}</td>
                <td className="border px-4 py-2">{prod.category?.name || prod.category}</td>
                <td className="border px-4 py-2">{prod.subCategory?.name || prod.subCategory}</td>
                <td className="border px-4 py-2">
                  <img src={prod.image} alt={prod.name} className="h-12 w-12 object-cover" />
                </td>
                <td className="border px-4 py-2">₹{prod.price}</td>
                <td className="border px-4 py-2">{prod.discount}%</td>
                <td className="border px-4 py-2">₹{prod.finalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
