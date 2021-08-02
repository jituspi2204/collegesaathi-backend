var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'student',
    },
    rollno: {
        type: String,
        default: '00000000000',
    },
    name: {
        type: String,
        default : ''
    },
    batch: {
        type: Number,
        default : 0
    },
    semester: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        default: 0,
    },
    total: {
        type: Number,
        default: 0,
    },
    obtained: {
        type: Number,
        default: 0,
    },
    sgpa: {
        type: Number,
        default: 0,
    },
    credit: {
        type: Number,
        default: 0,
    },
    percentage: {
        type: Number,
        default: 0,
    },
},{strict : false});


const Semester = mongoose.model('semester', userSchema);
module.exports = Semester;
