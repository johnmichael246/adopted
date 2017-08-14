var router = require('express').Router();
var passport = require('passport');
require('./../controllers/userCtrl');

router.get('/', loggedIn, function(req,res) {
  res.render('home', {user:req.user, title:"poop"})
})

router.get('/pets', loggedIn, function(req,res) {
  res.render('pets')
})

router.post('/pets', loggedIn, function(req,res) {
  res.render('pets', {pet})
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