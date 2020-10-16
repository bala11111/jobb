const mongoose = require('mongoose');

// creating and establishing connection to database
const url = process.env.MONGO_URL || 'mongodb://localhost/job_development';
mongoose.connect(url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;