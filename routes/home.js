var router = require('express').Router();
var passport = require('passport');
require('./../controllers/userCtrl');

router.get('/', loggedIn, function(req,res) {
  res.render('home', {user:req.user, title:"poop"})
})

router.get('/search', loggedIn, function(req,res) {
  res.render('search')
})

router.post('/search', loggedIn, function(req,res) {
  res.render('search', {pet})
})

router.get('/logout', function(req,res) {
  req.logout();
  res.redirect('/');
})

function loggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;