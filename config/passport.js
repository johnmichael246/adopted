var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('./../models/user');

passport.use(new GoogleStrategy(
    {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOne({'googleId':profile.id}, function(err, user) {
            if (err) return cb(err);
            if (user) {
                if(profile.photos[0].value) {
                    user.photo = profile.photos[0].value;
                }
                user.save( function(err) {
                    if(err) return cb(user);
                    return cb(null, user);
                 });
            } else {
                let newUser = new User({
                    first_name: profile.name.givenName,
                    last_name:profile.name.familyName,
                    email:profile.emails[0].value,
                    googleId:profile.id,
                    photo: profile.photos[0].value
                });
                newUser.save(function(err) { 
                    if(err) return cb(err);
                    return cb(null, newUser);
                });
            }
        });
    }
));

passport.serializeUser(function(user,done) {
    done(null, user.id)
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user) {
        done(err,user);
    });
});