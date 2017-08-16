$(document).ready(function() {

var species;
var ages;

var currentSpecies = $('option#species').attr('value');
console.log('currentSpecies = ' + currentSpecies);

var currentAge = $('option#age').attr('value');
console.log('currentAge = ' + currentAge);

var currentSize = $('option#size').attr('value');
console.log('current size = ' + currentSize);



$('option#animal').val(species).html(species);
console.log('species is ' + species);

$('option.age').val(currentAge).attr('selected', true);
$('option.size').val(currentAge).attr('selected', true);


function addSpecies() {
  if(currentSpecies === "dog") {
    return species = "cat"
  } else {
    return species = "dog"
  }
}

function addAge() {
  if(currentAge === "baby") {
    ages = []
  } else if(currentAge === "young") {

  }
}


//if current age === "baby"
  // then ages = [young, adult, senior]
//else if current age === "young"
  //then ages = [baby, adult, senior]
//else if current age === "adult"
  //then ages = [baby, young, senior]
//else if current age === "senior"
  //then ages = [baby, young, adult]




})
