const express = require('express')
const router = express.Router()
const multer = require('multer')()
const adminAuthToken = require('../middleware/authTokenForAdmin')
const authToken = require('../middleware/authToken')

const { createSubscriptionPlan, getAllSubscriptionPlan, updateSubscriptionPlan } = require('../controllers/subscriptionPlan.controller')

router.post('/create', [multer.none(), adminAuthToken], createSubscriptionPlan)
router.get('/', getAllSubscriptionPlan)
router.put('/:id', [multer.none()], updateSubscriptionPlan)

module.exports = router