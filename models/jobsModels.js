const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    minExperience: {
        type: Number,
        required: true,
    },
    maxExperience: {
        type: Number,
        required: true,
    },
    minSalary: {
        type: Number,
        required: true,
    },
    maxSalary: {
        type: Number,
        required: true
    },
    salaryUnit: {
        type: String,
        default: 'Month',
        enum: ['LPA', 'Month']
    },
    jobType: {
        type: String,
        default : "Full Time",
        enum: ['Full Time', 'Part Time', 'Internship', 'Contract Based', 'Co-Founder'],
    },
    location: {
        type: String,
        default: 'Remote',
    },
    createDate: {
        type: Date,
        required : true,
    },
    expDate: {
        type: Date,
        required : true
    },
    companyName: {
        type: String,
        required : true
    },
    companyLogo: {
        type: String,
        default : 'company.png'
    },
    jobUrl: {
        type: String,
        required : true,
    }
});

const Jobs = mongoose.model('job', fileSchema);
module.exports = Jobs;