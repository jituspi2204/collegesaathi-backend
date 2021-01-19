const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = Schema({
	title: {
		type: String,
		required: true
	},
	catergory: {
		type: String,
		required: true
	},
	image: [
		{
			type: String,
			required: true
		}
	],
	description: {
		type: mongoose.Types.EmbeddedDocument,
		required: true
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

const Product = mongoose.model('Product', productSchema);
module.exports = Product;