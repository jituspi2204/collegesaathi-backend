const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = Schema({
	title: {
		type: String,
		required: true
	},
	catergory: {
		type: String,
		default : 'Grocery'
		// required: true
	},
	mrp : {
		type : Number,
		default : 0.00
	},
	image: [
		{
			type: String,
			default : 'product.jpg'
		}
	],
	description:{},
	createdAt: {
		type: mongoose.Schema.Types.Date,
		default: new Date(Date.now())
	},
	updatedAt: {
		type: mongoose.Schema.Types.Date,
		default: new Date(Date.now())
	}
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;