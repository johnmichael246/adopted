var router = require('express').Router();
var petFinderCtrl = require('../controllers/petFinderCtrl');


router.get('/search', petFinderCtrl.search);


module.exports= router;