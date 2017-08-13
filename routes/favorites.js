var express = require('express');
var router = express.Router();
var favoritesCtrl = require('../controllers/favorites');

router.get('/', favoritesCtrl.getAllFavorites);
router.get('/:id', favoritesCtrl.getOneFavorite);
router.delete('/:id', favoritesCtrl.deleteFavorite);


module.exports = router;