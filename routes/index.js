var router = require('express').Router();
var passport = require('passport');

router.get('/', loggedIn, function(req,res) {
  res.render('index', {user:req.user, title:'Adopted'})
})

router.get('/logout', function(req,res) {
  req.logout();
  res.redirect('/');
})

function loggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  console.log('i hit this path')
  res.redirect('/auth/google');
}

module.exports = router;
