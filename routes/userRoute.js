const express = require('express');
const { body, param } = require('express-validator');

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const userMiddleware = require('../middleware/userMiddleware');

const router = express.Router();

router.get('/job-list', authMiddleware.veryfiToken, userController.jobList);

router.get('/job/:jobId', [
    param('jobId')
        .exists()
        .withMessage('jobId is required.'),
    authMiddleware.veryfiToken],
    userController.getjob);

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

router.put('/editjob/:jobId', [
    param('jobId')
        .exists()
        .withMessage('jobId is required.'),
    body('jobName')
        .exists()
        .withMessage('jobName is required!'),
    body('companyName')
        .exists()
        .withMessage('companyName is required!'),
    body('jobLocation')
        .exists()
        .withMessage('jobLocation is required!'),
    authMiddleware.veryfiToken,
    userMiddleware.checkJob], userController.editjob);

router.delete('/removejob/:jobId', [
    param('jobId')
        .exists()
        .withMessage('jobId is required.'),
    authMiddleware.veryfiToken,
    userMiddleware.checkJob],
    userController.removejob);

module.exports = router;