const Job = require('../models/job');

exports.checkJob = async (req, res, next) => {
    const jobId = req.params['jobId']
    try {
        const job = await Job.findById(jobId);
        if (!job) {
            const error = new Error('Job not found!');
            error.statusCode = 404;
            throw error;
        } else {
            console.log(job)
            req.job = job;
        }
        next()

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }

};