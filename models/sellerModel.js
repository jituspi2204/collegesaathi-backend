var mongoose = require('mongoose');
var emailValidator = /[a-zA-Z0-9]*@[a-zA-Z]*\.(com|io)/;
var phoneNumberValidator = /\+91(\d{10})$/;
const Schema = mongoose.Schema;

const sellerSchema = Schema({
    name : {
        type : String,
        required = [true , 'INVALID_NAME']
    },
    image:  {
        type : String,
        default : ''
    },
    password : {
        type : String,
        required : [true , 'INVALID_PASSWORD']
    },
    email : {
        type : String,
        validate : [value => emailValidator.test(value) , 'INVALID_EMAIL' ],
        unique : true,
    },
    phoneNumber : {
        type : String,
        validate: [value => phoneNumberValidator.test(value), 'INVALID_PHONE_NUMBER' ],
        unique : true
    },
    title: {
        type: String,
        require: true,
        enum: ['Artist', 'Interior Designer', 'Seller'],
        default: 'Artist'
    },
    description: {
        type: String, 
        require: true
    },
    address : [
        {
            house : { type : String, default: ''},
            locality : { type : String, default : ''},
            city : {type : String, default : ''},
            state : {type : String, default : ''},
            pincode : {type : Number ,default : 110001},
            landmark : {type : Number ,default : ''}
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]

})


const Seller = mongoose.model('seller', sellerSchema);
module.exports = Seller;
