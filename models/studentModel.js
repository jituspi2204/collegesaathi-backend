var mongoose = require('mongoose');
var emailValidator = /[a-zA-Z0-9]*@[a-zA-Z]*\.(com|io)/;
var phoneNumberValidator = /\+91(\d{10})$/;
// var errors = require('../utils/errorsList');
var bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        default: 'student',
    },
    rollno: {
        type: String,
        default: '11111111111',
    },
    phoneNumber: {
        type: String,
        default: '+910000000000',
    },
    college: {
        type: String,
        default: 'college',
    },
    course: {
        type: String,
        default: 'course',
    },
    branch: {
        type: String,
        default: 'branch',
    },
    total: { type: Number, default: 0 },
    obtained: { type: Number, default: 0 },
    cgpa: { type: Number, default: 0 },
    percentage: {
        type: Number,
        default: 0,
    },
    batch: {
        type: Number,
        default: 0,
    },
    reads: [],
    subjectReads: [],
    notifications: [],
    semesters: {
        1: { type: Schema.Types.ObjectId },
        2: { type: Schema.Types.ObjectId },
        3: { type: Schema.Types.ObjectId },
        4: { type: Schema.Types.ObjectId },
        5: { type: Schema.Types.ObjectId },
        6: { type: Schema.Types.ObjectId },
        7: { type: Schema.Types.ObjectId },
        8: { type: Schema.Types.ObjectId },
        9: { type: Schema.Types.ObjectId },
        10: { type: Schema.Types.ObjectId },
    },
});

const Student = mongoose.model('student', userSchema);
module.exports = Student;
