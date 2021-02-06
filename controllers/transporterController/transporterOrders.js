const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Transporter = require('../../models/transporterModel');
const Order = require('../../models/orderModel');

exports.getAllOrders = hoc(async (req, res,next) => {

    try {
        let orders = await Order.find({transporterId : req.user._id});
        res.status(200).json({
            message : 'SUCCESS',
            orders
        })
    } catch (error) {
        res.status(500).json({
            message : 'SERVER_ERROR',
        })
    }
})

exports.getOrderById = hoc(async(req ,res) => {
    try {
        let {id} = {...req.query};
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
exports.updateOrder = hoc(async(req ,res) => {
    try {
        let {address,orderId,status} = {...req.body};
        if(status === 'Delivered'){
            await Order.updateOne({transporterId : req.user._id, _id : orderId,status : 'Packed'},{
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

        }else if(status === 'Delivered'){
            await Order.updateOne({transporterId : req.user._id, _id : orderId,status : 'Shipped'},{
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
        }else{
            res.status(404).json({
                message : "INVALID_STATUS",
            })

        }
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR",
        })
    }
})