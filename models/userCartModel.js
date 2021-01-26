const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userCartSchema = Schema({
	title : {
		type : String,
		required : true
	},
	quantity: {
		type: Number, 
		required: true
	},
	price : {
		type : Number,
		required : true
	},
	discount : {
		type : Number,
		required : true,
	},
	amount : {
		type :Number,
		default : 0.0
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},
	productId : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Product',
		required : true,	
	},
	sellerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'seller',
		required: true
	},
	sellerCartId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'sellercart',
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


userCartSchema.pre('save' , function(next){
	this.amount = (this.price - this.discount) * this.quantity;
	next();
});
userCartSchema.pre('updateOne' , function(next){
	this.updatedAt = new Date(Date.now());
	next();
});


const UserCart = mongoose.model('UserCart', userCartSchema);
module.exports = UserCart;