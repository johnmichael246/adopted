var router = require('express').Router();
var passport = require('passport');
var petsCtrl = require('./../controllers/petsCtrl');
var apiCtrl = require('./../controllers/apiCtrl');

router.post('/', loggedIn, petsCtrl.search);

router.get('/results', loggedIn, function(req,res) {
  res.render('results')
});

router.get('/:id', loggedIn, petsCtrl.show);

router.get('/favorites/:id', loggedIn, petsCtrl.showFavPet);

router.get('/favorites/api/favorites/:id', loggedIn, apiCtrl.toggleFav);

router.get('/api/favorites/:id', loggedIn, apiCtrl.toggleFav);

router.post('/results', loggedIn, function(req,res) {
  res.render('results', {results})
}) 
router.post('/:petId/comments', loggedIn, petsCtrl.createComment)

router.delete('/:petId/comments/:commentId', loggedIn, petsCtrl.deleteComment)



function loggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}





module.exports = router;