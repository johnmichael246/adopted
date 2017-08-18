$(document).ready(function() {

  $('span.boob').click(function(evt) {
    var $this = $(this);
    var id = $this.attr('id')
    var userId = $this.data().userid;
    if ($this.hasClass('red')) {
      console.log('hes red')
      $this.removeClass('red').addClass('black')
      console.log('switched back to black')
          fetch (`api/favorites/${id}`,
      {
        method:'GET',
        credentials: 'include',
        body: {
          userId: userId,
          petId: id
        },
        headers: {
          content:'application/json'
        }
      });
    } else if ($this.hasClass('black')) {
      console.log('hes black')
      $this.removeClass('black').addClass('red')
      console.log('switched back to red')
          fetch (`api/favorites/${id}`,
      {
        method:'GET',
        credentials: 'include',
        body: {
          userId: userId,
          petId: id
        },
        headers: {
          content:'application/json'
        }
      });   
    } else if($this.hasClass('boob')){
      console.log('this pet has not been favorited yet')
      $(this).css("color", "#FF0000");
      $this.toggleClass('boob'); 
      fetch (`api/favorites/${id}`,
      {
        method:'GET',
        credentials: 'include',
        body: {
          userId: userId,
          petId: id
        },
        headers: {
          content:'application/json'
        }
      });
    } else {
      console.log('this pet has already been favorited')
      $(this).css("color", "#000000");
      
      $this.toggleClass('boob');
      fetch(`api/favorites/${id}`, {
        body: {
          userId: userId
        },
        headers: {
          content: 'application/json'
        }
      });
    }
    fetch(`api/favorites/${id}`, {
      body: {
        userId: userId
      },
      headers: {
        content: 'application/json'
      }
    });
  })

  function formatPhoneNumber(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  };
})

