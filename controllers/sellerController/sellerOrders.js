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
        let {address,orderId} = {...req.body};
        await Order.updateOne({sellerId : req.seller._id, _id : orderId},{
            $addToSet : {tracking : {
                time : new Date(Date.now()).toTimeString(),
                date : new Date(Date.now()).toDateString(),
                address,
                status : "Your order has been packed and send to courier person." 
            }}
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