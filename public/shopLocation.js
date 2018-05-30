// Initialize Firebase
var config = {
    apiKey: "AIzaSyBX9d_NmxSAUMwSt4w7dDkel1hk_3eTiRw",
    authDomain: "marcus-at-uni.firebaseapp.com",
    databaseURL: "https://marcus-at-uni.firebaseio.com",
    projectId: "marcus-at-uni",
    storageBucket: "marcus-at-uni.appspot.com",
    messagingSenderId: "47512234516"
  };
firebase.initializeApp(config);
    
  //hello 
const database = firebase.database().ref();
const LocationsRef = database.child('ShopLocation');

const shopLocationList = document.getElementById('shopList');
const names = document.getElementById('name');
const subName = document.getElementById('subName');
const latitude = document.getElementById('lat').value;
const longtitude = document.getElementById('long').value;

var lat = parseFloat(latitude);
var long = parseFloat(longtitude);


LocationsRef.on('value', snap => {
  shopLocationList.innerHTML = ""

  snap.forEach(childSnap => {
    let key = childSnap.key,
      value = childSnap.val();
    let $li = document.createElement('li');

    $li.innerHTML = value.name;

    //Deleting a recipe
    let btnDelete = document.createElement("span");
    btnDelete.class = 'deleteRecipe';
    btnDelete.innerHTML = ' Delete';
    btnDelete.setAttribute('childKey', key);
    btnDelete.style.color = "#e20f24";
    btnDelete.addEventListener('click', btnDeleteClicked);
    
    //edit a shop
    let btnEdit = document.createElement("span");
    btnEdit.class = "editShop";
    btnEdit.innerHTML = ' Edit';
    btnEdit.setAttribute('childKey', key);
    btnEdit.style.color = "#6a3cc4";
    btnEdit.addEventListener('click', btnEditShop);
    $li.append(btnEdit);

    $li.append(btnDelete)
    $li.setAttribute('key', key);
    shopLocationList.append($li);
  });
}); 

function btnEditShop(e){
  document.getElementById('edit-shop-module').style.display = "block";

  document.querySelector('.edit-shopID').value = e.target.getAttribute('childkey');

  const dbRef = database.child('ShopLocation/' + e.target.getAttribute('childKey'));

  const editShopUI = document.querySelectorAll('.shopDetails');

  dbRef.on('value', snap => {
    for(var i = 0, len = editShopUI.length; i < len; i++) {
      var key = editShopUI[i].getAttribute('data-key');
      editShopUI[i].value = snap.val()[key];
    }
  });
  
}

function EditShop(e) {
  
 const shopID = document.querySelector('.edit-shopID').value;

  const dbRef = database.child('ShopLocation/' + shopID);

  var editShop = {}

  const editShopUI = document.querySelectorAll('.shopDetails');


  editShopUI.forEach(function(textField){
    let key = textField.getAttribute('data-key');
    let value = textField.value;
    editShop[textField.getAttribute('data-key')] = textField.value;
  });

  dbRef.update(editShop);
  
  document.getElementById('edit-shop-module').style.display = "none";

}
//Delete
function btnDeleteClicked(event){

  event.stopPropagation();

  var shopID = event.target.getAttribute('childKey');

  const locationRef = database.child('ShopLocation/' + shopID);

  locationRef.remove();
}

function addShop(){
  const newShopRef = LocationsRef.push();
  const shopID = newShopRef.key;

  let shop = {
    name: names.value,
    subName: "Postcode: " + subName.value,
    lat: lat,
    long: long,
    key : shopID,
  };

  newShopRef.set(shop);
}
