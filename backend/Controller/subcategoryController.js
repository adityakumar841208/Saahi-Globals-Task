const subCategory = require('../Models/subcategory')

//to add a new subCategory
const createSubCategory = async (req, res) => {
    const { name, category } = req.body;

    try {
        const newSubCategory = new subCategory({ name, category });
        await newSubCategory.save();
        res.status(201).json(newSubCategory);
    }
    catch (error) {
        console.error('Error adding subCategory:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// to get all categories
const getSubCategory = async (req, res) => {
    try {
        const subCategories = await subCategory.find().populate('category', 'name');
        res.status(200).json(subCategories);
    }
    catch (error) {
        console.error('Error fetching subCategories:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//to delete a sub subCategory
const deleteSubCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSubCategory = await subCategory.findByIdAndDelete(id);
        if (!deletedSubCategory) {
            return res.status(404).json({ message: 'SubCategory not found' });
        }
        res.status(200).json({ message: 'SubCategory deleted successfully' });
    } catch (error) {
        console.error('Error deleting subCategory:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//to update a subCategory
const updateSubCategory = async (req, res) => {
    const { id } = req.params;
    const { name, category } = req.body;

    try {
        const updatedSubCategory = await subCategory.findByIdAndUpdate(id, { name, category }, { new: true });
        if (!updatedSubCategory) {
            return res.status(404).json({ message: 'SubCategory not found' });
        }
        res.status(200).json(updatedSubCategory);
    } catch (error) {
        console.error('Error updating subCategory:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//to get subCategories by category name
const getSubCategoryByCategoryId = async (req, res) => {
    const { categoryName } = req.params;
    console.log('Fetching subCategories for category:', categoryName);
    try {
        // Then find subcategories with that category ID
        const subCategories = await subCategory.find({ category: categoryName });
        console.log('Fetched subCategories:', subCategories);
        res.status(200).json(subCategories);
    } catch (error) {
        console.error('Error fetching subCategories by category name:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    createSubCategory,
    getSubCategory,
    deleteSubCategory,
    updateSubCategory,
    getSubCategoryByCategoryId
};



