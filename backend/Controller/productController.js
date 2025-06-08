const Product = require('../Models/product');

//to add a new product
const createProduct = async (req, res) => {
    console.log('Request body:', req.body);
    const { name, categoryId, subCategoryId, imageUrl, price, discount, finalPrice } = req.body;

    try {
        const newProduct = new Product({
            name,
            category: categoryId,
            subCategory: subCategoryId,
            image: imageUrl,
            price,
            discount,
            finalPrice
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error adding subCategory:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// to get all product
const getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching subCategories:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//to delete a Product
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'SubCategory not found' });
        }
        res.status(200).json({ message: 'SubCategory deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting subCategory:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//to update a subCategory
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, category, subCategory, image, price, discount, finalPrice } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name,
            category,
            subCategory,
            image,
            price,
            discount,
            finalPrice
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'SubCategory not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating subCategory:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createProduct,
    getProduct,
    deleteProduct,
    updateProduct
};
