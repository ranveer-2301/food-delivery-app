const express = require('express');
const {
    getCart,
    addToCart,
    clearCart,
    updateCartItem,
    deleteCartItem
} = require('../controllers/cartController.js');

const authMiddleware = require('../middlewares/auth.js');
const router = express.Router();

router.route('/')
    .get(authMiddleware, getCart)
    .post(authMiddleware, addToCart);

router.route('/clear')
    .delete(authMiddleware, clearCart);

router.route('/:id')
    .post(authMiddleware, updateCartItem)
    .delete(authMiddleware, deleteCartItem);

module.exports = router;