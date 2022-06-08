const express = require('express')
const router = express.Router()
const authToken = require('../middleware/authToken')
const multer = require('multer')
const upload = multer()

const { signUp, signIn, getAllUser, getUser, updateSubscriptionInUser } = require('../controllers/user.controller');

// Navigate
router.post('/sign-up', [upload.none()], signUp)
router.post('/sign-in', [upload.none()], signIn)
router.get('/', getAllUser)
router.get('/:charCode', getUser)
router.post('/update/:charCode', updateSubscriptionInUser)

module.exports = router