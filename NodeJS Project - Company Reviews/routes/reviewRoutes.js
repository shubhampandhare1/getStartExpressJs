const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/controller')

router.get('/getReviews', reviewController.getReviews);

router.post('/postReview', reviewController.postReview);

module.exports = router;