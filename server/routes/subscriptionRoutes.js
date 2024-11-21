const express = require('express');
const subscritionController = require('../controllers/subscritionController')
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router()

router.post('/subscription', isAuthenticatedUser, subscritionController.createSubscription)
router.get('/subscription/:chanelId', subscritionController.countSubscribers)




module.exports =router