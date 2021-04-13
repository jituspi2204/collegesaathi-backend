const hoc = require('../utils/hoc');

const Student = require('../../models/studentModel');
const Semester = require('../../models/semesterModel');
const College = require('../../models/collegeModel');
const Subject = require('../../models/subjectsModel');
const firebaseAdmin = require('../utils/admin');

const programCode = {
    '027': 'BTech - Computer Science and Engineering',
};

exports.utils = hoc(async (req, res, next) => {
    try {
        let colleges = await College.find().sort({name : 1});
        let subjects = await Subject.find().sort({id : 1});
        res.status(200).json({
            message: 'SUCCESS',
            colleges,
            subjects
        });
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});





exports.getUser = hoc(async (req, res, next) => {
    try {
        const { phoneNumber} = req.body;
        let user = await Student.findOne({ phoneNumber });
        if (user) {
            res.status(200).json({
                message: 'SUCCESS',
            });
        } else {
            res.status(404).json({
                message: 'SUCCESS',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.login = hoc(async (req, res, next) => {
    try {
        const { phoneNumber, uid } = req.body;
        let user = await Student.findOne({ phoneNumber });
        let isVerified = await firebaseAdmin.checkUser(phoneNumber, uid);
        if (user.phoneNumber === phoneNumber && isVerified) {
            res.status(200).json({
                message: 'SUCCESS',
                id: user._id,
                phoneNumber: user.phoneNumber,
                rollno: user.rollno,
                user
            });
        } else {
            res.status(401).json({
                message: 'INVALID_DETAILS',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.register = hoc(async (req, res, next) => {
    try {
        const { phoneNumber, uid ,rollno} = req.body;
        let user = await Student.findOne({ rollno });
        let isVerified = await firebaseAdmin.checkUser(phoneNumber, uid);
        if (user.phoneNumber === '+910000000000' && isVerified) {
            let college = await College.find();
            let code = rollno.substring(3, 6);
            let userCollege = {};
            let pc = programCode[rollno.substring(6, 9)];
            for (let i = 0; i < college.length; i++) {
                if (code == college[i].id) {
                    userCollege = college[i];
                    break;
                }
            }
            // console.log(userCollege);
            await Student.findByIdAndUpdate(user._id, {
                course: pc,
                college: userCollege.name,
                phoneNumber,
            });
            res.status(200).json({
                message: 'SUCCESS',
                id: user._id,
                phoneNumber,
                rollno: user.rollno,
                user: {
                    ...user,
                    course: pc,
                    college: userCollege.name,
                    phoneNumber,
                },
            });
        } else {
            res.status(401).json({
                message: 'ALREADY_REGISTERED',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.details = hoc(async (req, res, next) => {
    try {
        const { id } = req.query;
        let user = await Student.findById(id);
        let semesters = await Semester.find({ rollno: user.rollno });
        res.status(200).json({
            message: 'SUCCESS',
            user,
            semesters,
        });
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.getMarksBySemester = hoc(async (req, res, next) => {
    try {
        const { semester, rollno } = req.query;
        let semesters = await Semester.findOne({ rollno, semester });
        res.status(200).json({
            message: 'SUCCESS',
            semesters,
        });
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});
exports.getMarks = hoc(async (req, res, next) => {
    try {
        const { rollno } = req.query;
        let user = await Student.findOne({ rollno });
        let semesters = await Semester.find({ rollno });
        res.status(200).json({
            message: 'SUCCESS',
            semesters,
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.collegeRank = hoc(async (req, res, next) => {
    try {
        const { collegeId, batch, semester } = req.query;
        let rgx = new RegExp(`[0-9]{3}${collegeId}[0-9]{5}$`, 'ig');
        let students = [];
        if (semester > 0) {
            students = await Semester.find({ rollno: { $in: [rgx] }, batch, semester })
                .select(['name', 'percentage', 'sgpa', 'rollno'])
                .sort({
                    percentage: -1,sgpa : -1
                });
        } else {
            students = await Student.find({ rollno: { $in: [rgx] }, batch })
                .select(['name', 'college', 'percentage', 'cgpa', 'rollno'])
                .sort({
                    percentage: -1,cgpa : -1,
                });
        }
        res.status(200).json({
            message: 'SUCCESS',
            students,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.universityRank = hoc(async (req, res, next) => {
    try {
        const { batch, semester } = req.query;
        let students = [];
        if (semester > 0) {
            students = await Semester.find({ batch, semester })
                .select(['name', 'percentage', 'sgpa', 'rollno'])
                .sort({
                    percentage: -1,
                    sgpa: -1,
                });
                
        } else {
            students = await Student.find({ batch })
                .select(['name', 'college', 'percentage', 'cgpa', 'rollno'])
                .sort({
                    percentage: -1,
                    cgpa: -1,
                });
        }
        res.status(200).json({
            message: 'SUCCESS',
            students,
        });
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});
