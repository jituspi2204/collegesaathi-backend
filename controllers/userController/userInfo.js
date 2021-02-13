const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Users = require('../../models/userModel');
const Notification = require('../../models/notificationsModel');
const User = require('../../models/userModel');


exports.info = hoc(async (req, res,next) => {
    res.status(200).json({
        message : 'SUCCESS',
        user : req.user
    })
})

exports.addAddress = hoc(async (req, res ,next) => {
    try {
        let {address} = {...req.body};
        await Users.findByIdAndUpdate(req.user._id, {
           $addToSet : {address : address}
        });
        res.status(200).json({
            message : "SUCCESS"
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})


exports.updateLocation = hoc(async (req, res ,next) => {
    try {
        let {coordinates} = {...req.body};
        await Users.findByIdAndUpdate(req.user._id, {
            'location.coordinates' : coordinates
        });
        res.status(200).json({
            message : "SUCCESS"
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})


exports.updateUserDetails = hoc(async (req, res ,next) => {
    try {
        let {updatedDetails} = {...req.body};
        await Users.findByIdAndUpdate(req.user._id, {
           ...updatedDetails
        });
        res.status(200).json({
            message : "SUCCESS"
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})


exports.getNotifications = hoc(async (req, res ,next) => {
    try {
        let notifications = await Notification.find({recieverId : req.user._id});
        res.status(200).json({
            message : "SUCCESS",
            notifications
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})


exports.deleteNotifications = hoc(async (req, res ,next) => {
    try {
        let notifications = await Notification.deleteMany({recieverId : req.user._id});
        res.status(200).json({
            message : "SUCCESS",
            notifications
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})

exports.subscribeShop = hoc(async (req, res ,next) => {
    const {sellerId} = {...req.query};
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $addToSet : {subscribedShops : sellerId}
        });
        res.status(200).json({
            message : "SUCCESS",
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})

exports.unsubscribeShop = hoc(async (req, res ,next) => {
    const {sellerId} = {...req.query};
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull : {subscribedShops : sellerId}
        });
        res.status(200).json({
            message : "SUCCESS",
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})