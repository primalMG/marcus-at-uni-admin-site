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
    name: "Oxtail Stew",
    recipeID: recipeID,
    Ingredients : {
        
        Oxtail: "Oxtail",
        Rice: "Rice n Peas",
    }
});

console.log(recipeID);





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


});