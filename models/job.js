const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    jobName: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: false
    },
    jobLocation: {
        type: String,
        required: true
    },
    jobFunction: String,
    jobIndustry: String,
    companyLogo: String,
    jobDescription: String

})

module.exports = mongoose.model('Job', jobSchema);