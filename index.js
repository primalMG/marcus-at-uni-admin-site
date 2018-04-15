var database = firebase.database().ref();

//Login variables
var login = document.getElementById('login');
var email = document.getElementById('email');
var pass = document.getElementById('pass');


//somehow gotta figure out how to read the list and put it into a table?
var recipeRef = database.child('Recipe');

const recipeList = document.getElementById('recipeList');

recipeRef.on('value', snap => {

    recipeList.innerHTML = ""

    snap.forEach(childSnap => {
        let key = childSnap.key,
            value = childSnap.val();
        let $li = document.createElement('li');

        $li.innerHTML = value.name;
       


        //Edit a recipe
        let btnEdit = document.createElement('span');
        btnEdit.class = 'editRecipe';
        btnEdit.innerHTML = ' Edit';
        btnEdit.setAttribute('childKey', key);
        //btnEdit.addEventListener('click', btnEditRecipe);
        $li.append(btnEdit)
    
        //Deleting a recipe
        let btnDelete = document.createElement("span");
        btnDelete.class = 'deleteRecipe';
        btnDelete.innerHTML = ' Delete';
        btnDelete.setAttribute('childKey', key);
        btnDelete.addEventListener('click', btnDeleteClicked);

        $li.append(btnDelete)
        $li.setAttribute('keyy', key);
        $li.addEventListener('click', recipeClicked)
        recipeList.append($li);
    });
    //console.log(snap);

    

});

function recipeClicked(e){
    var recipeID = e.target.getAttribute('keyy');
    
    const selectedRecipe = database.child('Recipe/' + recipeID );


    const recipeDetail = document.getElementById('RecipeDetails');
   


    selectedRecipe.on('value', snap => {
        recipeDetail.innerHTML = ""
        snap.forEach(childSnap => {
            console.log(childSnap)
            var $p = document.createElement("p");
            $p.innerHTML = childSnap.key + " - " + childSnap.val();
            recipeDetail.append($p)
        });
    });
}



//update a recipe -- gonna be a challenge


//Delete
function btnDeleteClicked(event){

    event.stopPropagation();

    var recipeID = event.target.getAttribute('childKey');

    const recipeRef = database.child('Recipe/' + recipeID);

    recipeRef.remove();
}

