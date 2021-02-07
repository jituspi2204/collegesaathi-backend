const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Transporter = require('../../models/transporterModel');
const Order = require('../../models/orderModel');
const User = require('../../models/userModel');

exports.getAllOrders = hoc(async (req, res,next) => {

    try {
        let orders = await Order.find({transporterId : req.user._id}).sort({createdAt : 1})
        .populate({path : 'productId',select : ['image']});
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
        let order = await Order.findOne({transporterId : req.user._id,_id : id})
        .populate({path : 'productId'})
        .populate({path : 'reviewId'});
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
        let {address,orderId,status,pin,id} = {...req.body};
        if(status === 'Shipped'){
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
            let order = await Order.findById(orderId);
            let user = await User.findById(order.userId).select('ordersList tokens');
            let index = user.ordersList.indexOf(id);
            if(pin === user.tokens[index]){
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
                    message : "PIN_INVALID",
                })
            }
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