const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userCartSchema = Schema({
	quantity: {
		type: Number, 
		require: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		require: true
	},
	sellerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Seller',
		require: true
	},
	sellerCartId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SellerCart',
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

const UserCart = mongoose.model('UserCart', userCartSchema);
module.exports = UserCart;