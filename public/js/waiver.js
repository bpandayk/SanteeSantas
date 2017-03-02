
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
var pFname;
var pLname;
var appInit;
var pInit;



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



function getQueries(queryString){
	var qLoc = window.location.search;
	var qString = decodeURIComponent(qLoc);
	qString = qString.substring(1);

	var i, list;
	list = qString.split("&");
	for (i=0; i< list.length; i++){
		var temp = list[i].split("=")
		if(temp[0]==queryString){
			return temp[1];
		}
	}
	
}

function getValues(){
	fname=getQueries("fname");
	lname=getQueries("lname");
	add1=getQueries("add1");
	add2=getQueries("add2");
	zip=getQueries("zip");
	city=getQueries("city");
	state=getQueries("state");
	dob=getQueries("dob");
	phone=getQueries("phone");
	email=getQueries("email");
	foodsort=getQueries("foodsort");
	toysort=getQueries("toysort");
	delivery=getQueries("delivery");
	agegroup=getQueries("agegroup");
	volunteer=getQueries("volunteer");
	additional=getQueries("additional");
}

function loadInfo(){

if (!add2){
  add2=" ";
}

if(!phone){
  phone=" ";
}

if(!email){
  email=" ";
}

  document.getElementById("applicantsInfo").innerHTML="<div class='form-group'><label for='name' style= 'padding-right:10px;'> Applicants Name: </label>" + "<span style='font-weight:bold;'>"+fname+ "&nbsp&nbsp" + lname + "</span> </div>" +"<div class='form-group'><label for='name' style= 'padding-right:10px;'> Applicants Address: </label>" + "<span style='font-weight:bold;'>"+add1 + "&nbsp&nbsp" +add2+"</span></div>" + "<div class='form-group'><label for='name' style= 'padding-right:10px;'> City: </label>" + "<span style='font-weight:bold;'>"+city+ "</span>" +"<label for='name' style= 'padding-right:10px; padding-left:30px;'> State: </label>" + "<span style='font-weight:bold;'>"+state+ "</span> <label for='name' style= 'padding-right:10px;padding-left:30px;'> Zip Code: </label>" + "<span style='font-weight:bold;'>"+zip+ "</span></div>"+ "<div class='form-group'><label for='name' style= 'padding-right:10px;'> Phone Number: </label>" + "<span style='font-weight:bold;'>"+ phone + "</span>"+"<label for='name' style= 'padding-right:10px; padding-left:30px;'> Email: </label>" + "<span style='font-weight:bold;'>"+email+ "</span></div>";
}

function loadFun() {
	getValues();
	loadInfo();
	
}

function getCurrentValues(){
	if (agegroup==0){
		pFname=document.getElementById("pFname").value;
		pLname=document.getElementById("pLname").value;
		pInit=document.getElementById("pinitials").value;
	}

	appInit=document.getElementById("initials").value;
    if(document.getElementById("waiver-agree").checked)	{
		agree=true;
	}
}




function validateWaiver(){
	
	var ret=true;
	getCurrentValues();
	if(agegroup==0) {
		 if(!pFname){
			document.getElementById("l3").style.color="red";		
		ret=false;
		} else {
			document.getElementById("l3").style.color="black";		
		}
	
		if(!pLname){
			document.getElementById("l4").style.color="red";		
			ret=false;
		} else {
			document.getElementById("l4").style.color="black";		
		}
	
	
		if (!pInit) {
			document.getElementById("l2").style.color="red";
			ret=false;
		} else {	
			document.getElementById("l2").style.color="black";		
		}
	
	}
	
	if(agree==false) {
	    document.getElementById("l0").style.color="red";
		ret=false;
	} else {
	    document.getElementById("l0").style.color="black";		
	}
	
		if (!appInit) {
	    document.getElementById("l1").style.color="red";		
		ret=false;
	} else {
	    document.getElementById("l1").style.color="black";		
	}
	
  
	return ret;
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

function submitDataU(){
 
	var ret1 = validateWaiver();
	var age1 = getAge();
	console.log(fname);
	if (ret1==true){
		var userId=fname+lname;

		firebase.database().ref('Volunteers/under18/'+userId).set({
		timestamp:Date(),
		firstname:fname,
		lastname:lname,
		Age: age1,
		address1:add1,
		address2:add2,
		City:city,
		State:state,
		ZipCode:zip,
		DoB:dob,
		Phone:phone,
		Email:email,
		FoodSort:foodsort,
		ToySort:toysort,
		Delivery:delivery,
		Volunteer:volunteer,
		Info:additional,
		parentFirstName: pFname,
		parentLastName: pLname,
		Initials:appInit,
		parentInitials:pInit
		});
		
	console.log("success");
	window.location.href="thankyou.html?fname="+fname;
	}
}

function submitDataO(){

	var ret1 = validateWaiver();
	age2 = getAge();
	console.log(fname);
	if (ret1==true){
		var userId=fname+lname;
		firebase.database().ref('Volunteers/over18/'+userId).set({
		timestamp:Date(),
		firstname:fname,
		lastname:lname,
		Age: age2,
		address1:add1,
		address2:add2,
		City:city,
		State:state,
		ZipCode:zip,
		DoB:dob,
		Phone:phone,
		Email:email,
		FoodSort:foodsort,
		ToySort:toysort,
		Delivery:delivery,
		Volunteer:volunteer,
		Info:additional,
		Initials:appInit
		});	
		
		console.log("success");
		window.location.href="thankyou.html?fname="+fname;
	}
}

function getName(){
	var name1 = getQueries("fname");
	document.getElementById("thank").innerHTML="Hi "+ name1 + "!";
	
}

function newApplication(){
	window.location.href="index.html";
}
