const rootURL= "http://api.petfinder.com/";
const petRootURL = "https://api.rescuegroups.org";
let header = new Headers({
    "Access-Control-Allow-Origin":"*"
});

if (top.location.pathname === '/home') {
    if(user) {
        $(document).ready(function() {
            setTimeout(function(){
                $('#modalTrigger').trigger('click'), 3000
            });
        });
    }
};
