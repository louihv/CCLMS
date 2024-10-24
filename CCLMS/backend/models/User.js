const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    password: { type: String, required: true },
    house: {type: String},
    enrolledSubjects: [String],
});

module.exports = mongoose.model('User', UserSchema);
