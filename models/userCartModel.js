const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userCartSchema = Schema({
	title: {
		type: String, 
		require = true
	},
	image: {
		type: String,
		require: true
	},
	category: {
		type: String,
		require: true
	},
	price: {
		type: Number,
		require: true
	},
	quantity: {
		type: Number, 
		require: true
	}
});