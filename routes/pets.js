var router = require('express').Router();
var passport = require('passport');
var petsCtrl = require('./../controllers/petsCtrl');

router.post('/', loggedIn, petsCtrl.search);

router.get('/results', loggedIn, function(req,res) {
  res.render('results')
})

router.get('/:id', loggedIn, petsCtrl.show)

router.get('/favorites/:id', loggedIn, petsCtrl.showFavPet)


router.post('/results', loggedIn, function(req,res) {
  res.render('results', {results})
}) 

router.post('/:petId/comments', loggedIn, petsCtrl.createComment)

function loggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}





module.exports = router;