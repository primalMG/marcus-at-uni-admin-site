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
    name: "Buffalo Wings",
    price: "£",
    recipeID: recipeID,
    Ingredients : {
        Ing1: "Chicken Wings",
        Ing2: "Chilli Sauce",
        Ing3: "Butter",
        Ing4: "Seasoning",
        Ing5: "Seasoing"
    },
    steps: {
        step1: "Seasoning the wings.",
        step2: "Put them in the oven at gas mark 5 for 45mins.",
        step3: "Mix the butter and Chilli sauce in a pan",
        step4: "Put the wings into the pan and stir the sauce until covered",
        step5: "Serve with chips"
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