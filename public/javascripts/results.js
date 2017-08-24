$(document).ready(function() {

  $('span.b').click(function(evt) {
    var $this = $(this);
    var id = $this.attr('id')
    var userId = $this.data().userid;
    if ($this.hasClass('red')) {
      $this.removeClass('red').addClass('black')
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
      $this.removeClass('black').addClass('red')
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

