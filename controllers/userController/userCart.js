const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Users = require('../../models/userModel');
const SellerCart = require('../../models/sellerCartModel');
const Products = require('../../models/productModel');
const UserCart = require('../../models/userCartModel');
const User = require('../../models/userModel');
// const { findOne } = require('../../models/productModel');

exports.addToCart = hoc(async(req ,res,next) => {
    try {
        let {sellerCartId,productId, sellerId,quantity} = {...req.body};
        let sellerCart = await SellerCart.findById(sellerCartId);
        let userCart = await UserCart.create({
            userId : req.user._id,
            sellerId,
            productId,
            sellerCartId,
            title : sellerCart.title,
            price : sellerCart.price,
            discount: sellerCart.discount,
            quantity,
        });
        await User.findByIdAndUpdate(req.user._id, {
            $addToSet : {cart : userCart._id}
        });
        res.status(200).json({
            message : "SUCCESS",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR",
        })
    }
})


exports.getMyCart = hoc(async(req ,res,next) => {
    try {
        let myCart = await UserCart.find({userId : req.user._id});
        res.status(200).json({
            message : "SUCCESS",
            myCart
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR",
        })
    }
})


exports.updateMyCart = hoc(async(req ,res,next) => {
    try {
        let {userCartId,quantity} = {...req.body};
        let userCart = await UserCart.findById(userCartId);
        let amount = quantity * (userCart.price - userCart.discount);
        await UserCart.updateOne({_id : userCartId , userId : req.user._id},{
            $set : {quantity, amount}
        })
        res.status(200).json({
            message : "SUCCESS",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR",
        })
    }
})


exports.deleteMyCart = hoc(async(req ,res,next) => {
    try {
        let {userCartId} = {...req.body};
        await UserCart.findOneAndDelete({_id : userCartId , userId : req.user._id});
        await User.findByIdAndUpdate(req.user._id, {
            $pull : {cart : {$in : [userCartId]}}
        });
        res.status(200).json({
            message : "SUCCESS",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR",
        })
    }
})