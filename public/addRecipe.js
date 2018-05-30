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
    var recipeRef = database.ref().child('Recipe');
    
    
    var names = document.getElementById('name');
    var servings = document.getElementById('serving');
    var currentPrice = document.getElementById('currentPrice');
    var price = currentPrice.options[currentPrice.selectedIndex].value;

    var img = document.getElementById('img');
    var imgs;

    img.addEventListener('change', function(e){
        imgs = e.target.files[0];
    });
        
    var index = [];
    index.push(0);
    var stepIndex = [];
    stepIndex.push(0);
    //index.push(1)


    function addIngredient(){
        var div = document.createElement('div');
        var id = getID();

        div.setAttribute("id","Div_"+id);
        //creating a new text box and setting its values
        div.innerHTML = 'Ingredient_' + id + ': <input type="text" data-Ingredient="Ingreident' + id + '" class="Ingredient"/>' 
                                             + '<input type="button" id="removeIng()_' + id + '"onclick="removeIng('+id+')" value="remove" />'; 
        //appending the new text box to the page.
        document.getElementById('ing').appendChild(div);
    }

    
    function removeIng(id){
        // use the id arugment to get the div element using unique id set in add Ingredient
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


    
    function addStep(){
        var div = document.createElement('div');
        var id = getStepID();

        div.setAttribute('id','Div_'+id);

        div.innerHTML = 'Step_' + id + ': <input type="text" data-Step="Step' + id + '" class="step"/>'
         + '<input type="button" id="removeStep()_' + id + '"onclick="removeStep('+id+')" value="remove" />'

        document.getElementById('step').appendChild(div);
    }

    function removeStep(id){
        // use the id arugment to get the div element using unique id set in add Step
    try{
    var element = document.getElementById("Div_"+id)
    element.parentNode.removeChild(element);
    stepIndex[id] = -1;
        //id number is = index of the array so we set to -1 to indicate its empty
        }
      catch(err){
        alert("id: Div_"+id)
        alert(err)
        
        }
    
    }

        function getID(){
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

        function getStepID(){
            var emptyIndex = stepIndex.indexOf(-1);
            if (emptyIndex != -1){
                stepIndex[emptyIndex] = emptyIndex

                return emptyIndex
            } else {
                emptyIndex = stepIndex.length
                stepIndex.push(emptyIndex)
                return emptyIndex
            }
        }


    function addRecipe(){
        //uploading the image to storage.
        var storageRef = firebase.storage().ref('Food_pics/' + imgs.name);
        var upload = storageRef.put(imgs).then(function(snapshot) {
            var downloadURL = snapshot.downloadURL;
            var newRecipeRef = recipeRef.push();
            
            var recipeId = newRecipeRef.key;
            //populating the database with values from the DOMS 
            var newRecipe = {
                name: names.value,
                recipeID: recipeId,    
                price: price,
                img: downloadURL,
                serving: servings.value,
                Ingredients : {},
                steps : {}
            };  
            
            var ingredients = document.querySelectorAll('.Ingredient');
            var i; 
                for(i = 0; i < ingredients.length; i++) {
                let key = ingredients[i].getAttribute('data-Ingredient');
                var value = ingredients[i].value;
                    newRecipe["Ingredients"][key] = value;
                }

            var steps = document.querySelectorAll('.step');
            var s;
                for(s = 0; s < steps.length; s++){
                    let skey = steps[s].getAttribute('data-Step');
                    let svalue = steps[s].value;
                    newRecipe["steps"][skey] = svalue;
                }
            
            newRecipeRef.set(newRecipe); 
        });
    }

    