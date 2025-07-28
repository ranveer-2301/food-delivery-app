const asyncHandler = require('express-async-handler');
const CartItem = require('../models/cartModel.js');
const Item = require('../models/itemModel.js');

// GET CART
const getCart = asyncHandler(async (req, res) => {
    const items = await CartItem.find({ user: req.user._id }).populate('item');
    const formatted = items.map(ci => ({
        _id: ci._id.toString(),
        item: ci.item,
        quantity: ci.quantity
    }));
    res.json(formatted);
});

// ADD TO CART
const addToCart = asyncHandler(async (req, res) => {
    const { itemId, quantity } = req.body;
    if (!itemId || typeof quantity !== 'number' || quantity < 1) {
        res.status(400);
        throw new Error('itemId and a positive quantity are required');
    }

    let cartItem = await CartItem.findOne({ user: req.user._id, item: itemId });

    if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
        await cartItem.populate('item');
        return res.status(200).json({
            _id: cartItem._id.toString(),
            item: cartItem.item,
            quantity: cartItem.quantity,
        });
    }

    cartItem = await CartItem.create({
        user: req.user._id,
        item: itemId,
        quantity,
    });

    await cartItem.populate('item');
    res.status(201).json({
        _id: cartItem._id.toString(),
        item: cartItem.item,
        quantity: cartItem.quantity,
    });
});

// UPDATE CART ITEM
const updateCartItem = asyncHandler(async (req, res) => {
    const { quantity } = req.body;
    console.log("quantity", quantity)

    if (typeof quantity !== 'number' || quantity < 1) {
        res.status(400);
        throw new Error('Quantity must be a positive number');
    }

    const cartItem = await CartItem.findOne({ item: req.params.id, user: req.user._id });
    console.log("cartItem", cartItem);
    if (!cartItem) {
        // throw new Error('Cart item not found');
        console.log("cartitem is not found")
        res.status(404)
        .json({
            success:false,
            message:"Cart Not found"
        
        })
    }

      cartItem.quantity = quantity;
    await cartItem.save();
    await cartItem.populate('item');
    res.json({
        _id: cartItem._id.toString(),
        item: cartItem.item,
        quantity: cartItem.quantity,
    });
});

// DELETE CART ITEM
const deleteCartItem = asyncHandler(async (req, res) => {
    console.log("this is detelecartItem")
    const cartItem = await CartItem.findOne({ item: req.params.id, user: req.user._id });
    if (!cartItem) {
        res.status(404);
        throw new Error('Cart item not found');
    }
    await cartItem.deleteOne();
    res.json({ _id: req.params.id });
});

// CLEAR CART
const clearCart = asyncHandler(async (req, res) => {
    await CartItem.deleteMany({ user: req.user._id });
    res.json({ message: 'Cart cleared' });
});

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    deleteCartItem,
    clearCart
};