const { validationResult } = require('express-validator');
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

exports.editjob = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const jobId = req.params['jobId'];
        const jobName = req.body.jobName;
        const companyName = req.body.companyName;
        const jobLocation = req.body.jobLocation;
        let description = req.body.description;
        if (!description) {
            description = "No description"
        }

        const updatedJob = await Job.findByIdAndUpdate(jobId, {
            jobName: jobName,
            companyName: companyName,
            jobLocation: jobLocation,
            description: description
        }, { new: true });
        res.status(200).json({
            message: 'Job updated!',
            updatedJob: updatedJob
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
};

exports.removejob = async (req, res, next) => {
    const errors = validationResult(req);
    const jobId = req.params['jobId'];

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            throw error
        }
        await Job.findByIdAndDelete(jobId);
        res.status(200).json({
            message: 'Delete job successfully',
            deletedJob: req.job
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
};

exports.getjob = async (req, res, next) => {
    const errors = validationResult(req);
    const jobId = req.params['jobId'];


    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            throw error
        }
        const job = await Job.findById(jobId);

        if (!job) {
            const error = new Error('job not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Fetch job list successfully',
            job: job
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
};