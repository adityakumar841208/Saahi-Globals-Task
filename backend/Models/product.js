const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1
    },
    category:{
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0
    },
    finalPrice: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;