const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Sellers = require('../../models/sellerModel');
const Products = require('../../models/productModel');
const SellerCart = require('../../models/sellerCartModel');


exports.getAllProducts = hoc(async(req , res ,next) => {
    try {
        let myProducts = await SellerCart.find({sellerId : req.seller._id}).populate({path : 'productId'});
        res.status(200).json({
            message : "SUCCESS",
            myProducts 
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})


exports.addProduct = hoc(async (req,res,next) => {
    try {
        let {productId,quantity,price,discount,title,extraDetails} = {...req.body};
        let product = Products.findById(productId);
        if(product){
            let newCart = await SellerCart.create({
                sellerId : req.seller._id,
                productId,
                quantity,
                price,
                discount,
                title,
                extraDetails,
            });
            res.status(200).json({
                message : 'SUCCESS'
            })
        }else{
            res.status(404).json({
                message : 'PRODUCT_NOT_FOUND',
            })
        }
    } catch (error) {
        res.status(500).json({
            message : 'SERVER_ERROR',
        })
    }
})



exports.updateProduct = hoc(async(req , res,next) => {
    try {
        let {cartId,updatedDetails} = {...req.body};
        let sellerCart = await SellerCart.findById(cartId);
        let amount = 0;
        if(updatedDetails.price && updatedDetails.discount){
            amount = updatedCart.price - updatedCart.discount;
        }else if(updatedDetails.price){
            amount = updatedDetails.price - sellerCart.discount;
        }else if(updatedDetails.discount){
            amount = sellerCart.price - updatedDetails.discount;
        }else{
            amount = sellerCart.amount;
        }
        let updatedCart = await SellerCart.updateOne({_id : cartId, sellerId : req.seller._id},{
            $set : {...updatedDetails,amount}
        });
        res.status(200).json({
            message : 'SUCCESS'
        })
    } catch (error) {
        res.status(404).json({
            message : 'CART_NOT_FOUND',
        })
    }
})


exports.deleteProduct = hoc(async(req , res,next) => {
    try {
        let {cartId} = {...req.body};
        await SellerCart.deleteOne({_id : cartId});
        res.status(200).json({
            message : 'SUCCESS'
        })
    } catch (error) {
        res.status(404).json({
            message : 'CART_NOT_FOUND',
        })
    }
})

