const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1
    },
    category: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Subcategory = mongoose.model('Subcategory', categorySchema);
module.exports = Subcategory;