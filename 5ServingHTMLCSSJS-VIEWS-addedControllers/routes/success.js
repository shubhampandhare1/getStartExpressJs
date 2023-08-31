const path = require('path');
const express = require('express');
const successController = require('../controllers/contact')
const router = express.Router();

router.get('/success', successController.getSuccess)

module.exports = router;