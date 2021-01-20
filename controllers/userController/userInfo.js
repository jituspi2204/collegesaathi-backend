const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Users = require('../../models/userModel');


exports.info = hoc(async (req, res,next) => {
    res.status(200).json({
        message : 'SUCCESS',
        user : req.user
    })
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