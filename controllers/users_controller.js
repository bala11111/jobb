const User = require('../models/user');
const Job = require('../models/job');
const bcript = require('bcrypt');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// the profile page
module.exports.profile = function(req, res){
    Job.find({},function(err,jobs){
        if(err)
        {
            req.flash('error', 'error');
        }
         console.log(jobs);
        return res.render('user_profile',{
            title : 'profile',
            jobs : jobs
        });
     }
    ) 
}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('sign_up', {
        title: "Job Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    console.log(req.body);
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_in', {
        title: "Job sign in"
    });
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            let sr = 10;
            let myString = req.body.password; 
            bcript.hash(myString,sr,function(err,hash){
                if(err)
                {
                    console.log('error',err);
                }
                else{
                    req.body.password = hash;
                    console.log(hash);
                }
            });
            console.log(req.body);
            req.flash('success', 'You have signed up, login to continue!');
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');
            });
        }else{
            req.flash('error', 'Cant Sign up!');
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/users/profile');
}

//  to logout
module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');


    return res.redirect('/');
}

//to go to create job
module.exports.goJob = function(req,res){
    return res.render('job_create',{
          title: "create job"
    })
}

//to create job
module.exports.create_job = function(req,res){
    Job.create(req.body, function(err, user){
        if(err){req.flash('error', err); return}

        return res.redirect('/users/profile');
    });
}
