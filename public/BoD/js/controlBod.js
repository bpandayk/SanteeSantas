
var searchName;
var minage;
var maxage;
var foodsort="false";
var toysort="false";
var delivery="false";



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

/*var user = localStorage.getItem("firebase:authUser:AIzaSyA6JtrlqORiTv0N8UidMQ3L2kk9Jz1o_g8:[DEFAULT]");
var parser = JSON.parse(user);
var UID = parser.uid;
var username = parser.displayName;
var email=parser.email;
console.log(UID);
*/
var panel = '<div class="panel panel-primary">'+
  					'<div class="panel-heading"><h3 id="header">Volunteers List for '+year+'</h3></div>'+
  					'<table class="table table-hover table-bordered">'+
             '<tr>'+
              '<th>#</th>'+
              '<th>Name</th>'+
              '<th>Age</th>'+
              '<th>Food Sorting</th>'+
              '<th>Toy Sorting</th>'+
              '<th>Delivery</th>'+
              '<th>Misc</th>'+
             '</tr>';


var end= '</table></div>';


function searchParam(){
	searchName=document.getElementById("searchbyname").value;
	minage=document.getElementById("minage").value;
	maxage=document.getElementById("maxage").value;

	if(document.getElementById("foodsort").checked){
    foodsort="true";
  } else {
	  foodsort="false";
  }

	if(document.getElementById("toysort").checked){
    toysort="true";
  } else {
	  toysort="false";
  }

	if(document.getElementById("delivery").checked){
    delivery="true";
  } else {
	  delivery="false";
  }


  ListByParam(searchName,minage, maxage, foodsort, toysort, delivery);
    
}



function DisplayTable(data){
	var name, age,toyval,foodval,deliveryval, toy, food, delivery;
    var key = Object.keys(data);
    var display = panel;
    var count=1;


    for(i in key) {
	  name = data[key[i]].firstname +" "+ data[key[i]].lastname;
      age=data[key[i]].Age;
	  
	  foodval=data[key[i]].FoodSort;
	  toyval=data[key[i]].ToySort;
	  deliveryval=data[key[i]].Delivery;
	 
	  
      if(foodval == "true"){
        food='&#10004';
      }else{
        food='<span style="color:red">&#10008</span>';
      }

      if(toyval == "true"){
        toy='&#10004';
      }else{
        toy='<span style="color:red">&#10008</span>';
      }

      if(deliveryval == "true"){
        delivery='&#10004';
      }else{
        delivery='<span style="color:red">&#10008</span>';
      }
     
       
      var addhtml = '<tr onclick="getDetail(\''+key[i]+'\')">'+
                    '<td>'+count+'</td>'+
                    '<td>'+name +'</td>'+
                    '<td>'+age +'</td>'+
                    '<td>'+food +'</td>'+
                    '<td>'+toy +'</td>'+
                    '<td>'+delivery +'</td>'+
                    '<td>'+'Del' +'</td>'+'</tr>';
     
 			display = display + addhtml;
      count++;
      
    }   

    display=display+end;
    document.getElementById("insertDom").innerHTML=display;
}


function ListAll(){

	return firebase.database().ref('/Volunteers').once('value').then(function(snapshot) {
  	var data = snapshot.val();
    DisplayTable(data);
	});

}


function ListByParam(name,minage, maxage, foodsort, toysort, delivery){
	if((foodsort || toysort ||delivery)&& (!name && !minage && !maxage)){
    //var name1 = name.toUpperCase();

  	var ref = firebase.database().ref("Volunteers");
 	    ref.orderByChild("ToySort").equalTo(toysort).on("value", function(snapshot) {
			var data=snapshot.val();
			DisplayTable(data);
        });
  }

}


function getDetail(alias){
	var ref = firebase.database().ref("Volunteers/"+alias);
	ref.once('value').then(function(snapshot){
		var data=snapshot.val();
		var end='</table></div>';
		var temp;
		var panel = '<div class="panel panel-primary">'+
  					'<div class="panel-heading"><h3 id="header">Details of '+data.firstname+" "+data.lastname+
					'</h3></div>'+
  					'<table class="table table-hover table-bordered">'+
					'<tr>'+
					'<td> Full Name </td>'+
					'<td>'+data.firstname+" "+data.lastname+'</td>'+
					'</tr>'+
					'<tr>'+
					'<td> Address </td>'+
					'<td>'+data.address1+'</td>'+
					'</tr>';
		
		if(data.address2!=" "){
			temp=	'<tr>'+
					'<td> Address 2 </td>'+
					'<td>'+data.address2+'</td>'+
					'</tr>';
			panel = panel+temp;
		}
		
		temp = 	'<tr>'+
				'<td> City </td>'+
				'<td>'+data.City+'</td>'+
				'</tr><tr>'+
				'<td> State </td>'+
				'<td>'+data.State+'</td>'+
				'</tr><tr>'+
				'<td> Zip </td>'+
				'<td>'+data.ZipCode+'</td>'+	
				'</tr><tr>'+
				'<td> Age </td>'+
				'<td>'+data.Age+'</td>'+
				'</tr><tr>'+
				'<td> Date Of Birth </td>'+
				'<td>'+data.DoB+'</td>'+
				'</tr>';				
					
		panel=panel+temp;

        if(data.Phone!=" "){
			temp = '<tr>'+
				'<td> Phone </td>'+
				'<td>'+data.Phone+'</td>'+
				'</tr>';	
		panel=panel+temp;
		}  		
		
		
        if(data.Email!=" "){
			temp = '<tr>'+
				'<td> Email </td>'+
				'<td>'+data.Email+'</td>'+
				'</tr>';	
		panel=panel+temp;
		}  							

		var val1=data.FoodSort;
		var val2=data.ToySort;
		var val3=data.Delivery;
	    var food,toy,delivery;
	  
		if(val1 == "true"){
			food='&#10004';
		}else{
			food='<span style="color:red">&#10008</span>';
		}

		if(val2 == "true"){
			toy='&#10004';
		}else{
			toy='<span style="color:red">&#10008</span>';
		}

		if(val3 == "true"){
			delivery='&#10004';
		}else{
			delivery='<span style="color:red">&#10008</span>';
		}

		temp = 	'<tr>'+
				'<td> Food Sorting </td>'+
				'<td>'+food+'</td>'+
				'</tr><tr>'+
				'<td> Toy Sorting </td>'+
				'<td>'+toy+'</td>'+
				'</tr><tr>'+
				'<td> Delivery </td>'+
				'<td>'+delivery+'</td>'+	
				'</tr>';			
		
		
		panel=panel+temp;
		
		
        if(data.Info!=" "){
			temp = '<tr>'+
				'<td> Additional Questions </td>'+
				'<td>'+data.Info+'</td>'+
				'</tr>';	
		panel=panel+temp;
		}  		
		
    document.getElementById("insertDom").innerHTML=panel;		
	});



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





