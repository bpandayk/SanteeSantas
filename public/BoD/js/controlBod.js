
var searchName;
var minage;
var maxage;
var foodsort=false;
var toysort=false;
var delivery=false;



 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA6JtrlqORiTv0N8UidMQ3L2kk9Jz1o_g8",
    authDomain: "santeesanta-c540f.firebaseapp.com",
    databaseURL: "https://santeesanta-c540f.firebaseio.com",
    storageBucket: "santeesanta-c540f.appspot.com",
    messagingSenderId: "168894068507"
  };
  firebase.initializeApp(config);
  
var database = firebase.database();


function searchParam(){
	searchName=document.getElementById("searchbyname").value;
	minage=document.getElementById("minage").value;
	maxage=document.getElementById("maxage").value;

	if(document.getElementById("foodsort").checked){
    foodsort=true;
  }

	if(document.getElementById("toysort").checked){
    toysort=true;
  }

	if(document.getElementById("delivery").checked){
    delivery=true;
  }

console.log(searchName);
console.log(minage);
console.log(maxage);
console.log(foodsort);
console.log(toysort);
console.log(delivery);

  ListByParam(searchName,minage, maxage, foodsort, toysort, delivery);
}



function ListAll(){
	

}


function ListByParam(name,minage, maxage, foodsort, toysort, delivery){
	

}
