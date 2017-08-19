$(document).ready(function() {

  $('span.b').click(function(evt) {
    var $this = $(this);
    var id = $this.attr('id')
    var userId = $this.data().userid;
    if ($this.hasClass('red')) {
      console.log('hes very red')
      $this.removeClass('red').addClass('black')
      console.log('switched back to very black')
          fetch (`search/favorites/${id}`,
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
      console.log('hes extremely black')
      $this.removeClass('black').addClass('red')
      console.log('switched back to  extremely red')
          fetch (`search/favorites/${id}`,
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
    } else if($this.hasClass('b')&& window.location.href ===`http://localhost:3000/search/${id}`){
      console.log('this pet has not been favorited yet on the favorites page')
      $(this).css("color", "#FF0000");
      $this.toggleClass('b'); 
      fetch (`search/favorites/${id}`,
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
    } else if (window.location.href ===`http://localhost:3000/search/${id}`){
      console.log('this pet has already been favorited on the favorites page')
      $(this).css("color", "#000000");
      
      $this.toggleClass('b');
      fetch(`search/favorites/${id}`, {
        body: {
          userId: userId
        },
        headers: {
          content: 'application/json'
        }
      });
    } else if($this.hasClass('b')){
      console.log('this pet has not been favorited yet')
      $(this).css("color", "#FF0000");
      $this.toggleClass('b'); 
      fetch (`search/favorites/${id}`,
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
      
      $this.toggleClass('b');
      fetch(`search/favorites/${id}`, {
        body: {
          userId: userId
        },
        headers: {
          content: 'application/json'
        }
      });
    }
  })
  $('button.shelter').on('click', function(etv) {

  })

  function formatPhoneNumber(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  };
})

