const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = Schema({
	title: {
		type: String,
		required: true
	},
	catergory: {
		type: String,
		default : 'Other',
		enum : [
			"Fruits & Vegetables",
			"Foodgrains , Oil & Masla",
			"Bakery, Cakes & Dairy",
			"Beverages" ,
			"Snacks",
			"Beauty & Hygiene",
			"Household",
			"Kitchen & Garden",
			"Non-veg Food",
			"Gourment & World Food",
			"Baby care",
			"Clothing",
			"Electronics",
			"Stationery",
			'Other'
		]
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