var router = require('express').Router();
var passport = require('passport');
var userCtrl = require('./../controllers/userCtrl');

router.get('/', userCtrl.welcome);

router.get('/profile', userCtrl.profile);

router.get('/auth/google', passport.authenticate(
  'google',
  {scope:['profile','email']}
));
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));

router.get('/logout', function(req,res) {
  req.logout();
  res.redirect('/');
})

// routes for user control below


router.put('/', loggedIn, userCtrl.updatePrefs);

router.get('/', loggedIn, userCtrl.profile);



// routes for pet show below below
function loggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports=router;