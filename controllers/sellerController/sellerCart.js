const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Sellers = require('../../models/sellerModel');
const Products = require('../../models/productModel');
const SellerCart = require('../../models/sellerCartModel');


exports.getProduct = hoc(async(req , res ,next) => {
    try {
        let { id } = { ...req.query };
        if (id) {
            let cartItem = await SellerCart.findOne({ sellerId: req.seller._id, _id: id });
            res.status(200).json({
                message: 'SUCCESS',
                cartItem,
            });
        } else {
            let cart = await SellerCart.find({sellerId : req.seller._id});
            res.status(200).json({
                message : "SUCCESS",
                cart  
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})


exports.addProduct = hoc(async (req,res,next) => {
    try {
        let {productId,quantity,mrp,discount,moreDetails} = {...req.body};
        let product = await Products.findById(productId);
        let oldCart = await SellerCart.findOne({ sellerId: req.seller._id, productId });
        if (product && !oldCart) {
            let newCart = await SellerCart.create({
                sellerId: req.seller._id,
                quantity,
                mrp,
                discount,
                moreDetails,
                barcode: product.barcode,
                details: product.details,
                images: product.images,
                name: product.name,
                description: product.description,
                category : product.category
            });
            res.status(200).json({
                message: 'SUCCESS',
                cart : newCart
            })
        }else if(oldCart){
            res.status(404).json({
                message : 'PRODUCT_ALREADY_ADDED',
            })
        } else {
            res.status(404).json({
                message: 'PRODUCT_NOT_FOUND',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : 'SERVER_ERROR',
        })
    }
})



exports.updateProduct = hoc(async(req , res,next) => {
    try {
        let {id,updatedDetails} = {...req.body};
        let sellerCart = await SellerCart.findById(id);
        let amount = 0;
        if(updatedDetails.mrp && updatedDetails.discount){
            amount = updatedCart.mrp - updatedCart.discount;
        }else if(updatedDetails.mrp){
            amount = updatedDetails.mrp - sellerCart.discount;
        }else if(updatedDetails.discount){
            amount = sellerCart.mrp - updatedDetails.discount;
        }else{
            amount = sellerCart.amount;
        }
        let updatedCart = await SellerCart.updateOne({_id : id, sellerId : req.seller._id},{
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
        let { id } = { ...req.body };
        console.log(id);
        await SellerCart.deleteOne({_id : id,sellerId : req.seller._id});
        res.status(200).json({
            message : 'SUCCESS'
        })
    } catch (error) {
        res.status(404).json({
            message : 'CART_NOT_FOUND',
        })
    }
})

