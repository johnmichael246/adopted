var router = require('express').Router();
var passport = require('passport');
var userCtrl = require('./../controllers/userCtrl');


router.post('/', loggedIn, userCtrl.search);

function loggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}
module.exports = router;