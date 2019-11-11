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

exports.addjob = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const jobName = req.body.jobName;
        const companyName = req.body.companyName;
        const jobLocation = req.body.jobLocation;
        let description = req.body.description;
        if (!description) {
            description = "No description"
        }

        const job = new Job({
            jobName: jobName,
            companyName: companyName,
            jobLocation: jobLocation,
            description: description
        });
        const result = await job.save();
        res.status(201).json({
            message: 'Job successfully added',
            job: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
};

exports.editjob = (req, res, next) => { };

exports.removejob = (req, res, next) => { };