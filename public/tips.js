var config = {
    apiKey: "AIzaSyBX9d_NmxSAUMwSt4w7dDkel1hk_3eTiRw",
    authDomain: "marcus-at-uni.firebaseapp.com",
    databaseURL: "https://marcus-at-uni.firebaseio.com",
    projectId: "marcus-at-uni",
    storageBucket: "marcus-at-uni.appspot.com",
    messagingSenderId: "47512234516"
};
firebase.initializeApp(config);


var database = firebase.database();
var tipRef = database.ref().child('Tips');

var tipList = document.getElementById('tipsList');

    
var names = document.getElementById('name');
var brief = document.getElementById('brief');

var img = document.getElementById('img');
var imgs;

img.addEventListener('change', function(e){
    imgs = e.target.files [0];
});

var index = [];
index.push(0);

function addStep(){
    var div = document.createElement('div');
    var id = getTipID();

    div.setAttribute('id','Div_'+id);

    //creating a new text box and setting its values
    div.innerHTML = 'Tip_' + id + ': <input type="text" data-tip="tip' + id + '" class="tip" style="width: 300px;"/>'
     + '<input type="button" id="removeTip()_' + id + '"onclick="removeTip('+id+')" value="remove" />'

     //appending the new text box to the page.
    document.getElementById('tip').appendChild(div);
}

function removeTip(id){
// use the id arugment to get the div element using unique id set in addTip
try{
var element = document.getElementById("Div_"+id)
element.parentNode.removeChild(element);
index[id] = -1;
    //id number is = index of the array so we set to -1 to indicate its empty
    }
  catch(err){
    alert("id: Div_"+id)
    alert(err)
    
    }

}

function btnDeleteClicked(event){

    //Prevents further propagation of the current event in the capturing and bubbling phases.
    event.stopPropagation();

    //gets the selected recipe ID by the attribute.
    var recipeID = event.target.getAttribute('childKey');

    //creates a reference to that child key within the database. 
    const recipeRef = database.child('Recipe/' + recipeID);

    //removes the key and all values belonging to it from the database.
    recipeRef.remove();
}


function getTipID(){
    var emptyIndex = index.indexOf(-1);
    if (emptyIndex != -1){
        index[emptyIndex] = emptyIndex

        return emptyIndex
    } else {
        emptyIndex = index.length
        index.push(emptyIndex)
        return emptyIndex
    }
}

function addTip(){
    // var storageRef = firebase.storage().ref('Food_pics/' + imgs.name);
    // var upload = storageRef.put(imgs).then(function(snapshot) {
    //var downloadURL = snapshot.downloadURL;
    
    //creates and the key for the child node.
    var newTipRef = tipRef.push();    
    var tipID = newTipRef.key;    

    //object for the values
    var newTip  = {
        name: names.value,
        tipID: tipID,
        brief: brief.value,
        //img: downloadURL,
        steps: {}
    };

    //gets all of the elements with the same class name
    var steps = document.querySelectorAll('.tip');
    var s;
    //loops through all those elements
        for(s = 0; s < steps.length; s++){
            //sets the key to for each child.
            let key = steps[s].getAttribute('data-tip');
            //sets the value for each key
            let value = steps[s].value;
            //uploads the values to the nested object within the tip.
            newTip["steps"][key] = value;
        }
    //pushed the object to the database, while pushing the key.     
    newTipRef.set(newTip);
   // });
}