const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = Schema({
    amount: {
        type: Number,
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
    paymentStatus: {
        type: Boolean,
        default: false,
    },
    method: {
        type: String,
        default: 'COD',
        enum: ['COD', 'ONLINE'],
    },
    status: {
        type: String,
        default: 'Cancelled',
        enum: ['Pending', 'Delivered', 'Cancelled', 'Shipped', 'Packed', 'Out for Delivery'],
    },
    receiverName: {
        type: String,
        required: true,
    },
    receiverPhoneNumber: {
        type: String,
        required: true,
    },
    receiverAddress: {},
    transactionId: {
        type: String,
    },
    refrenceId: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    orderId: {
      type : String  
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'orderproduct',
        },
    ],
    pin: {
        type: String,
        required : true  
    },
    transporterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'transporter',
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
    this.amount = (this.price - this.discount);
    next();
});
orderSchema.pre('updateOne', function (next) {
    this.updatedAt = new Date(Date.now());
    next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
