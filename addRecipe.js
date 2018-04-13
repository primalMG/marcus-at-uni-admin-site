    
    var database = firebase.database();
    var recipeRef = database.ref().child('Recipe');

    //getting the Recipe Key
    //var recipeID = newRecipeRef.key;

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

    
    function addRecipe(){
       var recipeData = {
            name: names.value,
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

        var newRecipeRef = recipeRef.push().key;

        var newRecipe = {};
        newRecipe['/Recipe/' + newRecipeRef] = recipeData;

        return firebase.database().ref().update(newRecipe);
    }

    