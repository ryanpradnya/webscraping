const express = require('express');
const { body, param } = require('express-validator/check');

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/job-list', authMiddleware.veryfiToken, userController.jobList);

module.exports = router;