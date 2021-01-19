const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Users = require('../../models/userModel');

exports.login = hoc(async (req,res,next) => {
    const {phoneNumber , uid} = {...req.body};
    try {
        let isVerified = firebaseAdmin.checkUser(phoneNumber, uid);
        if(isVerified){
            let user = await Users.findOne({phoneNumber});
            if(user){
                let token = await jwtUtils.createToken({phoneNumber , _id : user._id});
                res.status(200).json({
                    message : 'SUCCESS',
                    token
                })
            }else{
                res.status(404).json({
                    message : 'USER_NOT_FOUND'
                })
            }
        }
    } catch (error) {
        res.status(401).json({
            message : 'UNAUTHORIZED_USER'
        })
    }
});