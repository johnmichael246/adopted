var router = require('express').Router();
var passport = require('passport');

router.get('/', loggedIn, function(req, res) {
  res.render('users/home', {user:req.user, title:"Adopted"})
});

function loggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}
module.exports = router;
