const express = require('express');
const router = express.Router();

const { 
    getCategory,
    createCategory, 
    updateCategory, 
    deleteCategory,
} = require('../Controller/categoryController');

// Get all Categorys
router.get('/get', getCategory);

// Create new Category
router.post('/create', createCategory);

// Update Category
router.put('/update/:id', updateCategory);

// Delete Category
router.delete('/delete/:id', deleteCategory);

module.exports = router;