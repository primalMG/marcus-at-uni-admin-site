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
        //btnEdit.addEventListener('click', btnEditRecipe);
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
            $li.setAttribute('keyY', key);
            tipList.append($li);
        });
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

function DeleteTip(event){
    
    event.stopPropagation();

    var tipID = event.target.getAttribute('TipchildKey');

    const recipeRef = database.child('Tips/' + tipID);

    recipeRef.remove();
}
