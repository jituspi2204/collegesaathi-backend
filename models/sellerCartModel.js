const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sellerCartSchema = Schema({
    quantity: {
        type: Number,
        required: true,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller',
        required: true,
    },
    mrp: {
        type: Number,
        default: 0.0,
    },
    discount: {
        type: Number,
        default: 0.0,
    },
    amount: {
        type: Number,
        default: 0.0,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    catergory: {
        type: String,
        default: 'Other',
        enum: [
            'Fruits & Vegetables',
            'Foodgrains , Oil & Masla',
            'Bakery, Cakes & Dairy',
            'Beverages',
            'Snacks',
            'Beauty & Hygiene',
            'Household',
            'Kitchen & Garden',
            'Non-veg Food',
            'Gourment & World Food',
            'Baby care',
            'Clothing',
            'Electronics',
            'Stationery',
            'Other',
        ],
    },
    images: [
        {
            type: String,
            default: 'product.jpg',
        },
    ],
    barcode: {
        type: String,
    },
    details: {
        manufacturer: {
            type: String,
            default: '',
        },
        batch: {
            type: String,
        },
        brand: {
            type: String,
            default: '',
        },
        weight: {
            type: String,
            default: '',
        },
        quantity: {
            type: String,
            default: 0,
        },
        unit: {
            type: String,
            enum: ['kg', 'l', 'piece', 'unit', 'dozen', 'pair', 'gm'],
        },
        dom: {
            type: Schema.Types.Date,
        },
        doe: {
            type: Schema.Types.Date,
        },
        application: {
            type: String,
        },
        storage: {
            type: String,
        },
        nutritional_information: {},
        features: {},
    },
    moreDetails: {},
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: new Date(Date.now()),
    },
    updatedAt: {
        type: mongoose.Schema.Types.Date,
        default: new Date(Date.now()),
    },
});


sellerCartSchema.pre('save',function(next){
	this.amount = this.mrp - this.discount;
	next();
})
const SellerCart = mongoose.model('SellerCart', sellerCartSchema);
module.exports = SellerCart;