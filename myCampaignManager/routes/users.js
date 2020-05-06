var express = require("express");
var router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require('../../models/User');
const Campaign = require("../../models/Campaign");

/* GET users listing. */
router.get("/",  async function(req, res, next) {
    console.log(req.isAuthenticated());
     

    //res.render("myCampaigns/noLogin");
    if(req.isAuthenticated()){
        console.log(req.user.id);
       let myCampaigns = await Campaign.myCampaigns(req.user.id);
        
    console.log;
        loggedInUser = new User(req.user); //this is creating a User class with information passed via (req.user); 
        //loggedInUser = req.user;
       
  res.render("myCampaigns/profile", {
      loggedInUser: loggedInUser,
      myCampaigns: myCampaigns,
      

  });
    }
    else{
        res.render("myCampaigns/noLogin");
    }
});

// log in
router.get('/login', 
passport.authenticate('google', {scope: ['profile', 'email']})
);
//return after login 

router.get(
    "/return", 
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    async function(req, res){
        var userExists = await User.checkUserExists(req.user.id);
        if(userExists === false){
                   var newUser = await User.addUser(req.user); //the function trigger to add newUser to mongoDb, note this does not create a user, it adds it
                   //adding a user is online 16
        }
     
    console.log(req.user);
        console.log("Log in Successful");
    res.redirect("./");
    }
)

// log out

router.get('/logout', function(req, res, next) {
    
    req.logOut();
    res.redirect('./');
    console.log('logged out');
})




// passport helpers
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://8081-dot-10676888-dot-devshell.appspot.com/users/return'
},

function(accessToken, refreshToken, profile, callback){
    return callback(null, profile);
})
);

//serializing is like zipping
passport.serializeUser(function(user, callback) {
    callback(null, user);
});

//deserializing is like unzipping
passport.deserializeUser(function(obj, callback){
    callback(null, obj);
});
module.exports = router;