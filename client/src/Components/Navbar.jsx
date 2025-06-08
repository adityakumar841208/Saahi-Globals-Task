import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-slate-800 text-white px-6 py-4 shadow-md">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Company Name */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-bold">
            <Link to={'/'}>Saahi Globals</Link></h1>
        </div>
        
        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <Link 
            to="/categories" 
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive('/categories') 
                ? 'bg-teal-600 hover:bg-teal-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Add Category
          </Link>
          <Link 
            to="/subcategories" 
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive('/subcategories') 
                ? 'bg-teal-600 hover:bg-teal-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Add Sub Category
          </Link>
          <Link 
            to="/products" 
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive('/products') 
                ? 'bg-teal-600 hover:bg-teal-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Add Product
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;