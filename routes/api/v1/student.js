const { route } = require('../..');
var express = require('express');
const student = require('../../../controllers/studentController');
const router = express.Router();
const studentAuth = require('../../../controllers/authController');

router.get('/', studentAuth.verifyStudentMiddleware, student.details);

router.post('/verify', student.getUser);
router.post('/login', student.login);
router.post('/register', student.register);
router.get('/semester', student.getMarksBySemester);
router.get('/semesters', student.getMarks);
router.get('/college-rank', student.collegeRank);
router.get('/university-rank', student.universityRank);
router.get('/utils', student.utils)
router.get('/files', studentAuth.verifyStudentMiddleware, student.getFiles);
router.post('/files/download', studentAuth.verifyStudentMiddleware, student.downloadFile);
router.get('/files/like', studentAuth.verifyStudentMiddleware, student.likeFile);
router.get('/files/dislike', studentAuth.verifyStudentMiddleware, student.dislikeFile);
router.post('/files', studentAuth.verifyStudentMiddleware, student.uploadFile);
router.get('/update/current-semester', studentAuth.verifyStudentMiddleware, student.updateCurSem);
router.get('/request/upload', studentAuth.verifyStudentMiddleware, student.reqForUpload);
router.post('/notification/add', studentAuth.verifyStudentMiddleware, student.createNotification);




module.exports = router;



