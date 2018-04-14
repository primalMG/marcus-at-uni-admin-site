var database = firebase.database();

//Login variables
var login = document.getElementById('login');
var email = document.getElementById('email');
var pass = document.getElementById('pass');


//somehow gotta figure out how to read the list and put it into a table?
var ref = database.ref('Recipe');
var ingredientsRef = database.ref().child('Recipe').child('Ingredients');

const recipeList = document.getElementById('recipeList');

ref.on('child_added', snap => {
    console.log(snap);
    let recipe = snap.val();
    let $li = document.createElement('li');
    $li.innerHTML = recipe.name;
    $li.setAttribute('childKey', snap.key);
    $li.addEventListener('click', recipeClicked)
    recipeList.appendChild($li);

});

function recipeClicked(e){
    var recipeID = e.target.getAttribute('childKey');
    const recipeRef = database.ref('Recipe/' + recipeID );

    const recipeDetail = document.getElementById('RecipeDetails');
    recipeDetail.innerHTML = ""

    recipeRef.on('child_added', snap => {
        var $p = document.createElement("p");
        $p.innerHTML = snap.key + " - " + snap.val()
        recipeDetail.append($p);
    });
}

// ref.on('child_added', function(data){
//     console.log(data.val().name, data.val().Ingredients);
//     let recipe = data.val();
//     let $li = document.createElement('li');
//     $li.innerHTML = recipe.name;
//     $li.setAttribute('childKey', data.key);
//     $li.addEventListener('click', recipeClicked)
//     recipeList.appendChild($li);
// });

// function recipeClicked(e){
//     var recipeID = e.target.getAttribute('childKey');
//     const recipeRef = database.ref('Recipe' + recipeID );

//     const recipeDetail = document.getElementById('RecipeDetails');
//     recipeDetail.innerHTML = ""

//     ref.on('child_added', snap => {
//         var $p = document.createElement("p");
//         $p.innerHTML = snap.val().Ingredients;
//         recipeDetail.append($p);
//     });
// }   

// ref.once('value', function(snapshot){
//     snapshot.forEach(function(childSnap){
//         console.log(childSnap.val());

//     let recipe = childSnap.val();
//     let $li = document.createElement('li');
//     $li.innerHTML = recipe;
//     $li.setAttribute('childKey', childSnap.key);
//    // $li.addEventListener('click', recipeClicked)
//     recipeList.appendChild($li);

//     });
// });
