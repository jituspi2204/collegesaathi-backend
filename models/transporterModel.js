var mongoose = require('mongoose');
var emailValidator = /[a-zA-Z0-9]*@[a-zA-Z]*\.(com|io)/;
var phoneNumberValidator = /\+91(\d{10})$/;
const Schema = mongoose.Schema;

const transporterSchema = Schema({
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
        // required : [true , 'INVALID_PASSWORD']
    },
    phoneNumber : {
        type : String,
        validate: [value => phoneNumberValidator.test(value), 'INVALID_PHONE_NUMBER' ],
        unique : true
    },
    pincode : {
        type : String
    },
    otp: {
        type : String,
        // required : [true , 'INVALID_OTP']
    },
    location: {
        type : {
            type : String,
            default : "Point",
            enum : ["Point"]
        },
        coordinates : {
            type : [Number]
        }
    }

})


const Transporter = mongoose.model('transporter', transporterSchema);
module.exports = Transporter;
