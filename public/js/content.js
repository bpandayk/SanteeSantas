
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

function validateForm() {
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

  console.log(fname);
  console.log(lname);
  console.log(add1);
  console.log(add2);
  console.log(zip);
  console.log(city);
  console.log(state);
  console.log(dob);
  console.log(phone);
  console.log(email);
  console.log(foodsort);
  console.log(toysort);
  console.log(delivery);
  console.log(agegroup);
  console.log(volunteer);



}
