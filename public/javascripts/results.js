console.log('loaded results.js');

$(document).ready(function() {
  console.log('jQ ready now');


$('button.heart-button').click(function(evt) {
  var a = 'apple'
  console.log('you clicked me')
  var $this = $(this);
  var id = $this.attr('id')
  var userId = $this.data().userid

  if ($this.hasClass('heart-button')){
    $(this).find('span.glyphicon-heart').css("color", "#FF0000");
    $this.toggleClass('heart-button');
    console.log(typeof(id));
  } else {
    $(this).find('span.glyphicon-heart').css("color", "#000000");
    $this.toggleClass('heart-button');
    console.log(typeof(id));
  }
  console.log("+++++++++++++++++++++++")
  fetch(`api/favorites/${id}`, {
    body: {
      userId: userId
    },
    headers: {
      content: 'application/json'
    }
  });


})












})