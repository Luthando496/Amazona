const express = require('express');
const router = express.Router()
const order = require('../Controllers/Order')
const user = require('../Controllers/Auth')


router.route('/new-order').post(user.protect,order.newOrder)
router.route('/single-order/:id').get(user.protect,order.getSingleOrder).delete(user.protect,order.deleteOrder)
router.route('/my-orders').get(user.protect,order.getMyOrders)
router.route('/admin/orders').get(user.protect,order.getAllOrders)




module.exports = router