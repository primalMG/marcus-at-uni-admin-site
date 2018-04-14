    
    var database = firebase.database();
    var recipeRef = database.ref().child('Recipe');
    
    
    var names = document.getElementById('name');
    var currentPrice = document.getElementById('currentPrice');
    var price = currentPrice.options[currentPrice.selectedIndex].text;
    
    //ingredients varibles
    var ingOne = document.getElementById('ingOne');
    var ingTwo = document.getElementById('ingTwo');
    var ingThree = document.getElementById('ingThree');
    var ingFour = document.getElementById('ingFour');

    //steps variables
    var stepOne = document.getElementById('stepOne');
    var stepTwo = document.getElementById('stepTwo');
    var stepThree = document.getElementById('stepThree');
    var stepFour = document.getElementById('stepFour');

    var img = document.getElementById('img');
    var imgs;

    img.addEventListener('change', function(e){
        imgs = e.target.files[0];
    });
        

    
    function addRecipe(){
        //uploading the image to storage.
        var storageRef = firebase.storage().ref('Food_pics/' + imgs.name);
        var upload = storageRef.put(imgs).then(function(snapshot) {
            var downloadURL = snapshot.downloadURL;
            var newRecipeRef = recipeRef.push().key;

            //populating the database with values from the DOMS 
            var recipeData = {
                name: names.value,
                recipeID: newRecipeRef,    
                price: price,
                img: downloadURL,
                Ingredients : {
                    Ing1: ingOne.value,
                    Ing2: ingTwo.value,
                    Ing3: ingThree.value,
                    Ing4: ingFour.value,
                },
                steps: {
                    step1: stepOne.value,
                    step2: stepTwo.value,
                    step3: stepThree.value,
                    step4: stepFour.value,
                }
            };
         
        //uploading the recipe to the database.    
        var newRecipe = {};
        newRecipe['/Recipe/' + newRecipeRef] = recipeData;

        return firebase.database().ref().update(newRecipe);

        });

      
    }

    