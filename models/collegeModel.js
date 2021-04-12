var mongoose = require('mongoose');
var emailValidator = /[a-zA-Z0-9]*@[a-zA-Z]*\.(com|io)/;
var phoneNumberValidator = /\+91(\d{10})$/;
// var errors = require('../utils/errorsList');
var bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required : true
    },
    id: {
        type: Number,
        required : true
    },
    address: {
        type: String,
        default : 'address'
    }
});

const College = mongoose.model('college', userSchema);
module.exports = College;
