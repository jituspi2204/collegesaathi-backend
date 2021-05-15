const hoc = require('../utils/hoc');

const Student = require('../../models/studentModel');
const Semester = require('../../models/semesterModel');
const College = require('../../models/collegeModel');
const Subject = require('../../models/subjectsModel');
const firebaseAdmin = require('../utils/admin');
const jwtUtils = require('../utils/jwtUtils');
const File = require('../../models/fileModel');
const Notification = require('../../models/notificationsModel');
const PDFMerger = require('easy-pdf-merge');
const cover = require('../../utils/createFront');
const User = require('../../models/userModel');
// var merger = new PDFMerger();
const programCode = {
    '027': 'BTech - Computer Science and Engineering',
    '031': 'BTech - Information Technology',
};

const updateMarks = async (rollno) => {
    let tempSet = new Set();
    let semesters = await Semester.find({ rollno });
    let students = {};
    for (let i = 0; i < semesters.length; i++) {
        let cs = semesters[i]['_doc'];
        let total = 0;
        let obtained = 0;
        let key = Object.keys(cs);
        let value = Object.values(cs);
        let pcd = /^\d{6}$/;
        let pcd2 = /^\d{5}$/;
        let td = 0;
        let tn = 0;
        if (!tempSet.has(cs.rollno)) {
            students[cs.rollno] = {
                total: 0,
                obtained: 0,
                tn: 0,
                td: 0,
                rollno: cs.rollno,
            };
            tempSet.add(cs.rollno);
        }
        for (let j = 0; j < key.length; j++) {
            if (pcd.test(key[j]) || pcd2.test(key[j])) {
                let inn = value[j].internal ? value[j].internal : 0;
                let exx = value[j].external ? value[j].external : 0;
                let tt = parseFloat(value[j].total.split('(')[0]);
                tt = tt ? tt : 0;
                obtained += tt >= inn + exx ? tt : inn + exx;
                total += 100;
                td += value[j].credit;
                tn += value[j].credit * value[j].point;
            }
        }
        students[cs.rollno].total += total;
        students[cs.rollno].obtained += obtained;
        students[cs.rollno].tn += tn;
        students[cs.rollno].td += td;
    }

    let temp = Object.values(students);
    for (let i = 0; i < temp.length; i++) {
        await Student.findOneAndUpdate(
            { rollno: temp[i].rollno },
            {
                $set: {
                    total: temp[i].total,
                    obtained: temp[i].obtained,
                    cgpa: (temp[i].tn / temp[i].td).toFixed(3),
                    percentage: ((temp[i].obtained / temp[i].total) * 100).toFixed(6),
                },
            }
        );
        // console.log(i, temp[i].total, temp[i].obtained, 'Updated');
    }
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
        const { email, uid, rollno, oldRollno } = req.body;
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
            if (oldRollno) {
                // await Student.deleteOne({ rollno: oldRollno });
                await Semester.updateMany(
                    { rollno: oldRollno },
                    {
                        $set: { rollno, studentId: user._id },
                    }
                );
                await updateMarks(rollno);
            }
            let token = await jwtUtils.createToken({ email, _id: user._id });
            let userDetails = {
                ...user,
            };
            userDetails.course = pc;
            userDetails.email = email;
            userDetails.college = userCollege.name;
            res.status(200).json({
                message: 'SUCCESS',
                id: user._id,
                email,
                rollno: user.rollno,
                token,
                user : userDetails
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
        const { collegeId, batch, semester, course } = req.query;
        let rgx = new RegExp(`[0-9]{3}${collegeId}${course}[0-9]{2}$`, 'ig');
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
        const { batch, semester, course } = req.query;
        let rgx = new RegExp(`[0-9]{6}${course}[0-9]{2}$`, 'ig');
        let students = [];
        if (semester > 0) {
            students = await Semester.find({ batch, semester, rollno: { $in: [rgx] } })
                .select(['name', 'percentage', 'sgpa', 'rollno'])
                .sort({
                    percentage: -1,
                    sgpa: -1,
                });
        } else {
            students = await Student.find({ batch, rollno: { $in: [rgx] } })
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
        const { semester, subject,} = req.query;
        let files = await File.find({ semester, subject});
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

exports.deleteMyFile = hoc(async (req, res, next) => {
    try {
        const { filename } = req.body;
        await Student.findByIdAndUpdate(req.user._id, {
            $pull: { reads: { filename } },
        });
        let user = await Student.findById(req.user._id).populate('notifications');
        res.status(200).json({
            message: 'SUCCESS',
            user,
        });
    } catch (error) {
        console.log(error);
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
        let subjects = await Subject.find({ semester });
        let list = subjects.map((value) => value.key);
        await Student.findByIdAndUpdate(req.user._id, {
            $set: {
                currentSemester: semester,
                mySubjects: list,
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

exports.updateCurSubjects = hoc(async (req, res, next) => {
    try {
        const { subjects } = req.body;
        await Student.findByIdAndUpdate(req.user._id, {
            $set: {
                mySubjects: subjects,
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
                { rollno: { $in: [rgx] } },
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

exports.deleteNotification = hoc(async (req, res, next) => {
    try {
        await Student.findByIdAndUpdate(req.user._id, {
            $set: {
                notifications : []
            }
        })
        let user = await Student.findById(req.user._id);
        res.status(200).json({
            message: 'SUCCESS',
            user
        });
    } catch (error) {
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});

exports.createCover = hoc(async (req, res, next) => {
    try {
        const {
            type,
            semester,
            subject,
            subjectName,
            syllabus1,
            syllabus2,
            syllabus3,
            syllabus4,
            syllabus,
            unit,
            cat,
            year,
            filename,
            description,
        } = req.body;
        let pdf = new cover({
            type,
            semester,
            subject,
            subjectName,
            unit,
            description,
            year,
            cat,
            syllabus1,
            syllabus2,
            syllabus3,
            syllabus4,
            syllabus,
        });

        let url = 'https://quiet-scrubland-22380.herokuapp.com/';
        if (type == 'notes') {
            url += pdf.generateNotes();
        } else if (type == 'papers') {
            url += pdf.generatePaper();
        } else if (type === 'labfiles') {
            url += pdf.generateFile();
        }

        // merger.add('public/bills/' + semester + "/" + filename);
        // merger.add('public/bills/' + req.file.filename);
        // merger.save(req.file.path)
        // PDFMerger(
        //     ['public/bills/' + semester + '/' + filename, req.file.path],
        //     'public/bills/' + filename,
        //     function (err) {
        //         if (err) {
        //             console.log(err);
        //             res.status(500).json({
        //                 message: 'SERVER_ERROR',
        //             });
        //         }
        //         res.status(200).json({
        //             message: 'SUCCESS',
        //         });
        //     }
        // );

        res.status(200).json({
            message: 'SUCCESS',
            url,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'SERVER_ERROR',
        });
    }
});
