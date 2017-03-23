var email;
var pass;

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDzNFZIpou2Rag_5zJwiR0nZNJxvxH7YEo",
    authDomain: "santeesanta-c540f.firebaseapp.com",
    databaseURL: "https://santeesanta-c540f.firebaseio.com",
    storageBucket: "santeesanta-c540f.appspot.com",
    messagingSenderId: "168894068507"
  };
  firebase.initializeApp(config);

function validate(){
  var val=true;
  email=document.getElementById("Email1").value;
  pass=document.getElementById("Password1").value;

  if(!email || !pass){
    val= false;
  }

  return val;
}


function signIn(){
	var ret = validate();
  
  if(ret){

		firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {

  		var errorCode = error.code;
  		var errorMessage = error.message;
			document.getElementById("err").innerHTML=errorCode+":"+errorMessage;
		});

    
  } else {
    document.getElementById("err").innerHTML="Email address or Password missing!";
  }

}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var uid = user.uid;
    window.location.href="index.html";

  } else {
    
  }
});
