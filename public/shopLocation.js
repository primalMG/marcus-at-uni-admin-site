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

    $li.append(btnDelete)
    $li.setAttribute('key', key);
    shopLocationList.append($li);
    //$li.addEventListener('click', )
  });
}); 

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

  const newShop = document.getElementsByClassName("shop-location");

  let shop = {
    key : shopID
  };

  for (let i = 0; i < newShop.length; i++){
    let keys = newShop[i].getAttribute('data-shop');
    let value = newShop[i].value;
    shop[keys] = value;
  }

  newShopRef.set(shop);
}
