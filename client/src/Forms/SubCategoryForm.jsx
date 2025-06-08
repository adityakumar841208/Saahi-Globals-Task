import React, { useState, useEffect } from 'react';

const SubCategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCategories, setIsFetchingCategories] = useState(false);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      setIsFetchingCategories(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories/get`);

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setMessage('Error: Could not fetch categories from server');
      } finally {
        setIsFetchingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategory) {
      setMessage('Please select a category');
      return;
    }

    if (!subCategoryName.trim()) {
      setMessage('Please enter a subcategory name');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subcategories/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category: selectedCategory,
          name: subCategoryName
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Subcategory added successfully!');
        setSubCategoryName(''); // Clear the subcategory input
        setSelectedCategory(''); // Reset category selection
      } else {
        setMessage(`Error: ${data.message || 'Failed to add subcategory'}`);
      }
    } catch (error) {
      setMessage('Error: Could not connect to the server');
      console.error('Error adding subcategory:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
      <div className="w-2/5 mx-auto my-10 p-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-slate-800">Add Subcategory</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {isFetchingCategories ? (
              <div className="text-center py-2">Loading categories...</div>
            ) : (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={categories.length === 0}
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

          <div className="mb-4">
            <input
              type="text"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              placeholder="Enter subcategory name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || isFetchingCategories}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${isLoading || isFetchingCategories ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isLoading ? 'Adding...' : 'Add Subcategory'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-md ${message.includes('Error')
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
            }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubCategoryForm;