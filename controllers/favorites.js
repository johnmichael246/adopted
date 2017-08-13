var Favorites = require('../models/favpet');

function getAllFavorites(req, res) {
  Favorites.find({}, (err, favorites) => {
    res.status(200).json(favorites);
  });
}

function getOneFavorite(req, res) {
  Favorites.findById(req.params.id, (err, favorite) => {
    res.status(200).json(favorite);
  });
}

function deleteFavorite (req, res) {
  Favorites.findByIdAndRemove(req.params.id, (err, favorite) => {
    res.status(200).json(favorite);
  });
}

module.exports = {
  getAllFavorites,
  getOneFavorite,
  deleteFavorite
};

//create and update will come from changing the users preferences
