var router = require('express').Router();
var passport = require('passport');
var petsCtrl = require('./../controllers/petsCtrl');

router.post('/', loggedIn, petsCtrl.search);

router.post('/', loggedIn, petsCtrl.search);

router.get('/pets', loggedIn, function(req,res) {
  res.render('pets')
})

router.post('/pets', loggedIn, function(req,res) {
  res.render('pets', {pet})
})

function loggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;