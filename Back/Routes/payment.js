const express = require('express');
const router = express.Router()
const user = require('../Controllers/Auth')
const pay = require('../Controllers/stripe')



router.route('/payment/proccess').post(user.protect,pay.processPay)
router.route('/stripe-api').get(user.protect,pay.sendApi)




module.exports = router;