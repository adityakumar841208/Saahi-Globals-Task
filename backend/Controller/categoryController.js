const express = require('express')
const Category = require('../Models/category');


//to add a new category
const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// to get new category
const getCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//to delete a sub category
const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//to update a category
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createCategory,
    getCategory,
    deleteCategory,
    updateCategory
}

