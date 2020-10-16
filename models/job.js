const mongoose = require('mongoose');

// This is the User Schema
const userSchema = new mongoose.Schema({
    job_role: {
        type: String,
        unique: true
    },
    function: {
        type: String,
    },
    company: {
        type: String,
    },

    location: {
        type: String,
    },

    pin: {
        type: Number,
    },
}, {
    timestamps: true
});


const Job = mongoose.model('Job', userSchema);

module.exports = Job;