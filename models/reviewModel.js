const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = Schema({
    userName : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        default : 'user.png',
    },
    rating : {
        type : Number,
        required : true
    },
    message : {
        type : String,
        default : ''
    },
    orderId : {
        type : Schema.Types.ObjectId,
        required : true,
    },
    sellerCartId : {
        type : Schema.Types.ObjectId,
        required : true,
    },
    sellerId : {
        type : Schema.Types.ObjectId,
        required : true,
    },
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
    },
	createdAt: {
		type: mongoose.Schema.Types.Date,
		default: new Date(Date.now())
	},
	updatedAt: {
		type: mongoose.Schema.Types.Date,
		default: new Date(Date.now())
	}
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;