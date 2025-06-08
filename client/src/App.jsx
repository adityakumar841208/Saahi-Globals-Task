import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import LandingPage from './Components/LandingPage';
import CategoryForm from './Forms/CategoryForm';
import SubCategoryForm from './Forms/SubCategoryForm';
import ProductForm from './Forms/ProductForm';
import Edit from './Components/Edit';

function App() {

  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/categories" element={<CategoryForm />} />
          <Route path="/edit-products" element={<Edit />} />
          <Route path="/subcategories" element={<SubCategoryForm/>} />
          <Route path="/products" element={<ProductForm/>} />
          <Route path="/" element={<LandingPage/>} />
        </Routes>
        <Footer />
    </Router>
  )
}

export default App
