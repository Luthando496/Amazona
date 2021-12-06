const express = require('express');
const router = express.Router()
const products = require('../Controllers/Product')
const user = require('../Controllers/Auth')



router.route('/products').get(products.getAllProducts)
router.route('/admin/products').get(products.getAdminProducts)
router.route('/admin/new-product').post(products.newProduct)
router.route('/single-product/:id').get(products.getSingleProduct)
router.route('/admin/update-product/:id').put(products.updateProduct)
router.route('/admin/delete-product/:id').delete(products.deleteProduct)

// REVIEWS
router.route('/products/reviews').put(user.protect,products.newReview)
router.route('/products/reviews/:id').get(user.protect,products.getProductReviews)


module.exports = router;