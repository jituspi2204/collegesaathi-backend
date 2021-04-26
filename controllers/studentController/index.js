const hoc = require('../utils/hoc');

const Student = require('../../models/studentModel');
const Semester = require('../../models/semesterModel');
const College = require('../../models/collegeModel');
const Subject = require('../../models/subjectsModel');
const firebaseAdmin = require('../utils/admin');
const jwtUtils = require('../utils/jwtUtils');
const File = require('../../models/fileModel');
const Notification = require('../../models/notificationsModel');

const programCode = {
    '027': 'BTech - Computer Science and Engineering',
};

exports.utils = hoc(async (req, res, next) => {
    try {
        let colleges = await College.find().sort({ name: 1 });
        let subjects = await Subject.find().sort({ id: 1 });
        res.status(200).json({
            message: 'SUCCESS',
            colleges,
            subjects,
        });
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.getUser = hoc(async (req, res, next) => {
    try {
        const { email } = req.body;
        let user = await Student.findOne({ email });
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
        const { email, uid } = req.body;
        let user = await Student.findOne({ email }).populate('notifications');
        let isVerified = await firebaseAdmin.checkUser(email, uid);
        if (email === user.email && isVerified) {
            let token = await jwtUtils.createToken({ email, _id: user._id });
            res.status(200).json({
                message: 'SUCCESS',
                id: user._id,
                email: user.email,
                rollno: user.rollno,
                user,
                token,
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
        const { email, uid, rollno } = req.body;
        let user = await Student.findOne({ rollno });
        let isVerified = await firebaseAdmin.checkUser(email, uid);
        if (user.email === 'admin@collegesaathi.com' && isVerified) {
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
            let nt = await Notification.create({
                title: 'ADMIN',
                message:
                    'Thanks for connecting with us , we are happy to see you here ' + user.name,
                by: '@collegeSAATHI',
                time: new Date(Date.now()),
            });
            // console.log(userCollege);
            await Student.findByIdAndUpdate(user._id, {
                course: pc,
                college: userCollege.name,
                email,
                $addToSet: { notifications: nt._id },
            });
            let token = await jwtUtils.createToken({ email, _id: user._id });
            res.status(200).json({
                message: 'SUCCESS',
                id: user._id,
                email,
                rollno: user.rollno,
                user: {
                    ...user,
                    course: pc,
                    college: userCollege.name,
                    email,
                },
                token,
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
        res.status(200).json({
            message: 'SUCCESS',
            user: req.user,
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
                    percentage: -1,
                    sgpa: -1,
                });
        } else {
            students = await Student.find({ rollno: { $in: [rgx] }, batch })
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

exports.uploadFile = hoc(async (req, res, next) => {
    try {
        const { name, semester, subject, type, description, url, unit } = req.body;
        let file = await File.create({
            name,
            semester,
            subject,
            type,
            description,
            userId: req.user._id,
            url,
            unit,
        });
        let nt = await Notification.create({
            title: description,
            message: `New ${type} of semester ${semester}, subject code ${subject}, unit ${unit} has been uploaded, check it now`,
            by: req.user.name,
        });
        await Student.updateMany(
            { currentSemester: semester },
            {
                $addToSet: {
                    notifications: nt._id,
                },
            }
        );
        res.status(200).json({
            message: 'SUCCESS',
            file,
        });
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.getFiles = hoc(async (req, res, next) => {
    try {
        const { semester, subject, type, unit } = req.query;
        console.log(req.user);
        let files = await File.find({ semester, subject, type, unit });
        res.status(200).json({
            message: 'SUCCESS',
            files,
        });
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.downloadFile = hoc(async (req, res, next) => {
    try {
        const { id, details, filename } = req.body;
        let reads = {
            ...details,
            filename,
        };
        await Student.findByIdAndUpdate(req.user._id, {
            $addToSet: {
                reads: reads,
            },
        });
        await File.findByIdAndUpdate(id, {
            $inc: { views: 1 },
        });
        res.status(200).json({
            message: 'SUCCESS',
        });
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.likeFile = hoc(async (req, res, next) => {
    try {
        const { id } = req.query;
        await File.findByIdAndUpdate(id, {
            $addToSet: { like: req.user._id },
            $pull: { dislike: req.user._id },
        });
        res.status(200).json({
            message: 'SUCCESS',
        });
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.dislikeFile = hoc(async (req, res, next) => {
    try {
        const { id } = req.query;
        await File.findByIdAndUpdate(id, {
            $addToSet: { dislike: req.user._id },
            $pull: { like: req.user._id },
        });
        res.status(200).json({
            message: 'SUCCESS',
        });
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.updateCurSem = hoc(async (req, res, next) => {
    try {
        const { semester } = req.query;
        await Student.findByIdAndUpdate(req.user._id, {
            $set: {
                currentSemester: semester,
            },
        });
        let user = await Student.findById(req.user._id).populate('notifications');
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

exports.reqForUpload = hoc(async (req, res, next) => {
    try {
        let nt = await Notification.create({
            title: 'ADMIN',
            message:
                'You have requested for the permission to upload file, we will notify you soon.',
            by: req.user.rollno,
        });
        await Student.findByIdAndUpdate(req.user._id, {
            $addToSet: {
                notifications: nt._id,
            },
        });
        res.status(200).json({
            message: 'SUCCESS',
        });
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.createNotification = hoc(async (req, res, next) => {
    try {
        let { title, message, by, url, college } = req.body;
        let nt = await Notification.create({
            title,
            message,
            by,
            url,
        });
        if (college) {
            let rgx = new RegExp(`[0-9]{3}${college}[0-9]{5}$`, 'ig');
            await Student.updateMany(
                {rollno: { $in: [rgx]},
                {
                    $addToSet: {
                        notifications: nt._id,
                    },
                }
            );
        } else {
            await Student.updateMany(
                {},
                {
                    $addToSet: {
                        notifications: nt._id,
                    },
                }
            );
        }
        res.status(200).json({
            message: 'SUCCESS',
            nt,
        });
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});
