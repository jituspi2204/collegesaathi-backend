const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Transporter = require('../../models/transporterModel');
const Order = require('../../models/orderModel');
const User = require('../../models/userModel');
const OrderProduct = require('../../models/orderProductsModel');

exports.getAllOrders = hoc(async (req, res,next) => {

    try {
        let orders = await Order.find({transporterId : req.user._id}).sort({createdAt : 1})
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
exports.getOrdersByOrderId = hoc(async (req, res, next) => {
    try {
        let { orderId } = { ...req.query };
        let order = await Order.findOne({ transporterId: req.user._id,orderId});
        res.status(200).json({
            message: 'SUCCESS',
            order,
        });
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.getOrderProducts = hoc(async(req ,res) => {
    try {
        let {orderId} = {...req.query};
        let orders = await OrderProduct.find({transporterId : req.user._id,orderId : orderId})
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
exports.updateOrder = hoc(async(req ,res) => {
    try {
        let {address,orderId,status,pin,id,amount} = {...req.body};
        if(status === 'Shipped'){
            await OrderProduct.updateOne({transporterId : req.user._id, _id : id,status : 'Packed'},{
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
            let order = await Order.findOne({orderId});
            if (amount !== order.amount) {
                 return res.status(401).json({
                     message: 'INVALID_AMOUNT',
                 });
            }
            let user = await User.findById(order.userId).select('ordersList');
            let index = -1;
            for (let i = 0; i < user.ordersList.length; i++){
                if (user.ordersList[i].orderId === orderId) {
                    index = i;
                    return;
                }
            }
            if(index !== -1 && pin === user.ordersList[index]){
                let order = await OrderProduct.updateOne({transporterId : req.user._id, _id : id,status : 'Shipped'},{
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
                    order
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