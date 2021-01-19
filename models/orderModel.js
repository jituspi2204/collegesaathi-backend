const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = Schema({
	quantity: {
		type: Number, 
		require: true
	},
	sellerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Seller',
		require: true
	},
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		require: true
	},
	createdAt: {
		type: mongoose.Schema.Types.Date,
		default: new Date.now()
	},
	updatedAt: {
		type: mongoose.Schema.Types.Date,
		default: new Date.now()
	}
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;