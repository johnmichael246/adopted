
if (top.location.pathname === '/') {
    $(document).ready(function() {
            setTimeout(function(){
                $('#modalTrigger').trigger('click')
            }, 5000);
    });
};
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}
FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});
