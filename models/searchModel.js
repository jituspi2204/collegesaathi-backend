const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const searchSchema = Schema({
    userId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    image : [],
    category : {
        type : String,
        required : true
    },
    sellerCartId :{
        type: mongoose.Schema.Types.ObjectId,
		ref: 'sellercart',
		required: true
    },
    sellerId : {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'Seller',
		required: true
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

const Search = mongoose.model('Search', searchSchema);
module.exports = Search;