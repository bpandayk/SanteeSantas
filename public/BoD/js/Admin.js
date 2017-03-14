var bFname;
var bLname;
var bEmail;
var bPhone;
var bPass1;
var bPass2;



//function to display signup form the new BOD memebers.
function displaysignUpBOD(){
  console.log("I am here");
	var html = '<div class="panel panel-primary">'+
  					 '<div class="panel-heading"><h4 id="header">Add Members</h4></div>'+
  					 	'<div class="Signup" style="padding: 20px 20px 20px 20px;">'+
            	  '<div class="form-group">'+
								' <label for="Lname" id="bl1">First Name</label>'+
								' <input type="text" class="form-control" id="bFname" >'		+					
							 ' </div>'+
            	  '<div class="form-group">'+
								' <label for="Lname"  id="bl2">Last Name</label>'+
								' <input type="text" class="form-control" id="bLname" >'		+					
							 ' </div>	'+
            	  '<div class="form-group">'+
								' <label for="Lname"  id="bl3">Phone</label>'+
								' <input type="number" class="form-control" id="bPhone" >'		+					
							 ' </div>	'+
            	  '<div class="form-group">'+
								' <label for="Lname"  id="bl4">Email</label>'+
								' <input type="email" class="form-control" id="bEmail" >'		+					
							 ' </div>	'+
            	  '<div class="form-group">'+
								' <label for="Lname"  id="bl5">Password</label>'+
								' <input type="password" class="form-control" id="bPass1" >'		+					
							 ' </div>	'+
            	  '<div class="form-group">'+
								' <label for="Lname"  id="bl6">Confirm Password</label>'+
								' <input type="password" class="form-control" id="bPass2" >'		+					
							 ' </div>	'+
            	  '<div class="form-group">'+
								'<input type="button" class="btn btn-primary btn-lg " value="Sign Up" onclick="signUpBOD()">'	+					
							 ' </div>	'+
             '</div></div>';
   document.getElementById("insertWaiver").innerHTML=" ";
   document.getElementById("insertDom").innerHTML=html;

}

function validateBODForm(){
  var ret = true;
	bFname = document.getElementById("bFname").value;
	bLname = document.getElementById("bLname").value;
	bPhone = document.getElementById("bPhone").value;
	bEmail = document.getElementById("bEmail").value;
	bPass1 = document.getElementById("bPass1").value;
	bPass2 = document.getElementById("bPass2").value;

  if(!bFname){
    document.getElementById("bl1").style.color="red";
    ret=false;
  } else {
    document.getElementById("bl1").style.color="black";
  }

  if(!bLname){
    document.getElementById("bl2").style.color="red";
    ret=false;
  } else {
    document.getElementById("bl2").style.color="black";
  }

  if(!bPhone){
    document.getElementById("bl3").style.color="red";
    ret=false;
  } else {
    document.getElementById("bl3").style.color="black";
  }

  if(!bEmail){
    document.getElementById("bl4").style.color="red";
    ret=false;
  } else {
    document.getElementById("bl4").style.color="black";
  }

  if(!bPass1){
    document.getElementById("bl5").style.color="red";
    ret=false;
  } else {
    document.getElementById("bl5").style.color="black";
  }

  if(!bPass2){
    document.getElementById("bl6").style.color="red";
    ret=false;
  } else {
    document.getElementById("bl6").style.color="black";
  }

  if(ret) {
    if(bPass1 != bPass2){
     document.getElementById("bl6").style.color="red";
     document.getElementById("bl5").style.color="red";
     ret=false;
    } else {
     document.getElementById("bl6").style.color="black";
     document.getElementById("bl5").style.color="black";
    }
  }

  return ret;

}

//function to signup
function signUpBOD(){
  var second = firebase.initializeApp(config, "Secondary");
	var ret = validateBODForm();
  if(ret){
		second.auth().createUserWithEmailAndPassword(bEmail, bPass1).then(function(){
    console.log("Successful");
    var usr = second.auth().currentUser;
    if(usr!= null) {
			usr.updateProfile({
				displayName: bFname+" "+bLname
			});
    }
    
    bFname=bFname.toUpperCase();
    bLname=bLname.toUpperCase();
    var userId= bFname+bLname;
    
		firebase.database().ref('BOD/'+userId).set({
			timestamp:Date(),
			firstname:bFname,
			lastname:bLname,
			Phone:bPhone,
			Email:bEmail,
		});

		firebase.auth().sendPasswordResetEmail(bEmail).then(function() {
  		// Email sent.
		}, function(error) {
  		// An error happened.
		});
		
    
    displayMembersBOD();
		second.auth().signOut();
    

 	 }).catch(function(error) {
 	 	 var errorCode = error.code;
   	 var errorMessage = error.message;
   	 console.log(errorCode+ ":"+errorMessage);
		});
  }
}



function displayMembersBOD(){
	var panel = '<div class="panel panel-primary">'+
  					'<div class="panel-heading"><h3 id="header">Board Of Directors</h3></div>'+
  					'<table class="table table-hover table-bordered" style="position:relative; overflow:scroll;">'+
             '<tr>'+
              '<th>#</th>'+
              '<th>Name</th>'+
              '<th>Phone</th>'+
              '<th>Email</th>'+
              '<th>Misc</th>'+
             '</tr>';
  console.log("yaha ayo");
	return firebase.database().ref('/BOD').once('value').then(function(snapshot) {
  		var data = snapshot.val();
      var key = Object.keys(data);
      var count=1;

      for (i in key) {
		    var temp = '<tr>'+
									 '<td>'+count+'</td>'+
									 '<td>'+data[key[i]].firstname + " "+ data[key[i]].lastname+'</td>'+
									 '<td>'+data[key[i]].Phone+'</td>'+
									 '<td>'+data[key[i]].Email+'</td>'+
									 '<td>#</td>'+
									 '</tr>';
				panel = panel+temp;
				count++;
			}

	panel = panel + '</table></div>';
  document.getElementById("insertDom").innerHTML=panel;
	});

}









