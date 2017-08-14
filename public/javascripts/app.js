const rootURL= "http://api.petfinder.com/";
const petRootURL = "https://api.rescuegroups.org";
let header = new Headers({
    "Access-Control-Allow-Origin":"*"
});

// $('#action').on('click',function() { 
//     fetch(`${rootURL}pet.get?format=json&key=596f1f7c6a7175711270ef8810f45fff&id=38860268`,
//     {
//         method:'GET',
//         headers: header,
//         mode: 'cors'
//     }
// ).then(function(pet) {
//         console.log(pet);
//         return pet.json();
//     });
// });
if (top.location.pathname === '/home') {
    $(document).ready(function() {
        setTimeout(function(){
            $('#modalTrigger').trigger('click'), 3000
        });
    });
};
