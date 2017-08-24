var router = require('express').Router();
var passport = require('passport');
var userCtrl = require('./../controllers/userCtrl');

router.get('/', userCtrl.welcome);

router.get('/profile', loggedIn, userCtrl.profile);

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
router.post('/profile', loggedIn, userCtrl.updatePrefs2);

router.get('/', loggedIn, userCtrl.profile);

function loggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports=router;