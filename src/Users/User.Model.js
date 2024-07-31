const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    language: {type: String, required: true},
    residence: {type: String, required: true},
    userID: { type: Number, required: true, unique: true },
    userTypeID: { type: Number, required: true },
    userType: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('User', UserSchema);
