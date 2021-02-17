const Product = require('../../models/productModel');
const SellerCart = require('../../models/sellerCartModel');
const hoc = require('../utils/hoc');

exports.getProduct = hoc(async (req,res,next) => {
    try {
        let {s} = {...req.query};
        let rgx = new RegExp(`.${s}.` , 'ig');
        let list = await Product.find({title : {$in: [ rgx]} });
        res.status(200).json({
            message : 'SUCCESS',
            list
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})

exports.getProductById = hoc(async (req,res,next) => {
    try {
        let {id} = {...req.query};
        let product = await Product.findById(id);
        res.status(200).json({
            message : 'SUCCESS',
            product
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})

exports.getSellerProductById = hoc(async (req,res,next) => {
    try {
        let {id} = {...req.query};
        let product = await SellerCart.findById(id);
        res.status(200).json({
            message : 'SUCCESS',
            product
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})


exports.getProductByBarcode = hoc(async (req,res,next) => {
    try {
        let {barcode} = {...req.query};
        let product = await Product.findOne({barcode});
        res.status(200).json({
            message : 'SUCCESS',
            product
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})

exports.sellerProducts = hoc(async (req,res,next) => {
    try {
        let {s,sellerId,category} = {...req.query};
        let list = [];
        if(s && sellerId){
            let rgx = new RegExp(`.${s}.` , 'ig');
            let prgx = new RegExp(`${s}.` , 'ig');
            let porgx = new RegExp(`.${s}` , 'ig');
            list = await SellerCart.find({title : {$in: [ rgx,porgx,prgx]} ,sellerId : sellerId})
            .populate({path : 'sellerId', select : ['shopName','address']})
            .populate({path : 'productId'});
        }else if(category & sellerId){
            let rgx = new RegExp(`.${category}.` , 'ig');
            let prgx = new RegExp(`${category}.` , 'ig');
            let porgx = new RegExp(`.${category}` , 'ig');
            list = await SellerCart.find({category : {$in: [ rgx,porgx,prgx]} ,sellerId : sellerId})
            .populate({path : 'sellerId', select : ['shopName','address']})
            .populate({path : 'productId'});
        }
        else if(s){
            let rgx = new RegExp(`.${s}.` , 'ig');
            let prgx = new RegExp(`${s}.` , 'ig');
            let porgx = new RegExp(`.${s}` , 'ig');
            list = await SellerCart.find({title : {$in: [ rgx,porgx,prgx]} })
            .populate({path : 'sellerId', select : ['shopName','address']})
            .populate({path : 'productId'});
        }else if(sellerId){
            list = await SellerCart.find({sellerId: sellerId})
            .populate({path : 'sellerId', select : ['shopName','address']})
            .populate({path : 'productId'});
        }
        res.status(200).json({
            message : 'SUCCESS',
            list
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})

exports.sellerCart = hoc(async (req,res,next) => {
    try {
        let {sellerCartId} = {...req.query};
        let sellerCart = await SellerCart.findById(sellerCartId)
        .populate({path : 'sellerId', select : ['shopName','address']})
        .populate({path : 'productId'});
        res.status(200).json({
            message : 'SUCCESS',
            sellerCart
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})

