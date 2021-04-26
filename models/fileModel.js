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
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    subject: {
        type: String,
        default: 'address',
    },
    semester: {
        type: Number,
        default: 0,
    },
    type: {
        type: String,
        default: 'notes',
        enum: ['notes', 'labfiles', 'papers','assignments','videos'],
    },
    description: {
        type: String,
        default: '',
    },
    views: {
        type: Number,
        default: 0,
    },
    unit : {
        type: String,
        default: '1',
        enum : ['1', '2','3','4','misc']
    },
    like: [],
    dislike: [],
    url: {
        type: String,
        default: '',
    },
});

const File = mongoose.model('file', userSchema);
module.exports = File;
