const hoc = require('../utils/hoc');

const Student = require('../../models/studentModel');
const Semester = require('../../models/semesterModel');
const College = require('../../models/collegeModel');
const firebaseAdmin = require('../utils/admin');


const programCode = {
    '027': 'BTech - Computer Science and Engineering',
};

exports.getUser = hoc(async (req, res, next) => {
    try {
        const { phoneNumber, rollno } = req.body;
        let user = await Student.findOne({ phoneNumber, rollno });
        res.status(200).json({
            message: 'SUCCESS',
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.register = hoc(async (req, res, next) => {
    try {
        const { phoneNumber, rollno ,uid} = req.body;
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
        if (semester) {
             students = await Semester.find({ rollno: { $in: [rgx] }, batch ,semester}).sort({
                 percentage: -1,
             }).populate('studentId');
        } else {
            students = await Student.find({ rollno: { $in: [rgx] }, batch }).sort({
                percentage: -1,
            }).populate('studentId');
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


exports.universityRank = hoc(async (req, res, next) => {
    try {
        const { batch, semester } = req.query;
        let students = [];
        if (semester) {
            students = await Semester.find({ batch, semester })
                .sort({
                    percentage: -1,
                })
                .populate('studentId');
        } else {
            students = await Student.find({ batch })
                .sort({
                    percentage: -1,
                })
                .populate('studentId');
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