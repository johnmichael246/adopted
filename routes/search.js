var router = require('express').Router();
var passport = require('passport');
var searchCtrl = require('./../controllers/searchCtrl');
require('./../public/utility/utilities');

router.post('/', loggedIn, searchCtrl.search);

router.get('/:id', loggedIn, searchCtrl.show);

router.get('/favorites/:id', loggedIn, searchCtrl.toggleFav);

router.get('/search/favorites/:id', loggedIn, searchCtrl.toggleFav);

router.get('/favorited/:id', loggedIn, searchCtrl.showFavPet);

router.post('/shelters', loggedIn, searchCtrl.searchShelters);

router.get('/favorited/search/favorites/:id', loggedIn, searchCtrl.toggleFav);

router.post('/:petId/comments', loggedIn, searchCtrl.createComment)

router.delete('/:petId/comments/:commentId', loggedIn, searchCtrl.deleteComment)


function loggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}
module.exports = router;