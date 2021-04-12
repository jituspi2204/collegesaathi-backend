const { route } = require('../..');
var express = require('express');
const student = require('../../../controllers/studentController');
const router = express.Router();


router.get('/', student.details);
router.post('/verify', student.getUser);
router.post('/login', student.login);
router.post('/register', student.register);
router.get('/semester', student.getMarksBySemester);
router.get('/semesters', student.getMarks);
router.get('/college-rank', student.collegeRank);
router.get('/university-rank', student.universityRank);


module.exports = router;



