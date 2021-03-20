const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'product.png',
    },
    quantity: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        default: 0.0,
    },
    mrp: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    orderId: {
        type: String,
    },
    tracking: [],
    reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'seller',
    },
    shopName: {
        type: String,
        required: true,
    },
    sellerAddress: {},
    sellerCartId: {
        type: Schema.Types.ObjectId,
        ref : 'sellercart'
    },
    sellerPhoneNumber: {
        type: String,
        required: true,
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

orderSchema.pre('save', function (next) {
    this.amount = (this.mrp - this.discount) * this.quantity;
    next();
});
orderSchema.pre('updateOne', function (next) {
    this.updatedAt = new Date(Date.now());
    next();
});

const OrderProduct = mongoose.model('OrderProduct', orderSchema);
module.exports = OrderProduct;
