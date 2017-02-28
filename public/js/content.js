
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
    //rate_value = document.getElementById('r1').value;
  }

   if (document.getElementById("toysort").checked){
    toysort=true;

  }

   if (document.getElementById("delivery").checked){
    delivery=true;

  }

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

}



function validateForm(){
  getValues();

  var verify = true;
  if (!fname){
	  document.getElementById("l1").style.color="red";
	  verify=false;
  } else {
	  document.getElementById("l1").style.color="black";
  }
  
    if (!lname){
	  document.getElementById("l2").style.color="red";	  
	  verify=false;
  } else {
	  document.getElementById("l2").style.color="black";
  }
  
    if (!add1){
	  document.getElementById("l3").style.color="red";	  
	  verify=false;
  } else {
	  document.getElementById("l3").style.color="black";
  }
  
    if (!city){
	  document.getElementById("l4").style.color="red";	  
	  verify=false;
  } else {
	  document.getElementById("l4").style.color="black";
  }
  
    if (!state){
	  document.getElementById("l5").style.color="red";	  
	  verify=false;
  } else {
	  document.getElementById("l5").style.color="black";
  }
  
    if (!zip){
	  document.getElementById("l6").style.color="red";	  
	  verify=false;
  } else {
	  document.getElementById("l6").style.color="black";
  }
  
  
    if (!dob){
	  document.getElementById("l7").style.color="red";	  
	  verify=false;
  } else {
	  document.getElementById("l7").style.color="black";
  }
  
    if (agegroup==2){
	  document.getElementById("l8").style.color="red";	  
	  verify=false;
  } else {
	  document.getElementById("l8").style.color="black";
  }
	
  if (volunteer==2){
	  document.getElementById("l9").style.color="red";  
	  verify=false;
  } else {
	  document.getElementById("l9").style.color="black";
  }

  if (foodsort==false && toysort==false && delivery==false){
	  document.getElementById("l10").style.color="red";	  
	  verify=false;
  } else {
	  document.getElementById("l10").style.color="black";
  }
  
  if (agree==false){
	  document.getElementById("l11").style.color="red";  
	  verify=false;
  } else {
	  document.getElementById("l11").style.color="black";
  }
  
  return verify;
  
}

function navNext(){
   var ver=validateForm();
   if (ver==true) {
	   window.location.href="waiver.html";
   }
	
}

