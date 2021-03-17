const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const SellerCart = require('../../models/sellerCartModel');
const Seller = require('../../models/sellerModel');
const Products = require('../../models/productModel');
const UserCart = require('../../models/userCartModel');
const fs = require('fs');
const User = require('../../models/userModel');
// const { findOne } = require('../../models/productModel');
const Orders = require('../../models/orderModel');
const OrderProduct = require('../../models/orderProductsModel');
const Notification = require('../../models/notificationsModel');
const Review = require('../../models/reviewModel');
const Transporter = require('../../models/transporterModel');
const createBill = require('../../utils/createBill');
const email = require('../../utils/email');
const Stripe = require('stripe');

var path = require('path');
const crypto = require('crypto');
const Razorpay = require('razorpay');
var instance = new Razorpay({
    key_id: 'rzp_test_F7dJtxqCBiBD7R',
    key_secret: 'hA8qn9opp0YoDes0A79AG2ux',
});
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function gnData(orders) {
    let orderSet = new Set();
    let shops = {};
    orders.forEach((item, idx) => {
        if (!orderSet.has(item.sellerId)) {
            orderSet.add(item.sellerId);
            shops[item.sellerId] = {
                shopName: item.shopName,
                shop_id: item.sellerId._id,
                shop_phoneNumber: item.sellerPhoneNumber,
                address: item.sellerAddress,
                products: [],
            };
        }
        shops[item.sellerId]['products'].push({
            amount: item.amount,
            _id: item._id,
            orderId: item.orderId,
            title: item.title,
            price: item.price,
            discount: item.discount,
            quantity: item.quantity,
        });
    });

    shops = Object.values(shops).map((item) => {
        return item;
    });
    let user = orders[0];
    return {
        u_address: user.address,
        u_name: user.recieverName,
        u_phoneNumber: user.recieverPhoneNumber,
        u_id: user.userId,
        orderId: user.orderId,
        method: user.method,
        shops: shops,
    };
}

exports.getOrders = hoc(async (req, res, next) => {
    try {
        let { id } = { ...req.query };
        if (id) {
            let order = await Orders.findOne({ orderId: id, userId: req.user._id })
                .populate({
                    path: 'sellerId',
                    select: ['shopName', 'address', 'phoneNumber', 'image'],
                })
                .populate({ path: 'reviewId' });
            res.status(200).json({
                message: 'SUCCESS',
                order,
            });
        } else {
            let orders = await Orders.find({ userId: req.user._id })
                .populate({
                    path: 'sellerId',
                    select: ['shopName', 'address', 'phoneNumber', 'image'],
                })
                .populate({ path: 'reviewId' });
            res.status(200).json({
                message: 'SUCCESS',
                orders,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.placeOrder = hoc(async (req, res, next) => {
    try {
        let { method, sellerCartId, quantity, address, name } = {
            ...req.body,
        };
        let orderId = Date.now() + '';
        let sellerCart = await SellerCart.findById(sellerCartId).populate({
            path: 'sellerId',
            select: ['shopName', 'address', 'phoneNumber'],
        });

        if (address.pincode !== sellerCart.sellerId.address.pincode + '') {
            console.log(sellerCart.sellerId);
            return res.status(404).json({
                message: 'DELIVERY_NOT_AVAILABLE',
            });
        }

        if (!sellerCart) {
            return res.status(404).json({
                message: 'PRODUCT_NOT_FOUND',
            });
        }

        let amount = (sellerCart.mrp - sellerCart.discount) * quantity;
        let receipt = {};
        if (method === 'ONLINE') {
            var options = {
                amount: amount * 100,
                currency: 'INR',
                receipt: orderId,
                notes: {
                    orderId: orderId,
                    discount: sellerCart.discount * quantity,
                    price: sellerCart.mrp * quantity,
                },
            };
            receipt = await instance.orders.create(options);
        }

        let transporters = await Transporter.find({
            pincode: address.pincode + '',
        });
        let minOrders = Number.MAX_VALUE;
        let transporter = -1;
        for (let i = 0; i < transporters.length; i++) {
            let orders = await Orders.find({
                transporterId: transporters[i]._id,
            }).countDocuments();
            if (orders < minOrders) {
                minOrders = orders;
                transporter = i;
            }
        }

        if (transporter === -1) {
            // console.log(transporters)
            return res.status(404).json({
                status: 'DELIVERY_NOT_AVAILABLE',
            });
        }
        const token = await crypto.randomBytes(2).toString('hex');
        let tracking = [
            {
                time: new Date(Date.now()).toLocaleTimeString(),
                date: new Date(Date.now()).toDateString(),
                address: '',
                status: 'Ordered',
            },
        ];
        let status = 'Cancelled';
        if (method === 'COD') {
            status = 'Pending';
        }

        let productOrder = await OrderProduct.create({
            name: sellerCart.name,
            image: sellerCart.image,
            quantity: quantity,
            mrp: sellerCart.mrp,
            discount: sellerCart.discount,
            amount,
            orderId,
            tracking,
            sellerId: sellerCart.sellerId._id,
            shopName: sellerCart.sellerId.shopName,
            sellerAddress: sellerCart.sellerId.address,
            sellerPhoneNumber: sellerCart.sellerId.phoneNumber,
        });
        let products = [];
        products.push(productOrder._id);
        let order = await Orders.create({
            userId: req.user._id,
            mrp: sellerCart.mrp * quantity,
            discount: sellerCart.discount * quantity,
            amount,
            method,
            orderId,
            status,
            products,
            refrenceId: receipt.id,
            receiverName: name,
            receiverAddress: address,
            receiverPhoneNumber: req.user.phoneNumber,
            transporterId: transporters[transporter]._id,
            pin: token,
        });
        await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { ordersList: { id: order._id, orderId, pin: token } },
        });

        // await Notification.create({
        //     senderName: req.user.name,
        //     recieverId: sellerCart.sellerId._id,
        //     title: 'New Order',
        //     message: `You have a new order with ID ${orderId} dated ${new Date(
        //         Date.now()
        //     ).toDateString()} from ${req.user.name}.`,
        // });
        await Notification.create({
            senderName: req.user.name,
            recieverId: transporters[transporter]._id,
            title: 'New Order',
            message: `You have a new order with ID ${orderId} dated ${new Date(
                Date.now()
            ).toDateString()} from ${req.user.name}.`,
        });
        res.status(200).json({
            message: 'SUCCESS',
            pin: token,
            orderId: orderId,
            id: order._id,
            receipt,
            order: [order],
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.placeOrderByCart = hoc(async (req, res, next) => {
    try {
        let { method, address, name } = {
            ...req.body,
        };
        let billData = [];
        let orderId = Date.now() + '';
        let userCart = await UserCart.find({ userId: req.user._id }).populate({
            path: 'sellerId',
            select: ['phoneNumber', 'shopName', 'address'],
        });

        if (userCart.length === 0) {
            return res.status(404).json({
                message: 'CART_IS_EMPTY',
            });
        }
        for (let i = 0; i < userCart.length; i++) {
            if (address.pincode !== userCart[i].sellerId.address.pincode + '') {
                console.log(sellerCart.sellerId);
                return res.status(404).json({
                    message: 'DELIVERY_NOT_AVAILABLE',
                });
            }
        }

        let amount = 0.0;
        let discount = 0.0;
        let price = 0.0;
        for (let i = 0; i < userCart.length; i++) {
            amount += (userCart[i].mrp - userCart[i].discount) * userCart[i].quantity;
            discount += userCart[i].discount * userCart[i].quantity;
            price += userCart[i].mrp * userCart[i].quantity;
        }
        let receipt = {};
        if (method === 'ONLINE') {
            var options = {
                amount: amount * 100,
                currency: 'INR',
                receipt: orderId,
                notes: {
                    orderId: orderId,
                    discount,
                    price,
                },
            };
            receipt = await instance.orders.create(options);
        }

        let transporters = await Transporter.find({
            pincode: address.pincode + '',
        });
        let minOrders = Number.MAX_VALUE;
        let transporter = -1;
        for (let i = 0; i < transporters.length; i++) {
            let orders = await Orders.find({
                transporterId: transporters[i]._id,
            }).countDocuments();
            if (orders < minOrders) {
                minOrders = orders;
                transporter = i;
            }
        }
        if (transporter === -1) {
            return res.status(404).json({
                status: 'DELIVERY_NOT_AVAILABLE',
            });
        }
        const token = await crypto.randomBytes(2).toString('hex');
        let status = 'Cancelled';
        if (method === 'COD') {
            status = 'Pending';
        }
        let productOrder = [];
        let products = [];
        let cartIDs = [];
        for (let i = 0; i < userCart.length; i++) {
            let tracking = [
                {
                    time: new Date(Date.now()).toLocaleTimeString(),
                    date: new Date(Date.now()).toDateString(),
                    address: '',
                    status: 'Ordered',
                },
            ];
            let temp = await OrderProduct.create({
                name: userCart[i].name,
                image: userCart[i].image,
                quantity: userCart[i].quantity,
                mrp: userCart[i].mrp,
                discount: userCart[i].discount,
                amount: (userCart[i].mrp - userCart[i].discount) * userCart[i].quantity,
                orderId,
                tracking,
                sellerId: userCart[i].sellerId._id,
                shopName: userCart[i].sellerId.shopName,
                sellerAddress: userCart[i].sellerId.address,
                sellerPhoneNumber: userCart[i].sellerId.phoneNumber,
            });
            productOrder.push(temp);
            products.push(temp._id);
            cartIDs.push(userCart[i]._id);
        }

        let order = await Orders.create({
            userId: req.user._id,
            mrp: price,
            discount: discount,
            amount,
            method,
            orderId,
            status,
            products,
            refrenceId: receipt.id,
            receiverName: name,
            receiverAddress: address,
            receiverPhoneNumber: req.user.phoneNumber,
            transporterId: transporters[transporter]._id,
            pin: token,
        });
        await Notification.create({
            senderName: req.user.name,
            recieverId: transporters[transporter]._id,
            title: 'New Order',
            message: `You have a new order with ID ${orderId} dated ${new Date(
                Date.now()
            ).toDateString()} from ${req.user.name}.`,
        });
        await UserCart.deleteMany({ userId: req.user._id });
        await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { ordersList: { id: order._id, orderId, pin: token } },
            $set: { userCartItems: [] },
        });
        res.status(200).json({
            message: 'SUCCESS',
            pin: token,
            orderId: orderId,
            id: order._id,
            receipt,
            order: [order],
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }

    // await new createBill(gnData(billData)).generateBill();
    // await new email(
    //     {
    //         name: req.user.name,
    //         email: req.user.email,
    //     },
    //     `https://quiet-scrubland-22380.herokuapp.com/bills/${orderId}.pdf`
    // ).orderedEmail();
});

exports.getShops = hoc(async (req, res, next) => {
    try {
        let { lat, lng, range } = { ...req.query };
        lat = parseFloat(lat);
        lng = parseFloat(lng);
        range = parseFloat(range);
        console.log(typeof lat);
        let shops = await Seller.aggregate([
            {
                $geoNear: {
                    near: [lng, lat],
                    distanceField: 'distance',
                    maxDistance: range / 6371,
                    distanceMultiplier: 6371,
                    spherical: true,
                },
            },
            {
                $project: {
                    name: 1,
                    shopName: 1,
                    address: 1,
                    image: 1,
                    distance: 1,
                    shopRating: 1,
                    phoneNumber: 1,
                },
            },
        ]);
        res.status(200).json({
            message: 'SUCCESS',
            shops,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.getShopProducts = hoc(async (req, res, next) => {
    try {
        let { shopId } = { ...req.query };
        let shopItems = await SellerCart.find({ sellerId: shopId }).populate({
            path: 'sellerId',
            select: ['shopName', 'address'],
        });
        res.status(200).json({
            message: 'SUCCESS',
            shopItems,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.reviewProduct = hoc(async (req, res, next) => {
    try {
        let { sellerId, sellerCartId, orderId, rating, message } = { ...req.body };
        rating = parseFloat(rating);
        let order = await Orders.findById(orderId);
        let oldReview = await Review.findOne({ orderId });
        if (oldReview) {
            await Review.findByIdAndUpdate(oldReview._id, {
                $set: { rating, message },
            });
            res.status(200).json({
                message: 'SUCCESS',
            });
        } else if (order.status === 'Delivered') {
            let review = await Review.create({
                userName: req.user.name,
                image: req.user.image,
                userId: req.user._id,
                rating,
                message,
                sellerId,
                sellerCartId,
                orderId,
            });
            await Orders.findByIdAndUpdate(orderId, {
                $set: { reviewId: review._id },
            });
            await Seller.findByIdAndUpdate(sellerId, {
                $inc: { 'shopRating.count': 1, 'shopRating.rating': rating },
            });
            await SellerCart.findByIdAndUpdate(sellerCartId, {
                $inc: { 'productRating.count': 1, 'productRating.rating': rating },
            });
            res.status(200).json({
                message: 'SUCCESS',
            });
        } else {
            res.status(401).json({
                message: 'INVALID_REVIEW',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.getInvoice = hoc(async (req, res) => {
    try {
        let { id } = { ...req.query };
        let order = await Orders.findOne({ orderId: id, userId: req.user._id });
        if (order) {
            res.download(`public/bills/${id}.pdf`, function (err) {});
        } else {
            res.status(404).json({
                message: 'FILE_NOT_FOUND',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.userPayment = hoc(async (req, res) => {
    try {
        let { razorpay_payment_id, razorpay_signature, orderId } = { ...req.body };
        let order = await Orders.findOne({ orderId });
        let key = await crypto
            .createHmac('sha256', 'hA8qn9opp0YoDes0A79AG2ux')
            .update(order.refrenceId + '|' + razorpay_payment_id)
            .digest('hex');
        if (key === razorpay_signature) {
            await Orders.updateMany(
                { orderId },
                {
                    $set: { transactionId: razorpay_payment_id, status: 'Pending' },
                }
            );
            let billData = [];
            billData.push(order);
            await new createBill(gnData(billData)).generateBill();
            await new email(
                {
                    name: req.user.name,
                    email: req.user.email,
                },
                `https://quiet-scrubland-22380.herokuapp.com/bills/${orderId}.pdf`
            ).orderedEmail();
            res.status(200).send({
                order: [{ ...order }],
                message: 'SUCCESS',
            });
        } else {
            res.status(401).send({
                order,
                message: 'INVALID_TRANSACTION',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});
