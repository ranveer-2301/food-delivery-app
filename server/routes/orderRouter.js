const express = require('express');
const {
  confirmPayment,
  createOrder,
  getAllOrders,
  getOrderById,
  getOrders,
  updateAnyOrder,
  updateOrder
} = require('../controllers/orderController.js');
const authMiddleware = require('../middlewares/auth.js');

const orderRouter = express.Router();

// ADMIN ROUTES (no auth middleware)
orderRouter.get('/getall', getAllOrders); // get all orders for admin
orderRouter.put('/getall/:id', updateAnyOrder); // update any order by admin

// PROTECTED ROUTES (require authentication)
orderRouter.use(authMiddleware);

orderRouter.post('/', createOrder); // create order
orderRouter.get('/', getOrders); // get user's orders
orderRouter.get('/confirm', confirmPayment); // confirm stripe payment
orderRouter.get('/:id', getOrderById); // get order by id
orderRouter.put('/:id', updateOrder); // update order by id

module.exports = { orderRouter };