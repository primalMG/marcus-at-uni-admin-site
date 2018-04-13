    
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

    img.addEventListener('change', function(e){
        var imgs = e.target.files[0];

        var storageRef = firebase.storage().ref('Food_pics/' + imgs.name);

        var upload = storageRef.put(imgs);
    });
        

    
    function addRecipe(){
        var newRecipeRef = recipeRef.push().key;

       var recipeData = {
            name: names.value,
            recipeID: newRecipeRef,    
            price: price,
            //img: imageURL,
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

           

        var newRecipe = {};
        newRecipe['/Recipe/' + newRecipeRef] = recipeData;

        return firebase.database().ref().update(newRecipe);
    }

    