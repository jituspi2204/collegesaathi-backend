const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const SellerCart = require('../../models/sellerCartModel');
const Seller = require('../../models/sellerModel');
const Products = require('../../models/productModel');
const UserCart = require('../../models/userCartModel');
const User = require('../../models/userModel');
// const { findOne } = require('../../models/productModel');
const Orders = require('../../models/orderModel');
const Notification = require('../../models/notificationsModel');
const Review = require('../../models/reviewModel');
const Transporter = require('../../models/transporterModel');


function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }


exports.getOrders = hoc(async (req, res,next) =>{
    try {
      let myOrders = await Orders.find({userId : req.user._id}).populate({path : 'sellerId', select : ['shopName','address']}).populate({path : 'productId'}).populate({path : 'reviewId'});
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
            $addToSet : {userOrder : order._id}
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
        let {method,address} = {...req.body};
        let userCart = await UserCart.find({userId : req.user._id});
        let orderId =  Date.now() + '';

        let transporters = await Transporter.find({pincode : address.pincode});
        let minOrders = Number.MAX_VALUE;
        let transporter = -1;
        for(let i = 0; i < transporters.length;i++){
            let orders = await Orders.find({transporterId  : transporters[i]._id}).countDocuments();
            if(orders < minOrders){
                minOrders = orders;
                transporter = i;
            }
        }
        if(transporter === -1){
            return res.status(404).json({status : "DELIVERY_NOT_AVAILABLE"});
        }
        let tracking = [
            {
                time : new Date(Date.now()).toLocaleTimeString(),
                date : new Date(Date.now()).toDateString(),
                address : '',
                status : "Ordered"
            }
        ]
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
                quantity : userCart[i].quantity,
                method,
                tracking,
                address,
                transporterId : transporters[transporter]._id
            });
            await User.findByIdAndUpdate(req.user._id, {
                $addToSet : {userOrders : order._id},$pull : {userCartItems : {$in : [userCart[i]['_id']]}}
            });
            await Notification.create({
                senderName : req.user.name,
                recieverId : userCart[i].sellerId,
                title : 'New Order',
                message : `You have a new order with ID 
                ${orderId} dated ${new Date(Date.now()).toDateString()} 
                from ${req.user.name}. You can accept or decline the order.`
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


exports.getShops = hoc(async (req, res,next) =>{
    try {
        let {lat,lng,range} = {...req.query};
        lat = parseFloat(lat);
        lng = parseFloat(lng);
        range=parseFloat(range);
        console.log(typeof lat);
        let shops = await Seller.aggregate([
            {
                $geoNear : {
                    near: [lng, lat],
                    distanceField : "distance",
                    maxDistance : (range / 6371),
                    distanceMultiplier : 6371,
                    spherical : true
                }
            },
            {
                $project : {name : 1,shopName: 1,address : 1,image: 1,distance : 1}
            },
        ]);
        res.status(200).json({
            message : "SUCCESS",
            shops
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR",
        })
    }
})


exports.getShopProducts = hoc(async (req, res,next) =>{
    try {
        let {shopId} = {...req.query};
        let shopItems = await SellerCart.find({sellerId : shopId}).populate({path : 'sellerId', select : ['shopName','address']}).populate({path : 'productId'});
        res.status(200).json({
            message : "SUCCESS",
            shopItems
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR",
        })
    }
})


exports.reviewProduct = hoc(async (req, res,next) =>{
    try {
        let {sellerId,sellerCartId,orderId,rating,message} = {...req.body};
        rating = parseFloat(rating);
        let order = await Orders.findById(orderId);
        let oldReview = await Review.findOne({orderId});
        if(order.status === 'Delivered' && !oldReview){
            let review = await Review.create( {
                userName : req.user.name,
                image : req.user.image,
                userId : req.user._id,
                rating,
                message,
                sellerId,
                sellerCartId,
                orderId
            });
            await Orders.findByIdAndUpdate(orderId,{
                $set : {reviewId : review._id}
            })
            await Seller.findByIdAndUpdate(sellerId , {
                $inc : {'shopRating.count' : 1,'shopRating.rating' : rating}
            })
            await SellerCart.findByIdAndUpdate(sellerCartId,{
                $inc : {'productRating.count' : 1,'productRating.rating' : rating}
            })
            res.status(200).json({
                message : "SUCCESS",
            })
        }else{
            res.status(401).json({
                message : "INVALID_REVIEW",
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR",
        })
    }
})