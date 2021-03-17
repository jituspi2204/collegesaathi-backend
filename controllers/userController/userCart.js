const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Users = require('../../models/userModel');
const SellerCart = require('../../models/sellerCartModel');
const Products = require('../../models/productModel');
const UserCart = require('../../models/userCartModel');
const User = require('../../models/userModel');
// const { findOne } = require('../../models/productModel');

exports.addToCart = hoc(async (req, res, next) => {
    try {
        let { sellerCartId, quantity } = { ...req.body };
        let userCart = await UserCart.findOne({ userId: req.user._id, sellerCartId });
        if (userCart) {
            await UserCart.findByIdAndUpdate(userCart._id, {
                quantity,
                amount: quantity * (userCart.mrp - userCart.discount),
            });
            userCart.quantity = quantity;
            userCart.amount = quantity * (userCart.mrp - userCart.discount);
        } else {
            let sellerCart = await SellerCart.findById(sellerCartId);
            userCart = await UserCart.create({
                userId: req.user._id,
                sellerId: sellerCart.sellerId,
                sellerCartId,
                name: sellerCart.name,
                mrp: sellerCart.mrp,
                discount: sellerCart.discount,
                quantity,
                image: sellerCart.images[0],
            });
            await User.findByIdAndUpdate(req.user._id, {
                $addToSet: { userCartItems: userCart._id },
            });
        }
        res.status(200).json({
            message: 'SUCCESS',
            cartItem: userCart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.getMyCart = hoc(async (req, res, next) => {
    try {
        let cart = await UserCart.find({ userId: req.user._id }).populate({
            path: 'sellerId',
            select: ['shopName', 'address'],
        });
        res.status(200).json({
            message: 'SUCCESS',
            cart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.deleteMyCart = hoc(async (req, res, next) => {
    try {
        let { userCartId } = { ...req.body };
        await UserCart.findOneAndDelete({ _id: userCartId, userId: req.user._id });
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { userCartItems: { $in: [userCartId] } },
        });
        res.status(200).json({
            message: 'SUCCESS',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});
