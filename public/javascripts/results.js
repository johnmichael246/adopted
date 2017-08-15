console.log('loaded results.js');

$(document).ready(function() {
  console.log('jQ ready now');


//toggle heart between red and black, adds pet id to array
  var favPets = [];
$('button.heart-button').click(function(evt) {
  var $this = $(this);
  if($this.hasClass('heart-button')){
    $(this).find('span.glyphicon-heart').css("color", "#FF0000");
    $this.toggleClass('heart-button');
    favPets.push(evt.target.id)
    console.log('favorite');
    console.log(evt.target.id);
    console.log(favPets);
  } else {
    $(this).find('span.glyphicon-heart').css("color", "#000000");
    $this.toggleClass('heart-button');
    favPets.pop();
    console.log('unfavorite');
    console.log(evt.target.id);
    console.log(favPets);
  }
})












})