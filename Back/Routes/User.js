const express = require('express');
const router = express.Router()
const user = require('../Controllers/Auth')
const formitable = require('express-formidable')



router.route('/user-reg').post(user.registerUser)
router.route('/login').post(user.Login)
router.route('/logout').get(user.Logout)
router.route('/upload').post(formitable({maxFileSize:5 *1024 *1024}),user.uploadIMG)
router.route('/uploader').post(formitable({maxFileSize:5 *1024 *1024}),user.uploadFileImg)
router.route('/').get(user.allUsers)
router.route('/profile').get(user.protect,user.getMe)




module.exports = router;