var admin = require('firebase-admin');

var serviceAccount = require('./Marcus-at-uni-service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://marcus-at-uni.firebaseio.com'
});

var ref = admin.database().ref