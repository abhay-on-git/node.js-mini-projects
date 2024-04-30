const user = require('../models/user');
const {getUser} = require('../services/auth')

function checkForAuthentication(req,res,next){
    const token = req.cookies.token;
    req.user = null;
    if(!token) return next();
    // if(!token) return res.redirect('/login');
    const user = getUser(token);
    // if(!user) return res.redirect('/login');
    req.user = user;
    return next();
}

function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user) return res.redirect('/login');
        if(!roles.includes(req.user.role)) return res.send('unauthorized')
        return next();
    }
    
}

module.exports = {
    checkForAuthentication,
    restrictTo
}