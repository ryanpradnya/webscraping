const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Job = require('../models/job');

exports.jobList = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            throw error
        }

        const jobs = await Job.find();

        if (!jobs) {
            const error = new Error('job list not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Fetch job list successfully',
            jobList: jobs
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
};