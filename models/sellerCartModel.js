const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sellerCartSchema = Schema({
	quantity: {
		type: Number, 
		required: true
	},
	sellerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'seller',
		required: true
	},
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true
	},
	price : {
		type : Number,
		default : 0,
	},
	discount : {
		type : Number,
		default : 0,
	},
	amount : {
		type : Number,
	},
	category : {
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
	image : [],
	productRating : {
		rating : {
            type : Number,
            default : 0,
        },
        count : {
            type : Number,
            default : 0
        }
	},
	title : {
		type : String,
		required : [true , "INVALID_TITLE"]
	},
	extraDetails : {
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


sellerCartSchema.pre('save',function(next){
	this.amount = this.price - this.discount;
	next();
})
const SellerCart = mongoose.model('SellerCart', sellerCartSchema);
module.exports = SellerCart;