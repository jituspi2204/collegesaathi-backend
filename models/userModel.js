var mongoose = require('mongoose');
var emailValidator = /[a-zA-Z0-9]*@[a-zA-Z]*\.(com|io)/;
var phoneNumberValidator = /\+91(\d{10})$/;
// var errors = require('../utils/errorsList');
var bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = Schema({
    name : {
        type : String,
        required : [true , 'INVALID_NAME']
    },
    image:  {
        type : String,
        default : ''
    },
    password : {
        type : String,
    },
    email : {
        type : String,
        validate : [value => emailValidator.test(value) , 'INVALID_EMAIL' ],
        unique : true,
    },
    phoneNumber : {
        type : String,
        validate : [value => phoneNumberValidator.test(value) , 'INVALID_PHONE_NUMBER'],
        unique : true
    },
    address : [],
    userCartItems : [
        {
            type : Schema.Types.ObjectId,
            ref: 'usercart'
        }
    ],
    userOrders : [
        {
            type : Schema.Types.ObjectId,
            ref: 'order'
        }
    ],
    ordersList : [],
    tokens : [],
    location : {
        type : {
            type : String,
            default : "Point",
            enum : ["Point"]
        },
        coordinates : {
            type : [Number]
        }
    },
    otp : {
        type : String,
        // required : [true , 'INVALID_OTP']
    }
})



const User = mongoose.model('user', userSchema);
module.exports = User;