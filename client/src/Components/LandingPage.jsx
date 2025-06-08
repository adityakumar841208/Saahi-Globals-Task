import React, { useEffect, useState } from 'react';

const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Fetch all data on component mount if verified
  useEffect(() => {
    if (!isVerified) return;
    const fetchData = async () => {
      try {
        const catRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories/get`);
        const subCatRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subcategories/get`);
        const prodRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/get`);

        const catData = await catRes.json();
        const subCatData = await subCatRes.json();
        const prodData = await prodRes.json();

        setCategories(catData);
        setSubCategories(subCatData);
        setProducts(prodData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, [isVerified]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userVerification = await fetch(`${import.meta.env.VITE_BACKEND_URL}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    const data = await userVerification.json();

    //hit a backend request then get the response
    if (data.isVerified) {
      setIsVerified(true);
      setLoginError('');
      setEmail('');
      setPassword('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  // Handle delete action (for demonstration purposes, this just logs the ID)
  const deleteProd = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setProducts(products.filter(prod => prod._id !== id));
        console.log('Product deleted successfully');
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.log('Error deleting product:', error);
    }
  };

  // Handle edit action (for demonstration purposes, this just logs the ID)
  const editProd = (id) => {
    window.location.href = `/edit-products?id=${id}`;
  };

  return (
    <div className="p-4 space-y-8 min-h-screen bg-gray-50">
      {isVerified ? (
        <>
          {/* Categories Table */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Categories</h2>
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Index</th>
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

          {/* Subcategories Table */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Subcategories</h2>
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Index</th>
                  <th className="border px-4 py-2">Subcategory Name</th>
                  <th className="border px-4 py-2">Category</th>
                </tr>
              </thead>
              <tbody>
                {subCategories.map((sub, index) => (
                  <tr key={sub._id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{sub.name}</td>
                    <td className="border px-4 py-2">{sub.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Products Table */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Products</h2>
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Index</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Category</th>
                  <th className="border px-4 py-2">SubCategory</th>
                  <th className="border px-4 py-2">Image</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Discount (%)</th>
                  <th className="border px-4 py-2">Final Price</th>
                  <th className="border px-4 py-2">Edit</th>
                  <th className="border px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod, index) => (
                  <tr key={prod._id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{prod.name}</td>
                    <td className="border px-4 py-2">{prod.category}</td>
                    <td className="border px-4 py-2">{prod.subCategory}</td>
                    <td className="border px-4 py-2">
                      <img src={prod.image} alt={prod.name} className="h-12 w-12 object-cover" />
                    </td>
                    <td className="border px-4 py-2">₹{prod.price}</td>
                    <td className="border px-4 py-2">{prod.discount}</td>
                    <td className="border px-4 py-2">₹{prod.finalPrice}</td>
                    <td className="border px-4 py-2"><button className=' p-2 bg-green-600 rounded-lg' onClick={()=>{editProd(prod._id)}}>Edit</button></td>
                    <td className="border px-4 py-2"><button className=' p-2 bg-red-600 rounded-lg' onClick={()=>{deleteProd(prod._id)}}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        // Login form
        <form onSubmit={handleLogin} className="max-w-sm mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Admin Login</h2>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          {loginError && <div className="text-red-500 mb-2 text-sm">{loginError}</div>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
        </form>
      )}
    </div>
  );
};

export default LandingPage;
