console.log('loaded results.js');

$(document).ready(function() {
  console.log('jQ ready now');


$('button.heart-button').click(function(evt) {
  var $this = $(this);
  if($this.hasClass('heart-button')){
    $(this).find('span.glyphicon-heart').css("color", "#FF0000");
    $this.toggleClass('heart-button');
    fetch (`api/favorites/${evt.target.id}`)
  } else {
    $(this).find('span.glyphicon-heart').css("color", "#000000");
    $this.toggleClass('heart-button');
  }
})












})