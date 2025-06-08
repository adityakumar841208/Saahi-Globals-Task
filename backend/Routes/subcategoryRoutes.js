const express = require('express');
const router = express.Router();

const { 
    getSubCategory,
    createSubCategory,
    getSubCategoryByCategoryId, 
    updateSubCategory, 
    deleteSubCategory,
} = require('../Controller/subcategoryController');

// Get all SubCategorys
router.get('/get', getSubCategory);

// Get SubCategory by Category ID
router.get('/getsubcat/:categoryName',getSubCategoryByCategoryId);

// Create new SubCategory
router.post('/create', createSubCategory);

// Update SubCategory
router.put('/update/:id', updateSubCategory);

// Delete SubCategory
router.delete('/delete/:id', deleteSubCategory);

module.exports = router;