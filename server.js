var app = require('express')();
var http = require('http').Server(app);
var admin = require('firebase-admin');
var io = require('socket.io')(http);
var serviceAccount = require('./Marcus at uni service account.json');

app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html')
});

http.listen(2000,function(){
    console.log('listening on 2000');
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://marcus-at-uni.firebaseio.com'
});

var ref = admin.database().ref();
var recipeRef = ref.child('Recipe');

var newRecipeRef = recipeRef.push();
var recipeID = newRecipeRef.key;

newRecipeRef.set({
    name: "Cous Cous",
    price: "£",
    recipeID: recipeID,
    Ingredients : {
        Ing1: "Cous Cous",
        Ing2: "Spinach",
        Ing3: "Kale",
        Ing4: "Sweet peppers"
    },
    steps: {
        step1: "Dash cous cous in a bowl",
        step2: "dash veg in pan with oil",
        step3: "add Cous Cous to pan"
    }
});

console.log(recipeID);


var tipsRef = ref.child('Tips').push();
var tipsID = tipsRef.key;

function NewTip(){
    tipsRef.set({
        name: "How to cook Pasta",
        Brief: "How to make the perfect pasta every time..",
        tipsID: tipsID,
        Description: "making some bomb ass pasta goes a little something like this.."
    });
}




var socketList = {};

var admins = {
    "marcus":"pass",
}

var passwordValidation = function(data){
    return admins[data.name] === data.pass;
}

//serverside goodness
io.on('connection', function(socket){
    socket.id = Math.random();
    socketList[socket.id] = socket;

    socket.on('join', function(data){
        if(passwordValidation(data)){
            socket.emit('loginResponse',{success:true});
        } else {
            socket.emit('loginResponse',{success:false});
        }
    });

    // socket.on('AddRecipe', function(data){
    //     if requirements met
    //     recipeRef.set()
    //     else{
    //         return what needs to be comeplete
    //     } 
    // });

});