const express = require('express');

const router = express.Router();

const userController = require('../controllers/user')

router.post('/add-user', userController.postUser);

router.get('/get-user', userController.getUser);

router.delete('/delete-user/:userId', userController.deleteUser);

module.exports = router;