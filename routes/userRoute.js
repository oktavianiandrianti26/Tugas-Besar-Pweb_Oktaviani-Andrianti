const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/reset-password', userController.resetPassword);

module.exports = router;