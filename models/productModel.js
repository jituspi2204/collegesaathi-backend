const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
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
    mrp: {
        type: Number,
        default: 0.0,
    },
    images: [
        {
            type: String,
            default: 'product.jpg',
        },
    ],
    barcode: {
        type: String,
        required: true,
    },
    details: {
        manufacturer: {
            type: String,
            default: '',
		},
		batch: {
			type : String
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
			enum : ['kg', 'l', 'piece','unit','dozen','pair','gm']
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
			type : String
		},
        nutritional_information: {},
		features: {},
		
    },
    description: {
        type: String,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: new Date(Date.now()),
    },
    updatedAt: {
        type: mongoose.Schema.Types.Date,
        default: new Date(Date.now()),
    },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
