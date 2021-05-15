const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Sellers = require('../../models/sellerModel');
const Users = require('../../models/userModel');
const Transporter = require('../../models/transporterModel');
const Student = require('../../models/studentModel');


exports.verifySellerMiddleware = hoc(async(req , res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    try {
        let payload = await jwtUtils.verifyToken(token);
        if(payload){
            let seller = await Sellers.findById(payload._id);
            req.seller = seller;
            next();
        }else{
            res.status(401).json({
                message : 'UNAUTHORIZED_USER'
            })
        }
    } catch (error) {
        res.status(401).json({
            message : 'UNAUTHORIZED_USER'
        })
    }
})



exports.verifyUserMiddleware = hoc(async(req , res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    try {
        let payload = await jwtUtils.verifyToken(token);
        if(payload){
            let user = await Users.findById(payload._id);
            req.user = user;
            next();
        }else{
            res.status(401).json({
                message : 'UNAUTHORIZED_USER'
            })
        }
    } catch (error) {
        res.status(401).json({
            message : 'UNAUTHORIZED_USER'
        })
    }
})


exports.verifyTransporterMiddleware = hoc(async(req , res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    try {
        let payload = await jwtUtils.verifyToken(token);
        if(payload){
            let user = await Transporter.findById(payload._id);
            req.user = user;
            next();
        }else{
            res.status(401).json({
                message : 'UNAUTHORIZED_USER'
            })
        }
    } catch (error) {
        res.status(401).json({
            message : 'UNAUTHORIZED_USER'
        })
    }
})


exports.verifyStudentMiddleware = hoc(async (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    try {
        let payload = await jwtUtils.verifyToken(token);
        if (payload) {
            let user = await Student.findOne({ email : payload.email }).populate('notifications');
            req.user = user;
            next();
        } else {
            res.status(401).json({
                message: 'UNAUTHORIZED_USER',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: 'UNAUTHORIZED_USER',
        });
    }
});