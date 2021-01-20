const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Users = require('../../models/userModel');
const SellerCart = require('../../models/sellerCartModel');
const Products = require('../../models/productModel');
const UserCart = require('../../models/userCartModel');
const User = require('../../models/userModel');
// const { findOne } = require('../../models/productModel');
const Orders = require('../../models/orderModel');

exports.getOrders = hoc(async (req, res,next) =>{
    try {
      let myOrders = await Orders.find({userId : req.user._id});
      res.status(200).json({
        message : "SUCCESS",
        myOrders
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR",
        })
    }
})

exports.placeOrder = hoc(async (req, res,next) =>{
    try {
        let {sellerCartId,productId, sellerId,quantity} = {...req.body};
        let sellerCart = await SellerCart.findById(sellerCartId);
        let order = await Orders.create({
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
            $addToSet : {order : order._id}
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


exports.placeOrderByCart = hoc(async (req, res,next) =>{
    try {
        let userCart = await UserCart.find({userId : req.user._id});
        let orderId =  new Date(Date.now()).getMilliseconds();
        for (let i = 0;i< userCart.length ;i++){
            let order = await Orders.create({
                userId : req.user._id,
                orderId : orderId,
                sellerId : userCart[i].sellerId,
                productId : userCart[i].productId,
                sellerCartId : userCart[i].sellerCartId,
                title : userCart[i].title,
                price : userCart[i].price,
                discount: userCart[i].discount,
                quantity : userCart[i].quantity
            });
            await User.findByIdAndUpdate(req.user._id, {
                $addToSet : {order : order._id},$pull : {cart : {$in : [userCart[i]['_id']]}}
            });
        }
        await UserCart.deleteMany({userId : req.user._id});
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