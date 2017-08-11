var router = require('express').Router();
var passport = require('passport');

router.get('/', function(req,res) {
  res.render('index', {user:req.user, title:"Adopted"})
})

router.get('/logout', function(req,res) {
  req.logout();
  res.redirect('/');
})

module.exports = router;
