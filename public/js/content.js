
//Global variables to store form field values
var fname;
var lname;
var add1;
var add2;
var zip;
var city;
var state;
var dob;
var phone;
var email;
var foodsort=false;
var toysort=false;
var delivery=false;
var agegroup=2;
var volunteer=2;
var additional;
var agree=false;
var mailer=false;
var application_intake=false;
var other_interests=false;



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

//function gets the value from the form and stores in the variable
function getValues() {
  fname = document.getElementById("fname").value;
  lname = document.getElementById("lname").value;
  add1 = document.getElementById("add1").value;
  add2 = document.getElementById("add2").value;
  zip = document.getElementById("zip").value;
  city = document.getElementById("city").value;
  state = document.getElementById("state").value;
  dob = document.getElementById("dob").value;
  phone = document.getElementById("phone").value;
  email = document.getElementById("email").value;
  additional = document.getElementById("info").value;
  
  if (document.getElementById("foodsort").checked){
    foodsort=true;
  }

   if (document.getElementById("toysort").checked){
    toysort=true;

  }

   if (document.getElementById("delivery").checked){
    delivery=true;

  }
  
    if (document.getElementById("mailer").checked){
    mailer=true;

  }
   
   if (document.getElementById("application_intake").checked){
    application_intake=true;

  }
  
  if (document.getElementById('other_interests').checked){
	  other_interests=true;
  }
// removed all this so can be deleted. Left it commented in case i break something

/*
  if (document.getElementById("over18").checked){
    agegroup=1;
  }

  if (document.getElementById("under18").checked){
    agegroup=0;
  }

  if (document.getElementById("before-yes").checked){
    volunteer=1;
  }

  if (document.getElementById("before-no").checked){
    volunteer=0;
  }

  if (document.getElementById("agree").checked){
	  agree=true;
  }
*/
}


//validates the form and if form is not valid then text turns into red
function validateForm(){
  getValues();

  var verify = true;
  if (!fname){
	  document.getElementById("l1").style.color="red";
	  verify=false;
  } else {
	  document.getElementById("l1").style.color="white";
  }
  
    if (!lname){
	  document.getElementById("l2").style.color="red";	  
	  verify=false;
  } else {
	  document.getElementById("l2").style.color="white";
  }
  
    if (!add1){
	  document.getElementById("l3").style.color="red";	  
	  verify=false;
  } else {
	  document.getElementById("l3").style.color="white";
  }
  
    if (!city){
	  document.getElementById("l4").style.color="red";	  
	  verify=false;
  } else {
	  document.getElementById("l4").style.color="white";
  }
  
    if (!state){
	  document.getElementById("l5").style.color="red";	  
	  verify=false;
  } else {
	  document.getElementById("l5").style.color="white";
  }
  
    if (!zip){
	  document.getElementById("l6").style.color="red";	  
	  verify=false;
  } else {
	  document.getElementById("l6").style.color="white";
  }
  
  
    if (!dob){
	  document.getElementById("l7").style.color="red";	  
	  verify=false;
  } else {
	  document.getElementById("l7").style.color="black";
  }


  /*
    if (agegroup==2){
	  document.getElementById("l9").style.color="red";	  
	  verify=false;
  } else {
	  document.getElementById("l9").style.color="white";
  }
	
  if (volunteer==2){
	  document.getElementById("l10").style.color="red";  
	  verify=false;
  } else {
	  document.getElementById("l10").style.color="white";
  }
*/
  if (foodsort==false && toysort==false && delivery==false && mailer==false && application_intake==false && other_interests==false){
	  document.getElementById("l8").style.color="red";	  
	  verify=false;
  } else {
	  document.getElementById("l8").style.color="white";
  }
/* this we no longer need   
  if (agree==false){
	  document.getElementById("l11").style.color="red";  
	  verify=false;
  } else {
	  document.getElementById("l11").style.color="white";
  }
*/  
  return verify;
}



function getAge(){
	var dat = new Date();
	var m = dat.getMonth() +1;
	var y = dat.getFullYear();
	var dd = dat.getDate();
 
    var qer = dob.split("-");
	
	var y1 = y-qer[0];	
	var m1 = m-qer[1];

	var d1 = dd-qer[2];

	var age= ((m1*30.42)+d1+(y1*12*30.42))/365;
	age = parseInt(age,10);
	return age;
	
}

//function to navigate to next page after form is validated
function navNext(){
   var ver=validateForm();
   var agegro=getAge();
   if (ver==true && agegro>=18) {
     agegroup=1;
	   window.location.href="waiveradult.html?fname="+fname+"&lname="+lname+"&add1="+add1+
	   "&add2="+add2+"&zip="+zip+"&city="+city+
	   "&state="+state+"&dob="+dob+"&phone="+phone+"&email="+email+
	   "&foodsort="+foodsort+"&toysort="+toysort+"&delivery="+delivery+"&mailer="+mailer+"&application_intake="+application_intake+"&other_interests="+other_interests+
	   "&additional="+additional+"&agegroup="+agegroup;
   } else if (ver==true && agegro<18) {
     agegroup=0;
           window.location.href="waiver.html?fname="+fname+"&lname="+lname+"&add1="+add1+
	   "&add2="+add2+"&zip="+zip+"&city="+city+
	   "&state="+state+"&dob="+dob+"&phone="+phone+"&email="+email+
	   "&foodsort="+foodsort+"&toysort="+toysort+"&delivery="+delivery+"&mailer="+mailer+"&application_intake="+application_intake+"&other_interests="+other_interests+
	   "&additional="+additional+"&agegroup="+agegroup;
   }
	
}






