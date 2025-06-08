import React, { useState } from 'react';

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setMessage('Please enter a category name');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: categoryName })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Category added successfully!');
        setCategoryName(''); // Clear the input
      } else {
        setMessage(`Error: ${data.message || 'Failed to add category'}`);
      }
    } catch (error) {
      setMessage('Error: Could not connect to the server');
      console.error('Error adding category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full flex items-center justify-center px-4">
      <div className="w-2/5 mx-auto my-10 p-8 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isLoading ? 'Adding...' : 'Add Category'}
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

export default CategoryForm;