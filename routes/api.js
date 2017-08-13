var express = require('express');
var router = express.Router();
var apiCtrl = require('./../controllers/apiCtrl');

router.get('/',apiCtrl.getAllPets);
router.get('/:id', apiCtrl.getOnePet);
router.put('/:id', apiCtrl.updatePet);
router.post('/', apiCtrl.createPet);
router.delete('/:id', apiCtrl.deletePet);

router.get('/search', petFinderCtrl.search);


module.exports= router;