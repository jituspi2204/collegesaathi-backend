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
const Notification = require('../../models/notificationsModel');
const Review = require('../../models/reviewModel');
const Transporter = require('../../models/transporterModel');
const createBill  = require('../../utils/createBill');
const email = require('../../utils/email');
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51IONG6EjWr7qmS87BXlKPLdgrI6U6zs0uTcSrVYqcZhZPYX38ZPz4oDknlWoEu1OsoibFjpxEGqci9k0U1CYZOhR00TdU2J65s');
var path = require('path');  
const crypto = require('crypto');
const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: 'rzp_test_F7dJtxqCBiBD7R', key_secret: 'hA8qn9opp0YoDes0A79AG2ux' })
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


function gnData(orders){

    let orderSet = new Set();
    let shops = {};
    orders.forEach((item,idx) => {
        if(!orderSet.has(item.sellerId)){
            orderSet.add(item.sellerId)
            shops[item.sellerId] = {
                shopName : item.shopName,
                shop_id : item.sellerId._id,
                shop_phoneNumber : item.sellerPhoneNumber,
                address  : item.sellerAddress,
                products : []
            }
        }
        shops[item.sellerId]['products'].push({
            "amount": item.amount,
            "_id": item._id,
            "orderId": item.orderId,
            "title": item.title,
            "price": item.price,
            "discount": item.discount,
            "quantity": item.quantity,
        })
    })
     
    shops = Object.values(shops).map((item) => {
        return item;
    })
    let user = orders[0];
    return {
        u_address  : user.address,
        u_name : user.recieverName,
        u_phoneNumber : user.recieverPhoneNumber,
        u_id : user.userId,
        orderId : user.orderId,
        "method": user.method,
        shops : shops
    }
}

exports.getOrders = hoc(async (req, res,next) =>{
    try {
      let myOrders = await Orders.find({userId : req.user._id})
      .populate({path : 'sellerId', select : ['shopName','address']})
      .populate({path : 'productId'}).populate({path : 'reviewId'});
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
        let {method,sellerCartId,productId,sellerId,quantity,} = {...req.body};
        let orderId =  Date.now() + '';
        let sellerCart = await SellerCart.findById(sellerCartId)
        .populate({path : 'sellerId', select : ['shopName','address','phoneNumber']})
        .populate({path : 'productId'});
        let amount = (sellerCart.price - sellerCart.discount) * quantity;
        let receipt = {};
        if(method !== 'COD'){
            var options = {
                amount: amount * 100, 
                currency: "INR",
                receipt: orderId,
                notes : {
                    orderId : orderId
                }
            };
            receipt = await instance.orders.create(options);
        }
        console.log("Recueot ," , receipt);
        let billData = [];
        let transporters = await Transporter.find({pincode : req.user.address[0].pincode});
        let minOrders = Number.MAX_VALUE;
        let transporter = -1;
        for(let i = 0; i < transporters.length;i++){
            let orders = await Orders.find({transporterId  : transporters[i]._id})
            .countDocuments();
            if(orders < minOrders){
                minOrders = orders;
                transporter = i;
            }
        }
        if(transporter === -1){
            return res.status(404).json({status : "DELIVERY_NOT_AVAILABLE"});
        }
        const token = await crypto.randomBytes(6).toString('hex');
        let tracking = [
            {
                time : new Date(Date.now()).toLocaleTimeString(),
                date : new Date(Date.now()).toDateString(),
                address : '',
                status : "Ordered"
            }
        ]
       
        let order = await Orders.create({
            userId : req.user._id,
            orderId : orderId,
            sellerId : sellerId,
            productId : productId,
            sellerCartId : sellerCartId,
            title : sellerCart.title,
            price : sellerCart.price,
            discount: sellerCart.discount,
            quantity : quantity,
            sellerPhoneNumber: sellerCart.sellerId.phoneNumber,
            shopName: sellerCart.sellerId.shopName,
            sellerAddress : sellerCart.sellerId.address,
            recieverPhoneNumber : req.user.phoneNumber,
            method,
            tracking,
            transactionId : receipt.id,
            address : req.user.address[0],
            recieverName : req.user.name,
            transporterId : transporters[transporter]._id
        });
        await User.findByIdAndUpdate(req.user._id, {
            $addToSet : {userOrders : order._id,tokens : token,ordersList : orderId},
        });

        await Notification.create({
            senderName : req.user.name,
            recieverId : sellerId,
            title : 'New Order',
            message : `You have a new order with ID ${orderId} dated ${new Date(Date.now()).toDateString()} from ${req.user.name}. You can accept or decline the order.`
        });
        await Notification.create({
            senderName : req.user.name,
            recieverId : transporters[transporter]._id,
            title : 'New Order',
            message : `You have a new order with ID ${orderId} dated ${new Date(Date.now()).toDateString()} from ${req.user.name}.`
        });

        billData.push(order);
        // await new createBill(gnData(billData)).generateBill();
        // await new email({
        //     name : req.user.name,
        //     email : req.user.email
        // },`https://quiet-scrubland-22380.herokuapp.com/bills/${orderId}.pdf`)
        // .orderedEmail();
        res.status(200).json({
            message : "SUCCESS",
            pin : token,
            orderId : orderId,
            receipt
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
        let {method,address,name} = {...req.body};
        let billData = [];
        let transporters = await Transporter.find({pincode : req.user.address[0].pincode});
        let minOrders = Number.MAX_VALUE;
        let transporter = -1;
        for(let i = 0; i < transporters.length;i++){
            let orders = await Orders.find({transporterId  : transporters[i]._id})
            .countDocuments();
            if(orders < minOrders){
                minOrders = orders;
                transporter = i;
            }
        }
        if(transporter === -1){
            return res.status(404).json({status : "DELIVERY_NOT_AVAILABLE"});
        }
        let userCart = await UserCart.find({userId : req.user._id})
        .populate({path : 'sellerId',select : ['phoneNumber','shopName','address']});
        let orderId =  Date.now() + '';
        const token = await crypto.randomBytes(6).toString('hex');
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
                sellerPhoneNumber: userCart[i].sellerId.phoneNumber,
                shopName: userCart[i].sellerId.shopName,
                sellerAddress : userCart[i].sellerId.address,
                recieverPhoneNumber : req.user.phoneNumber,
                method,
                tracking,
                address : req.user.address[0],
                recieverName : req.user.name,
                transporterId : transporters[transporter]._id
            });
            await User.findByIdAndUpdate(req.user._id, {
                $addToSet : {userOrders : order._id,tokens : token,ordersList : orderId},
                $pull : {userCartItems : {$in : [userCart[i]['_id']]}}
            });
            await Notification.create({
                senderName : req.user.name,
                recieverId : userCart[i].sellerId,
                title : 'New Order',
                message : `You have a new order with ID 
                ${orderId} dated ${new Date(Date.now()).toDateString()} from ${req.user.name}. You can accept or decline the order.`
            });
            await Notification.create({
                senderName : req.user.name,
                recieverId : transporters[transporter]._id,
                title : 'New Order',
                message : `You have a new order with ID ${orderId} dated ${new Date(Date.now()).toDateString()} from ${req.user.name}.`
            });

            billData.push(order);
        }
        await UserCart.deleteMany({userId : req.user._id});
        await new createBill(gnData(billData)).generateBill();
        await new email({
            name : req.user.name,
            email : req.user.email
        },`https://quiet-scrubland-22380.herokuapp.com/bills/${orderId}.pdf`)
        .orderedEmail();
        res.status(200).json({
            message : "SUCCESS",
            pin : token,
            orderId : orderId,
            charge
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
                $project : {
                    name : 1,
                    shopName: 1,
                    address : 1,
                    image: 1,
                    distance : 1,
                    shopRating : 1,
                    phoneNumber : 1
                }
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
        let shopItems = await SellerCart.find({sellerId : shopId})
        .populate({path : 'sellerId', select : ['shopName','address']})
        .populate({path : 'productId'});
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
        if(oldReview){
            await Review.findByIdAndUpdate(oldReview._id,{
                $set : {rating ,message}
            })
            res.status(200).json({
                message : "SUCCESS",
            })
        }else if(order.status === 'Delivered'){
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

exports.getInvoice = hoc(async(req ,res) => {
    try {
        let {id} = {...req.query};
        let order = await Orders.findOne({orderId : id,userId : req.user._id});
        if(order){
            res.download(`public/bills/${id}.pdf`, function (err) {
         });
        }else{
            res.status(404).json({
                message : "FILE_NOT_FOUND",
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR",
        })
    }
})




exports.userPayment =  hoc(async(req ,res) => {
    try {
        let orderId = req.query.orderId;
        var options = {
            amount: 5000, 
            currency: "INR",
            receipt: "order_rcptid_11"
          };
        instance.orders.create(options, function(err, order) {
            if(order){
                res.send(order)
            }else{
                res.status(500).json()
            }
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR",
        })
    }
})
