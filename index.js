var database = firebase.database();

//Login variables
var login = document.getElementById('login');
var email = document.getElementById('email');
var pass = document.getElementById('pass');


//somehow gotta figure out how to read the list and put it into a table?
var ref = database.ref('Recipe');
ref.on('child_added', function(data){
    console.log(data.val().name, data.val().recipeID);

    var recipeName = (data.val().name, data.val().recipeID);
});