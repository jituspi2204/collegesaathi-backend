var mongoose = require('mongoose');
var emailValidator = /[a-zA-Z0-9]*@[a-zA-Z]*\.(com|io)/;
var phoneNumberValidator = /\+91(\d{10})$/;
// var errors = require('../utils/errorsList');
var bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        default: 'address',
    },
    semester: {
        type: Number,
        default : 0
    }
});

const Subject = mongoose.model('subject', userSchema);
module.exports = Subject;
