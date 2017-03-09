
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
//var userId = firebase.auth().currentUser.uid;
var date1 = new Date();
var year = date1.getFullYear();

var user = localStorage.getItem("firebase:authUser:AIzaSyA6JtrlqORiTv0N8UidMQ3L2kk9Jz1o_g8:[DEFAULT]");
var parser = JSON.parse(user);
var UID = parser.uid;
var username = parser.displayName;
var email=parser.email;
console.log(UID);

var panel = '<div class="panel panel-primary">'+
  					'<div class="panel-heading"><h3>Volunteers List for '+year+'</h3></div>'+
  					'<table class="table table-hover table-bordered">'+
             '<tr>'+
              '<th>#</th>'+
              '<th>Name</th>'+
              '<th>Age</th>'+
              '<th>Toy Sorting</th>'+
              '<th>Food Sorting</th>'+
              '<th>Delivery</th>'+
              '<th>Misc</th>'+
             '</tr>';


var end= '</table></div>';


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


  ListByParam(searchName,minage, maxage, foodsort, toysort, delivery);
    
}



function ListAll(){

	return firebase.database().ref('/Volunteers').once('value').then(function(snapshot) {
  	var data = snapshot.val();
    var name, age, toy, food, volunteer;
    var key = Object.keys(data);
    var display = panel;
    var count=1;


    for(i in key) {
			name = data[key[i]].firstname +" "+ data[key[i]].lastname;
      age=data[key[i]].Age;
      if(data[key[i]].FoodSort == 'true'){
        food='&#10004';
      }else{
        food='<span style="color:red">&#10008';
      }

      if(data[key[i]].ToySort == 'true'){
        toy='&#10004';
      }else{
        toy='<span style="color:red">&#10008';
      }

      if(data[key[i]].Delivery == 'true'){
        volunteer='&#10004';
      }else{
        volunteer='<span style="color:red">&#10008';
      }
     
       
      var addhtml = '<tr onclick="getDetail(\''+key[i]+'\')">'+
                    '<td>'+count+'</td>'+
                    '<td>'+name +'</td>'+
                    '<td>'+age +'</td>'+
                    '<td>'+food +'</td>'+
                    '<td>'+toy +'</td>'+
                    '<td>'+volunteer +'</td>'+
                    '<td>'+'Del' +'</td>'+'</tr>';
     
 			display = display + addhtml;
      count++;
      
    }   

    display=display+end;
    document.getElementById("insertDom").innerHTML=display;

	});

}


function ListByParam(name,minage, maxage, foodsort, toysort, delivery){
	if(name && !minage && !maxage && !foodsort && !toysort && !delivery){
    var name1 = name.toUpperCase();
  	var ref = firebase.database().ref("Volunteers");
 	  ref.orderByChild("ToySort").equalTo("true").on("value", function(snapshot) {
 		  console.log(snapshot.val())
});
  } else {
    
 
  }

}


function getDetail(alias){
	



}

function logout() {
	firebase.auth().signOut().then(function() {
	    if (typeof(Storage) !== "undefined"){
          localStorage.setItem("current", undefined);
		window.location.href="signIn.html";
	    console.log("logged out succesfully!");
     	}
	}, function(error){
	     console.log(error);
	});
}





