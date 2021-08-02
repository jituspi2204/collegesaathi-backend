var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        default: 'address',
    },
    semester: {
        type: Number,
        default : 0
    }
});

const Subject = mongoose.model('subject', userSchema);
module.exports = Subject;
