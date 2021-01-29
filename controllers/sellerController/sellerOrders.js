const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Sellers = require('../../models/sellerModel');
const Order = require('../../models/orderModel');
const Notification = require('../../models/notificationsModel');



exports.updateOrderStatus = hoc(async(req ,res) => {
    try {
        let {status,userId} = {...req.body};
        for(let i = 0;i< status.length;i++){
            await Order.updateMany({userId,sellerId : req.seller._id, _id : status[i].id},{
                $set : {status : status[i].status}
            });
            await Notification.create({
                senderName : req.seller.shopName,
                recieverId : userId,
                title : `Order ${status[i].status}`,
                message : `${req.seller.shopName} has ${status[i].status.toLowerCase()} your order dated ${new Date(Date.now()).toDateString()}.`
            });
        }

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


exports.updateOrder = hoc(async(req ,res) => {
    try {
        let {address,orderId,status} = {...req.body};
        // if(status === 'Shipped' || status === 'Packed'){
            await Order.updateOne({sellerId : req.seller._id, _id : orderId},{
                $addToSet : {tracking : {
                    time : new Date(Date.now()).toLocaleTimeString(),
                    date : new Date(Date.now()).toDateString(),
                    address,
                    status
                }},
                $set : {status : status}
            });
            res.status(200).json({
                message : "SUCCESS",
            })

        // }else{
        //     res.status(404).json({
        //         message : "INVALID_STATUS",
        //     })

        // }
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR",
        })
    }
})


exports.getAllOrders = hoc(async(req ,res) => {
    try {
        let {address,orderId,status} = {...req.body};
        // if(status === 'Shipped' || status === 'Packed'){
            let orders = await Order.find({sellerId : req.seller._id}).populate({path : 'productId'}).populate({path : 'reviewId'});
            res.status(200).json({
                message : "SUCCESS",
                orders
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR",
        })
    }
})


exports.getOrderById = hoc(async(req ,res) => {
    try {
        let {id} = {...req.query};
        // if(status === 'Shipped' || status === 'Packed'){
            let order = await Order.findOne({sellerId : req.seller._id,_id : id}).populate({path : 'productId'}).populate({path : 'reviewId'});
            res.status(200).json({
                message : "SUCCESS",
                order
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR",
        })
    }
})
