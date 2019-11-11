const express = require('express');
const { body, param } = require('express-validator/check');

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/job-list', authMiddleware.veryfiToken, userController.jobList);

router.post('/addjob', [
    body('jobName')
        .exists()
        .withMessage('jobName is required!'),
    body('companyName')
        .exists()
        .withMessage('companyName is required!'),
    body('jobLocation')
        .exists()
        .withMessage('jobLocation is required!'),
    authMiddleware.veryfiToken],
    userController.addjob);

router.put('editjob', authMiddleware.veryfiToken, userController.editjob);

router.delete('/removejob', authMiddleware.veryfiToken, userController.removejob);

module.exports = router;