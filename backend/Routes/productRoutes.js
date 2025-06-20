const express = require('express');
const router = express.Router();

const { 
    getProduct,
    createProduct, 
    updateProduct, 
    deleteProduct,
    getProductById,
} = require('../Controller/productController');

// Get all products
router.get('/get', getProduct);

//get product by id
router.get('/getOneProd/:id', getProductById);

// Create new product
router.post('/create', createProduct);

// Update product
router.put('/update/:id', updateProduct);

// Delete product
router.delete('/delete/:id', deleteProduct);

module.exports = router;