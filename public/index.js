// Initialize Firebase
var config = {
  apiKey: "AIzaSyBX9d_NmxSAUMwSt4w7dDkel1hk_3eTiRw",
  authDomain: "marcus-at-uni.firebaseapp.com",
  databaseURL: "https://marcus-at-uni.firebaseio.com",
  projectId: "marcus-at-uni",
  storageBucket: "marcus-at-uni.appspot.com",
  messagingSenderId: "47512234516"
};
firebase.initializeApp(config);
  

var database = firebase.database().ref();

//Login variables


function login(){
var email = document.getElementById('email').value;
var password = document.getElementById('pass').value;
var adminLogin = document.getElementById('loginPage');
var home = document.getElementById('adminHome');

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
        adminLogin.style.display = 'none';
        home.style.display = 'inline';
    }).catch(function(error){
        var errorCode = error.code;
            console.log(errorCode.Message);
    });

}



var recipeRef = database.child('Recipe');
var tipsRef = database.child('Tips');

const recipeList = document.getElementById('recipeList');
const tipList = document.getElementById('tipsList');

recipeRef.on('value', snap => {

    recipeList.innerHTML = ""

    snap.forEach(childSnap => {
        let key = childSnap.key,
            value = childSnap.val();
        let $li = document.createElement('li');

        $li.innerHTML = value.name;
       


        //Edit a recipe
        let btnEdit = document.createElement("span");
        btnEdit.class = 'editRecipe';
        btnEdit.innerHTML = ' Edit';
        btnEdit.setAttribute('childKey', key);
        btnEdit.style.color = "#6a3cc4";
        btnEdit.addEventListener('click', btnEditRecipe);
        $li.append(btnEdit)
    
        //Deleting a recipe
        let btnDelete = document.createElement("span");
        btnDelete.class = 'deleteRecipe';
        btnDelete.innerHTML = ' Delete';
        btnDelete.setAttribute('childKey', key);
        btnDelete.style.color = "#e20f24";
        btnDelete.addEventListener('click', btnDeleteClicked);

        $li.append(btnDelete)
        $li.setAttribute('keyy', key);
        $li.addEventListener('click', recipeClicked)
        recipeList.append($li);
    });
});

tipsRef.on('value', snap => {
    
    tipList.innerHTML = ""

        snap.forEach(childSnap => {
            let key = childSnap.key,
                value = childSnap.val();
            let $li = document.createElement('li');

            $li.innerHTML = value.name;

            let btnDelete = document.createElement("span");
            btnDelete.class = "deleteTip";
            btnDelete.innerHTML = ' Delete';
            btnDelete.setAttribute('TipchildKey', key);
            btnDelete.style.color = "#e20f24";
            btnDelete.addEventListener('click', DeleteTip)

            $li.append(btnDelete);
            $li.setAttribute('keyyy', key);
            $li.addEventListener('click', tipClicked)
            tipList.append($li);
        });
});


function btnEditRecipe(e){
    //displays the edit recipe section
    document.getElementById('edit-recipe-module').style.display = "block";

    //puts the recipe ID within a hidden text field
    document.querySelector('.edit-recipeID').value = e.target.getAttribute('childKey');

    //database reference.
    const dbRef = database.child('Recipe/' + e.target.getAttribute('childKey'));
    
    const editRecipeUI = document.querySelectorAll('.recipeDetails');

    dbRef.on('value', snap => {
        for(var i = 0, len = editRecipeUI.length; i < len; i++){
            var key = editRecipeUI[i].getAttribute('data-key');
                editRecipeUI[i].value = snap.val()[key];
            
        }
    });
}

function EditRecipe(e){
    const recipeID = document.querySelector('.edit-recipeID').value;
    const dbRef = database.child('Recipe/' + recipeID);

    var editRecipe = {}

    const editRecipeUI = document.querySelectorAll('.recipeDetails');

    editRecipeUI.forEach(function(textField) {
        let key = textField.getAttribute('data-key');
        let value = textField.value;
        editRecipe[textField.getAttribute('data-key')] = textField.value
    });

    dbRef.update(editRecipe);

    document.getElementById('edit-recipe-module').style.display = "none";

}

function recipeClicked(e){
    var recipeID = e.target.getAttribute('keyy');
    
    const selectedRecipe = database.child('Recipe/' + recipeID );


    const recipeDetail = document.getElementById('RecipeDetails');
   


    selectedRecipe.on('value', snap => {
        recipeDetail.innerHTML = ""
        snap.forEach(childSnap => {
            var $p = document.createElement("p");
            $p.innerHTML = childSnap.key + " - " + childSnap.val();
            recipeDetail.append($p)
                childSnap.forEach(childSnap2 => {
                    var $p = document.createElement("p");
                    $p.innerHTML = childSnap2.key + " - " + childSnap2.val();
                    recipeDetail.append($p)
                });
        });
    });
}

function tipClicked(e){
    var tipID = e.target.getAttribute('keyyy');

    //creates a database reference
    const selectedTip = database.child('Tips/' + tipID);
    //gets an element by its ID
    const tipDetail = document.getElementById('tipDetails');

    //listens for the values within the snapshot.
    selectedTip.on('value', snap => {
        tipDetail.innerHTML = ""
        //take the values within the snapshot
        snap.forEach(childSnap => {
            var $p = document.createElement("p");
            //appends those values and their keys to the element p
            $p.innerHTML = childSnap.key + " - " + childSnap.val();
            tipDetail.append($p)
            //takes the values within the nested object and appends them as well.
            childSnap.forEach(childSnap2 => {
                var $p = document.createElement("p");
                $p.innerHTML = childSnap2.key + " - " + childSnap2.val();
                tipDetail.append($p)
            });
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

function DeleteTip(event){

    //Prevents further propagation of the current event in the capturing and bubbling phases.
    event.stopPropagation();

    //gets the selected recipe ID by the attribute.
    var tipID = event.target.getAttribute('TipchildKey');

     //creates a reference to that child key within the database. 
    const recipeRef = database.child('Tips/' + tipID);

    //removes the key and all values belonging to it from the database.
    recipeRef.remove();
}
