console.log('loaded results.js');

$(document).ready(function() {
  console.log('jQ ready now');

$('button.favorite').click(function(e) {
  var $this = $(this);
  $this.toggleClass('favorite');
  if($this.hasClass('favorite')){
    $this.text('Favorite');
    console.log('favorite');
  } else {
    $this.text('Unfavorite');
    console.log('unfavorite');
  }
  console.log(e.target.id);
})






})