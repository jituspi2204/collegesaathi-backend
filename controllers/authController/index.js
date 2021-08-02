const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const Student = require('../../models/studentModel');

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