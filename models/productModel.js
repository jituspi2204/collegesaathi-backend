const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = Schema({
	title: {
		type: String,
		require: true
	},
	catergory: {
		type: String,
		require: true
	},
	image: [
		{
			type: String,
			require: true
		}
	],
	description: {
		type: mongoose.Types.EmbeddedDocument,
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

const Product = mongoose.model('Product', productSchema);
module.exports = Product;