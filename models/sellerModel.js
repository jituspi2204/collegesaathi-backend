var mongoose = require('mongoose');
var emailValidator = /[a-zA-Z0-9]*@[a-zA-Z]*\.(com|io)/;
var phoneNumberValidator = /\+91(\d{10})$/;
const Schema = mongoose.Schema;

const sellerSchema = Schema({
    name: {
        type: String,
        required: [true, 'INVALID_NAME'],
    },
    image: {
        type: String,
        default: 'shop.png',
    },
    password: {
        type: String,
        // required : [true , 'INVALID_PASSWORD']
    },
    email: {
        type: String,
        validate: [(value) => emailValidator.test(value), 'INVALID_EMAIL'],
        unique: true,
    },
    phoneNumber: {
        type: String,
        validate: [(value) => phoneNumberValidator.test(value), 'INVALID_PHONE_NUMBER'],
        unique: true,
    },
    shopName: {
        type: String,
        required: [true, 'SHOP_NAME_IS_EMPTY'],
    },
    address: {
        address: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        pincode: { type: Number, default: 110001 },
        landmark: { type: String, default: '' },
    },
    sellerProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
        },
    ],
    otp: {
        type: String,
        // required : [true , 'INVALID_OTP']
    },
    zone: {
        type: String,
    },
    shopRating: {
        rating: {
            type: Number,
            default: 0,
        },
        count: {
            type: Number,
            default: 0,
        },
    },
    location: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        },
    },
});

const Seller = mongoose.model('seller', sellerSchema);
module.exports = Seller;
