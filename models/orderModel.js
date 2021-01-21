const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = Schema({
	title : {
		type : String,
		required : true
	},
	quantity: {
		type: Number, 
		required: true
	},
	amount : {
		type: Number, 
		default : 0.0
	},
	price : {
		type: Number, 
		required : true,
	},
	discount : {
		type: Number, 
		required : true
	},
	orderId: {
		type : String,
	},
	userId : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	sellerCartId : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SellerCart',
		required: true
	},
	sellerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Seller',
		required: true
	},
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
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

orderSchema.pre('save' , function(next){
	this.amount = (this.price - this.discount) * this.quantity;
	next();
});
orderSchema.pre('updateOne' , function(next){
	this.updatedAt = new Date(Date.now());
	next();
});


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;