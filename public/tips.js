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

tipRef.on('value', snap => {
    
    tipList.innerHTML = ""

        snap.forEach(childSnap => {
            let key = childSnap.key,
                value = childSnap.val();
            let $li = document.createElement('li');

            $li.innerHTML = value.name;

            let btnDelete = document.createElement("span");
            btnDelete.class = "deleteTip";
            btnDelete.innerHTML = ' Delete';
            btnDelete.setAttribute('TipchildKey', key);
            btnDelete.style.color = "#e20f24";
            btnDelete.addEventListener('click', DeleteTip)

            $li.append(btnDelete);
            $li.setAttribute('keyY', key);
            tipList.append($li);
        });
});

    
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

    div.innerHTML = 'Tip_' + id + ': <input type="text" data-tip="tip' + id + '" class="tip"/>'
     + '<input type="button" id="removeTip()_' + id + '"onclick="removeTip('+id+')" value="remove" />'

    document.getElementById('tip').appendChild(div);
}

function removeTip(id){
    // use the id arugment to get the div element using unique id set in addkid
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
    
    var newTipRef = tipRef.push();    
    var tipID = newTipRef.key;    

    var newTip  = {
        name: names.value,
        tipID: tipID,
        brief: brief.value,
        //img: downloadURL,
        steps: {}
    };

    var steps = document.querySelectorAll('.step');
    var s;
        for(s = 0; s < steps.length; s++){
            let key = steps[s].getAttribute('data-step');
            let value = steps[s].value;
            newTip["steps"][key] = value;
        }

    newTipRef.set(newTip);
   // });
}