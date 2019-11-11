const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email'),
    body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password length min 6 characters.'),
    body('mobilePhone')
        .trim()
        .isLength({ min: 11, max: 13 })
        .withMessage('Mobile phone number min 11 and max 13 characters.'),
    authMiddleware.checkExistingEmail
], authController.signup);

router.post('/signin', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.'),
    body('password')
        .trim()
        .not().isEmpty().withMessage('Password is required.')],
    authController.signin);

module.exports = router;