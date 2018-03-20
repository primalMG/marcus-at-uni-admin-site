var app = require('express')();
var http = require('http').Server(app);
var admin = require('firebase-admin');
var io = require('socket.io')(http);
var serviceAccount = require('./Marcus at uni service account.json');

app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html');
});


http.listen(2000,function(){
    console.log('listening on 2000');
});


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://marcus-at-uni.firebaseio.com'
});

var ref = admin.database().ref
var databaseRef = admin.database().ref().child('Recipe');

var data = {
    name: "Buffalo wings",
    price: "££",
    Ingredients: {
        Ing1: "Wings",
        Ing2: "Butter",
        Ing3: "Chilli sauce"
    },
    Steps: {
        Step1: "dash wings in oven",
        Step2: "dash butter and chilli sauce in pan",
        Step3: "dash wings into pan and let them do a madness together"
    }
}

var newRecipe = databaseRef.push(data);

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