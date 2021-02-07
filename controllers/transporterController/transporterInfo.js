const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Transporter = require('../../models/transporterModel');

exports.info = hoc(async (req, res,next) => {
    res.status(200).json({
        message : 'SUCCESS',
        transporter : req.user
    })
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