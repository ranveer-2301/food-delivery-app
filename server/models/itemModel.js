const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0},
    hearts: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    imageUrl: { type: String},
},{timestamps: true});

module.exports =  mongoose.model('Item', itemSchema);