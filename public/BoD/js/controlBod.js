var searchName;
var minage;
var maxage;
var foodsort="false";
var toysort="false";
var delivery="false";
var sub;  //for email
var body; //for email
var emailList=[];
var headTo = "";
var printDet;
var printWaiv;

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA6JtrlqORiTv0N8UidMQ3L2kk9Jz1o_g8",
    authDomain: "santeesanta-c540f.firebaseapp.com",
    databaseURL: "https://santeesanta-c540f.firebaseio.com",
    storageBucket: "santeesanta-c540f.appspot.com",
    messagingSenderId: "168894068507"
  };
  firebase.initializeApp(config);

var client_ID = '168894068507-9hidggcbih727gp3j5avvibk1n8ef65v.apps.googleusercontent.com';
var Scopes = 'https://www.googleapis.com/auth/gmail.readonly '+
        'https://www.googleapis.com/auth/gmail.send';

var apiKey ='AIzaSyDzNFZIpou2Rag_5zJwiR0nZNJxvxH7YEo';  
var database = firebase.database();
var date1 = new Date();
var year = date1.getFullYear();
var pdfdoc=new jsPDF('l','pt','letter');


var specialElementHandlers = {
    '#bypassme': function (element, renderer) {
        return true;
    }
};

		var buttonT = '<div><input type="button" class="btn btn-primary btn-lg " value="Print/Save" onclick="ListAll(1)">'+
		'<div style="float:right;"><input type="button" class="btn btn-primary btn-lg " value="Send Email" data-toggle="modal" data-target="#myModal" onclick="putToEmail()"></div></div>';

var user = localStorage.getItem("firebase:authUser:AIzaSyA6JtrlqORiTv0N8UidMQ3L2kk9Jz1o_g8:[DEFAULT]");
var parser = JSON.parse(user);
var UID = parser.uid;
var username = parser.displayName;
var email=parser.email;
console.log(UID);



var panel = '<div class="panel panel-primary">'+
  					'<div class="panel-heading"><h3 id="header">Volunteers List for '+year+'</h3></div>'+
  					'<table class="table table-hover table-bordered" style="position:relative; overflow:scroll;">'+
             '<tr>'+
              '<th>#</th>'+
              '<th>Name</th>'+
              '<th>Age</th>'+
              '<th>Food Sorting</th>'+
              '<th>Toy Sorting</th>'+
              '<th>Delivery</th>'+
              '<th>Mailer</th>'+
              '<th>Application Intake</th>'+
              '<th>Other Interests</th>'+
             '</tr>';
			 
var panel2 = '<div id="tabled"><table class="table" >'+
             '<tr>'+
              '<th>#</th>'+
              '<th>Name</th>'+
              '<th>Age</th>'+
              '<th>Food Sorting</th>'+
              '<th>Toy Sorting</th>'+
              '<th>Delivery</th>'+
              '<th>Mailer</th>'+
              '<th>Application Intake</th>'+
              '<th>Other Interests</th>'+
             '</tr>';


var end= '</table></div>';




function checkUser(){
	if (UID=="gNHEHWUZ4ySaw08S2RvDsaFx47q2") {
		//Display options
		var dom = '<label for="search"><hr/><h2>Admin Menu</h2></label>'+
									'<div class="form-group">'+
									'<input class="btn btn-primary btn-lg btn-block" type="submit" value="Volunteers" onclick="ListAll(0)" style="width:60%"></button>'+ 								
								'</div>'+
                '<div class="form-group">'+
									'<input class="btn btn-primary btn-lg btn-block" type="submit" value="Add members" onclick="displaysignUpBOD()" style="width:60%"></button>'+ 								
								'</div>'+

								'<div class="form-group">'+
									'<input class="btn btn-primary btn-lg btn-block" type="submit" value="View members" onclick="displayMembersBOD()" style="width:60%"></button> '+								
								'</div>'+
								'<div class="form-group">'+
									'<input class="btn btn-primary btn-lg btn-block" type="submit" value="Download Waivers" onclick="printAllWaivers()" style="width:60%"></button> '+								
								'</div>'  ;

    document.getElementById("admindom").innerHTML=dom;
    ListAll(0);

	} else {
		var dom = '<label for="search"><hr/><h2>Admin Menu</h2></label>'+
									'<div class="form-group">'+
									'<input class="btn btn-primary btn-lg btn-block" type="submit" value="Volunteers" onclick="ListAll(0)" style="width:60%"></button>'+ 								
								'</div>'+
								'<div class="form-group">'+
									'<input class="btn btn-primary btn-lg btn-block" type="submit" value="View members" onclick="displayMembersBOD()" style="width:60%"></button> '+								
								'</div>';
    document.getElementById("admindom").innerHTML=dom;
  	ListAll(0);
  }
}

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

	if(!minage){
    minage=0;
  }

  if(!maxage){
    maxage=120;
  }

  ListByParam(searchName,minage, maxage, foodsort, toysort, delivery);
    
}



function DisplayTable(data,temp){
	var name, age,toyval,foodval,deliveryval,mailerval,applicationval,otherval, toy, food, delivery ,mailer,application,other;
    var key = Object.keys(data);
    var display = panel;
    var count=1;
     emailList=[];

    for(i in key) {
	  name = data[key[i]].firstname +" "+ data[key[i]].lastname;
      age=data[key[i]].Age;
	  
	  foodval=data[key[i]].FoodSort;
	  toyval=data[key[i]].ToySort;
	  deliveryval=data[key[i]].Delivery;
	  otherval=data[key[i]].Other_interests;
	  mailerval=data[key[i]].Mailer;
	  applicationval=data[key[i]].Application_intake;
    emailList.push(data[key[i]].Email);
	 
	  
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


			if(otherval == "true"){
				other='&#10004';
			}else{
				other='<span style="color:red">&#10008</span>';
			}

			if(mailerval == "true"){
				mailer='&#10004';
			}else{
				mailer='<span style="color:red">&#10008</span>';
			}
	
			if(applicationval == "true"){
				application='&#10004';
			}else{
				application='<span style="color:red">&#10008</span>';
			}

     
       
      var addhtml = '<tr onclick="getDetail(\''+key[i]+'\')">'+
                    '<td>'+count+'</td>'+
                    '<td>'+name +'</td>'+
                    '<td>'+age +'</td>'+
                    '<td>'+food +'</td>'+
                    '<td>'+toy +'</td>'+
                    '<td>'+delivery +'</td>'+
                    '<td>'+mailer +'</td>'+
                    '<td>'+application +'</td>'+
                    '<td>'+other +'</td>'+
										'</tr>';
     
 			display = display + addhtml;
      count++;
      
    }   
	//var temp = '<div><input type="button" class="btn btn-primary btn-lg " value="View Waiver" onclick="printList(\''+data+'\')"></div>';

    display=display+(end+temp);
    document.getElementById("insertDom").innerHTML=display;
}


function PrintTable(data, pORs){    //pORs-1 to save in pdf 0 to print
	var name, age,toyval,foodval,deliveryval,mailerval,applicationval,otherval, toy, food, delivery, mailer,application,other;
    var key = Object.keys(data);
    var display = panel2;
    var count=1;


    for(i in key) {
	  name = data[key[i]].firstname +" "+ data[key[i]].lastname;
      age=data[key[i]].Age;
	  
	  foodval=data[key[i]].FoodSort;
	  toyval=data[key[i]].ToySort;
	  deliveryval=data[key[i]].Delivery;
	  other=data[key[i]].Other_interests;
	  mailer=data[key[i]].Mailer;
	  application=data[key[i]].Application_intake;
	 
	  
      if(foodval == "true"){
        food='Yes';
      }else{
        food='No';
      }

      if(toyval == "true"){
        toy='Yes';
      }else{
        toy='No';
      }

      if(deliveryval == "true"){
        delivery='Yes';
      }else{
        delivery='No';
      }
     
      if(mailerval == "true"){
        mailer='Yes';
      }else{
        mailer='No';
      }

      if(applicationval == "true"){
        application='Yes';
      }else{
        application='No';
      }

      if(otherval == "true"){
        other='Yes';
      }else{
        other='No';
      }
     
       
      var addhtml = '<tr onclick="getDetail(\''+key[i]+'\')">'+
                    '<td>'+count+'</td>'+
                    '<td>'+name +'</td>'+
                    '<td>'+age +'</td>'+
                    '<td>'+food +'</td>'+
                    '<td>'+toy +'</td>'+
                    '<td>'+delivery +'</td>'+
                    '<td>'+mailer +'</td>'+
                    '<td>'+application +'</td>'+
                    '<td>'+other +'</td>'+
										'</tr>';
     
 			display = display + addhtml;
      count++;
      
    }   
    var par = document.getElementById("mainrow");
		var child = document.getElementById("leftcol");
		par.removeChild(child);
    display=display+(end);
    document.getElementById("insertDom").innerHTML=display;
	if(pORs==1){
 		window.print();
    window.location.href="index.html";
		//ListAll(0);
    //document.getElementById("mainrow").innerHTML=leftCol + document.getElementById("mainrow").innerHTML;


 	}
	if(pORs==2){
		pdfdoc.fromHTML($('#tabled')[0],15,15,{
			'width':200,
			'elementHandlers': specialElementHandlers
		});
		pdfdoc.save("table.pdf");
    window.location.href="index.html";
    //document.getElementById("mainrow").innerHTML+=leftCol;
    //ListAll(0);
	}
	
}





function ListAll(opt){

	return firebase.database().ref('/Volunteers').once('value').then(function(snapshot) {
  	var data = snapshot.val();
	if (opt==0) {

		DisplayTable(data,buttonT);
	}
    if (opt==1 || opt==2 ){PrintTable(data, opt);}
	});

}




function ListByParam(name,minage, maxage, foodsort, toysort, delivery){

	var ref = firebase.database().ref("Volunteers");

	if((foodsort=='false') && (toysort=='false') && (delivery=='false') && !name && minage==0 && maxage==120){
   console.log("Nothing Selected");

  } else if((foodsort=='false') && (toysort=='false') && (delivery=='false') && minage==0 && maxage==120){
    console.log("name ma ayo");
    if(name){
        name = name.toUpperCase();
    		var spname = name.split(" ");
        console.log(spname[0]);
 	   		ref.once("value", function(snapshot) {
					var data=snapshot.val();
        	var list=[];
					var key = Object.keys(data);       		 
					if (spname.length == 1){
          for (i in key){
						if ( data[key[i]].firstname==name){
     					list.push(data[key[i]]);
       	    } else if(data[key[i]].lastname==name){
							list.push(data[key[i]]);         	
            }          
          
          }
				}else if(spname.length >=2){
           for (i in key){   
					 	if ( data[key[i]].firstname==spname[0] && data[key[i]].lastname==spname[1]){
     					list.push(data[key[i]]);
       	    }else if ( data[key[i]].firstname==spname[0]){
     					list.push(data[key[i]]);
       	    } else if (data[key[i]].lastname==spname[1]){
     					list.push(data[key[i]]);
       	    }  
           }
        }
					DisplayTable(list, buttonT);
        });	

  	}

  } else if((foodsort=='false') && (toysort=='false') && (delivery=='false') && !name){
    if (minage!=0 || maxage!=120){
    //var name1 = name.toUpperCase();
 	    ref.orderByChild("Age").startAt(parseInt(minage)).endAt(parseInt(maxage)).on("value", function(snapshot) {
			var data=snapshot.val();
			DisplayTable(data, buttonT);
        });
    }
  } else if(minage==0 && maxage==120 && !name){
    if(foodsort=='true' || toysort=='true' || delivery=='true'){

      if(foodsort=='true' && toysort=='false' && delivery=='false'){
 	   	 ref.orderByChild("FoodSort").equalTo(foodsort).on("value", function(snapshot) {
					var data=snapshot.val();
					DisplayTable(data, buttonT);
        });				 


      } else if(foodsort=='false' && toysort=='true' && delivery=='false'){
 	   	 ref.orderByChild("ToySort").equalTo(toysort).on("value", function(snapshot) {
					var data=snapshot.val();
					DisplayTable(data, buttonT);
        });


      } else if(foodsort=='false' && toysort=='false' && delivery=='true'){
 	   	 ref.orderByChild("Delivery").equalTo(delivery).on("value", function(snapshot) {
					var data=snapshot.val();
					DisplayTable(data, buttonT);
        });

      } else {
					ref.once('value').then(function(snapshot) {
  				var data = snapshot.val();
			 	  var key = Object.keys(data);
       	  var list=[];

       	  for(i in key){
						if ( data[key[i]].FoodSort==foodsort && data[key[i]].ToySort==toysort && data[key[i]].Delivery==delivery){
     					list.push(data[key[i]]);
       	   }
       	  }
       	  DisplayTable(list, buttonT);
      	});
      }
    }
  } else {
 			ref.once('value').then(function(snapshot) {
  			var data = snapshot.val();
			 	var key = Object.keys(data);
       	var list=[];

       /* if(foodsort=='true' && toysort=='false' && delivery=='false'){
       		for(i in key){
						if ( data[key[i]].FoodSort==foodsort && data[key[i]].Age >= minage && data[key[i]].Age <= maxage){
     					list.push(data[key[i]]);
       			}
       		}

					
        } else if(foodsort=='false' && toysort=='true' && delivery=='false'){
       		for(i in key){
						if (data[key[i]].ToySort==toysort && data[key[i]].Age >= minage && data[key[i]].Age <= maxage){
     					list.push(data[key[i]]);
       			}
       		}
					
        } else if(foodsort=='false' && toysort=='false' && delivery=='true'){
       		for(i in key){
						if (data[key[i]].Delivery==delivery && data[key[i]].Age >= minage && data[key[i]].Age <= maxage){
     					list.push(data[key[i]]);
       			}
       		}
					
        } else{*/
       		for(i in key){
						if ( data[key[i]].FoodSort==foodsort && data[key[i]].ToySort==toysort && data[key[i]].Delivery==delivery && data[key[i]].Age >= minage && data[key[i]].Age <= maxage){
     					list.push(data[key[i]]);
       			}
       		}

					
       // }

      	 	DisplayTable(list, buttonT);
     });   
  }
}



function getDetail(alias){
	var buttonT2 = '<div><input type="button" class="btn btn-primary btn-lg " value="Print/Save" onclick="printWaiver()">'+
	'<div style="float:right;"></div>';
	var ref = firebase.database().ref("Volunteers/"+alias);
	ref.once('value').then(function(snapshot){
    var ageGroup=1;
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
    var val4=data.Application_intake;
    var val5=data.Mailer;
    var val6=data.other_interests;

	    var food,toy,delivery,application,mailer,other;
	  
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

		if(val4 == "true"){
			mailer='&#10004';
		}else{
			mailer='<span style="color:red">&#10008</span>';
		}

		if(val5 == "true"){
			application='&#10004';
		}else{
			application='<span style="color:red">&#10008</span>';
		}

		if(val6 == "true"){
			other='&#10004';
		}else{
			other='<span style="color:red">&#10008</span>';
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
        '</tr><tr>'+	
				'<td> Mailer </td>'+
				'<td>'+mailer+'</td>'+
				'</tr><tr>'+
				'<td> Application Intake </td>'+
				'<td>'+application+'</td>'+
				'</tr><tr>'+
				'<td> Other Interest </td>'+
				'<td>'+other+'</td>'+	
				'</tr>';			
		
		
		panel=panel+temp;

    if(data.Age < 18){
		temp = '<tr>'+
				'<td> Parents/Guardian Name </td>'+
				'<td>'+data.parentFirstName+ " " +data.parentLastName+'</td>'+
				'</tr>';	
    ageGroup=0;
		panel=panel+temp; 

    }
		
        if(data.Info!=" "){
			temp = '<tr>'+
				'<td> Additional Questions </td>'+
				'<td>'+data.Info+'</td>'+
				'</tr>';	
		panel=panel+temp;
		}  		

    printDet = panel+end;
    temp = '<div id="viewbutton"><input type="button" class="btn btn-primary btn-lg " value="View Waiver" onclick="viewWaiver()" ></div>';
		panel=panel+(end+temp);
            
    document.getElementById("insertDom").innerHTML=panel;	

    if (ageGroup==1){
       var waiver=	'<div class="panel panel-primary">'+
  					  '<div class="panel-heading"><h3 id="header">Waiver</h3></div>'+
             ' <div class="panel-body">'+'<div id = "f1">  '+       
							'<h2><span>Adult Volunteer Waiver Form</span></h2> '+ '<h4><span clasee="label">WAIVER, RELEASE OF ALL CLAIMS, AND HOLD HARMLESS AGREEMENT FOR ADULT PARTICIPATION IN SANTEE 									SANTAS FOUNDATION PROGRAMS.</span></h4></div>'+
							'<div style="border:3px solid #73AD21; padding:10px;">'+ firstpart+       
 							'</div>'+
							'<label for="photo"><h3>Photo Release</h3></label>'+
             '<div style="border:3px solid #73AD21; padding:10px;">'+ secondpart+ adult+ 
              '</div>'+
            '<div class="form-group ">'+
              '<div class="checkbox">'+
                '<label for="agg1">'+
                  '<input type="checkbox" id="waiver-agree" checked disabled> <span id="l0">'+
                  'Click here to indicate that you agree to our terms and that you have read our Volunteers Waivers and Photo Release terms.</span>'+
                '</label>'+
              '</div></div></div></div>' +
							'<div><div class="form-group">'+
              '<label for="initials" id="l1">Applicant Initial: '+ data.Initials+'</label>'+
							
            '</div>'+
              '<div class="form-group"><label for="name" style= "padding-right:10px;"> Applicant Name: </label><span style="font-weight:bold;">'+data.firstname+ ' ' + data.lastname +
 '</span> </div>'+
'<div class="form-group"><label for="name" style= "padding-right:10px;"> Applicant Address: </label>' + '<span style="font-weight:bold;">'+data.address1 + '&nbsp&nbsp' +data.address2+
'</span> </div>'+
'<div class="form-group"><label for="name" style= "padding-right:10px;"> City: </label> <span style="font-weight:bold;">'+data.City+
 '</span><label for="name" style= "padding-right:10px; padding-left:30px;"> State: </label><span style="font-weight:bold;">'+data.State+ 
'</span> <label for="name" style= "padding-right:10px;padding-left:30px;"> Zip Code: ' + data.ZipCode +'</label>'+
' </span></div>'+
 '<div class="form-group"><label for="name" style= "padding-right:10px;"> Phone Number:' +
'</label><span style="font-weight:bold;">'+ data.Phone + '</span><label for="name" style= "padding-right:10px; padding-left:30px;"> Email: </label>" + "<span style="font-weight:bold;">'+
data.Email+ '</span></div></div>';



    printWaiv=waiver;

    document.getElementById("insertWaiver").innerHTML= waiver+buttonT2;
	  document.getElementById("insertWaiver").style.position="fixed";
  
    }





    if(ageGroup==0){
       var waiver=	'<div class="panel panel-primary">'+
  					  '<div class="panel-heading"><h3 id="header">Waiver</h3></div>'+
             ' <div class="panel-body">'+'<div id = "f1">'+       
							'<h2><span>Child(18 and under) Volunteer Waiver Form</span></h2> '+ '<h4><span clasee="label">WAIVER, RELEASE OF ALL CLAIMS, AND HOLD HARMLESS AGREEMENT FOR PERSON UNDER  18 YEARS OF AGE PARTICIPATION IN SANTEE SANTAS FOUNDATION PROGRAMS.</span></h4></div>'+
							'<div style="border:3px solid #73AD21; padding:10px;">'+ firstpart+       
 							'</div>'+
							'<label for="photo"><h3>Photo Release</h3></label>'+
             '<div style="border:3px solid #73AD21; padding:10px;">'+ secondpart+ adult+  
              '</div>'+
            '<div class="form-group ">'+
              '<div class="checkbox">'+
                '<label for="agg1">'+
                  '<input type="checkbox" id="waiver-agree" checked disabled> <span id="l0">'+
                  'Click here to indicate that you agree to our terms and that you have read our Volunteers Waivers and Photo Release terms.</span>'+
                '</label>'+
              '</div>'+
            '</div></div></div>'+
'<div> <div class="form-group "><div class="form-inline">'+
              '<label for="initials" id="l1">Applicant Initial: '+ data.Initials+'</label>'+
							'<label for="initials" style="padding-left:20px" id="l2">Parent/Guardian Initial: '+data.parentInitials+'</label>'+
            '</div></div>'+
              '<div class="form-group"><label for="name" style= "padding-right:10px;"> Applicant Name: </label><span style="font-weight:bold;">'+data.firstname+ ' ' + data.lastname +
 '</span> </div>'+
'<div class="form-group"><label for="name" style= "padding-right:10px;"> Applicant Guardian/Parent: </label><span style="font-weight:bold;">'+data.parentFirstName+ ' '+ data.parentLastName+'</span></div>'+
'<div class="form-group"><label for="name" style= "padding-right:10px;"> Applicant Address: </label>' + '<span style="font-weight:bold;">'+data.address1 + '&nbsp&nbsp' +data.address2+
'</span> </div>'+
'<div class="form-group"><label for="name" style= "padding-right:10px;"> City: </label> <span style="font-weight:bold;">'+data.City+
 '</span><label for="name" style= "padding-right:10px; padding-left:30px;"> State: </label><span style="font-weight:bold;">'+data.State+ 
'</span> <label for="name" style= "padding-right:10px;padding-left:30px;"> Zip Code: ' + data.ZipCode +'</label>'+
' </span></div>'+
 '<div class="form-group"><label for="name" style= "padding-right:10px;"> Phone Number:' +
'</label><span style="font-weight:bold;">'+ data.Phone + '</span><label for="name" style= "padding-right:10px; padding-left:30px;"> Email: </label>" + "<span style="font-weight:bold;">'+
data.Email+ '</span></div></div>';


    	 printWaiv=waiver;
   		 document.getElementById("insertWaiver").innerHTML=waiver+buttonT2;
       document.getElementById("insertWaiver").style.position="fixed";
   }

 
	});
}


function viewWaiver(){
      document.getElementById("insertWaiver").style.position="static";
      document.getElementById("insertWaiver").style.visibility="visible";
      document.getElementById("viewbutton").innerHTML='<input type="button" class="btn btn-primary btn-lg " value="Hide Waiver" onclick="hideWaiver()" >';
} 


function hideWaiver(){
      document.getElementById("insertWaiver").style.position="fixed";
      document.getElementById("insertWaiver").style.visibility="hidden";
      document.getElementById("viewbutton").innerHTML='<input type="button" class="btn btn-primary btn-lg " value=" View Waiver" onclick="viewWaiver()" >';
} 


function printWaiver(){
  var original = document.body.innerHTML;
    var par = document.getElementById("mainrow");
		var child = document.getElementById("leftcol");
		par.removeChild(child);
  document.getElementById("insertDom").innerHTML = (printDet);
  document.getElementById("insertWaiver").innerHTML = printWaiv;
  window.print();
  document.body.innerHTML = original;
}


/* ----------------------- Functions to send email -----------------------*/

function sendEmail(){

	function initalize() {
		console.log("I am here");	
  	gapi.auth.authorize({
   		client_id: client_ID,
    	scope: Scopes,
    	immediate: false
  	}, handleAuthResult);

	}	

	function handleAuthResult(authResult) {

 	  if (authResult && !authResult.error) {
   	 loadGmailApi();
  	}
	}

	function loadGmailApi() {
  	gapi.client.load('gmail', 'v1', function() {
  	  console.log("Gmail APi loaded");
		  sendToAll();
  	});
	}


	function validateEmail(){
    var ret = true;
    sub = document.getElementById("subjectEmail").value;
	  body = document.getElementById("bodyEmail").value;
    console.log(sub); console.log(body);
    if (!sub){
			document.getElementById("label1").style.color = "red";			
			ret = false;
    } else {
			document.getElementById("label1").style.color = "black";
		}

		if(!body) {
			document.getElementById("label2").style.color = "red";
			ret = false;
    } else {
			document.getElementById("label2").style.color = "black";
		}
     
		return ret;
  }



	function sendInit(){
    if(headTo!=" "){
			document.getElementById("sendEmailbt").disabled = false;
			var ret = validateEmail();
    	console.log(ret);
    
   	 if(ret){

	 			gapi.client.setApiKey(apiKey); // your variable for apiKey
   	 		window.setTimeout(initalize,1);			
   	  } 
		}
  }


  function sendToAll(){    
		var head = { 'To': headTo,
									'Subject' : sub};
    
    var email="From: 'me'\r\n";

    for( var i in head){
			email += i += ':'+head[i]+'\r\n';
    }

    email += "\r\n" + body;
    console.log(window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_'));

    var sentRequest = gapi.client.gmail.users.messages.send({
			'userId':'me',
			'resource':{ 
					'raw':window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
				}

    });
    

    sentRequest.execute(function(){
      console.log(arguments);
			document.getElementById("mssg").innerHTML="<span style='color:red;'>Email sent successfully. Please click Close to Exit. </span>";
			document.getElementById("sendEmailbt").disabled = true;
    });
  }

  sendInit();

}


  function putToEmail(){
		headTo=" ";
		for (i in emailList){
			if (emailList[i] != " ")
				headTo+= (emailList[i]+',');
    }

    if (headTo!= " "){
				document.getElementById("puttoemail").innerHTML='<label for="To">To</label><textarea class="form-control" id="ToEmail" placeholder='+headTo+' disabled></textarea>';
				document.getElementById("sendEmailbt").disabled = false;
    } else {
				document.getElementById("puttoemail").innerHTML="<span style='color:red'>Email List is empty.</span>";
				document.getElementById("sendEmailbt").disabled = true;
    }
  }

/*------------------------------------------------------------------------*/
function printAllWaivers(){


    var display = panel;
    var count=1;
	var ref = firebase.database().ref("Volunteers/");
	ref.once('value').then(function(snapshot){
    var data = snapshot.val();
		var key = Object.keys(data);
    var ageGroup=1;
		var end='</table></div>';
		var temp;
    var datadetail=" ";
    var dataWaiver=" ";
    

    for (i in key){
		var panel = '<div class="panel panel-primary">'+
  					'<div class="panel-heading"><h3 id="header">Details of '+data[key[i]].firstname+" "+data[key[i]].lastname+
					'</h3></div>'+
  					'<table class="table table-hover table-bordered">'+
					'<tr>'+
					'<td> Full Name </td>'+
					'<td>'+data[key[i]].firstname+" "+data[key[i]].lastname+'</td>'+
					'</tr>'+
					'<tr>'+
					'<td> Address </td>'+
					'<td>'+data[key[i]].address1+'</td>'+
					'</tr>';
		
		if(data[key[i]].address2!=" "){
			temp=	'<tr>'+
					'<td> Address 2 </td>'+
					'<td>'+data[key[i]].address2+'</td>'+
					'</tr>';
			panel = panel+temp;
		}

		
		temp = 	'<tr>'+
				'<td> City </td>'+
				'<td>'+data[key[i]].City+'</td>'+
				'</tr><tr>'+
				'<td> State </td>'+
				'<td>'+data[key[i]].State+'</td>'+
				'</tr><tr>'+
				'<td> Zip </td>'+
				'<td>'+data[key[i]].ZipCode+'</td>'+	
				'</tr><tr>'+
				'<td> Age </td>'+
				'<td>'+data[key[i]].Age+'</td>'+
				'</tr><tr>'+
				'<td> Date Of Birth </td>'+
				'<td>'+data[key[i]].DoB+'</td>'+
				'</tr>';				
					
		panel=panel+temp;

        if(data.Phone!=" "){
			temp = '<tr>'+
				'<td> Phone </td>'+
				'<td>'+data[key[i]].Phone+'</td>'+
				'</tr>';	
		panel=panel+temp;
		}  		
		
		
        if(data.Email!=" "){
			temp = '<tr>'+
				'<td> Email </td>'+
				'<td>'+data[key[i]].Email+'</td>'+
				'</tr>';	
		panel=panel+temp;
		}  							

		var val1=data[key[i]].FoodSort;
		var val2=data[key[i]].ToySort;
		var val3=data[key[i]].Delivery;
    var val4=data[key[i]].Application_intake;
    var val5=data[key[i]].Mailer;
    var val6=data[key[i]].other_interests;

	    var food,toy,delivery,application,mailer,other;
	  
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

		if(val4 == "true"){
			mailer='&#10004';
		}else{
			mailer='<span style="color:red">&#10008</span>';
		}

		if(val5 == "true"){
			application='&#10004';
		}else{
			application='<span style="color:red">&#10008</span>';
		}

		if(val6 == "true"){
			other='&#10004';
		}else{
			other='<span style="color:red">&#10008</span>';
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
        '</tr><tr>'+	
				'<td> Mailer </td>'+
				'<td>'+mailer+'</td>'+
				'</tr><tr>'+
				'<td> Application Intake </td>'+
				'<td>'+application+'</td>'+
				'</tr><tr>'+
				'<td> Other Interest </td>'+
				'<td>'+other+'</td>'+	
				'</tr>';			
		
		
		panel=panel+temp;

    if(data[key[i]].Age < 18){
		temp = '<tr>'+
				'<td> Parents/Guardian Name </td>'+
				'<td>'+data[key[i]].parentFirstName+ " " +data[key[i]].parentLastName+'</td>'+
				'</tr>';	
    ageGroup=0;
		panel=panel+temp; 

    }
		
        if(data[key[i]].Info!=" "){
			temp = '<tr>'+
				'<td> Additional Questions </td>'+
				'<td>'+data[key[i]].Info+'</td>'+
				'</tr>';	
		panel=panel+temp;
		}  		

    printDet = panel+end;
          


    if (ageGroup==1){
       var waiver=	'<div class="panel panel-primary">'+
  					  '<div class="panel-heading"><h3 id="header">Waiver</h3></div>'+
             ' <div class="panel-body">'+'<div id = "f1">  '+       
							'<h2><span>Adult Volunteer Waiver Form</span></h2> '+ '<h4><span clasee="label">WAIVER, RELEASE OF ALL CLAIMS, AND HOLD HARMLESS AGREEMENT FOR ADULT PARTICIPATION IN SANTEE 									SANTAS FOUNDATION PROGRAMS.</span></h4></div>'+
							'<div style="border:3px solid #73AD21; padding:10px;">'+ firstpart+       
 							'</div>'+
							'<label for="photo"><h3>Photo Release</h3></label>'+
             '<div style="border:3px solid #73AD21; padding:10px;">'+ secondpart+ adult+ 
              '</div>'+
            '<div class="form-group ">'+
              '<div class="checkbox">'+
                '<label for="agg1">'+
                  '<input type="checkbox" id="waiver-agree" checked disabled> <span id="l0">'+
                  'Click here to indicate that you agree to our terms and that you have read our Volunteers Waivers and Photo Release terms.</span>'+
                '</label>'+
              '</div></div></div></div>' +
							'<div><div class="form-group">'+
              '<label for="initials" id="l1">Applicant Initial: '+ data[key[i]].Initials+'</label>'+
							
            '</div>'+
              '<div class="form-group"><label for="name" style= "padding-right:10px;"> Applicant Name: </label><span style="font-weight:bold;">'+data[key[i]].firstname+ ' ' + data.lastname +
 '</span> </div>'+
'<div class="form-group"><label for="name" style= "padding-right:10px;"> Applicant Address: </label>' + '<span style="font-weight:bold;">'+data[key[i]].address1 + '&nbsp&nbsp' +data[key[i]].address2+
'</span> </div>'+
'<div class="form-group"><label for="name" style= "padding-right:10px;"> City: </label> <span style="font-weight:bold;">'+data[key[i]].City+
 '</span><label for="name" style= "padding-right:10px; padding-left:30px;"> State: </label><span style="font-weight:bold;">'+data[key[i]].State+ 
'</span> <label for="name" style= "padding-right:10px;padding-left:30px;"> Zip Code: ' + data[key[i]].ZipCode +'</label>'+
' </span></div>'+
 '<div class="form-group"><label for="name" style= "padding-right:10px;"> Phone Number:' +
'</label><span style="font-weight:bold;">'+ data[key[i]].Phone + '</span><label for="name" style= "padding-right:10px; padding-left:30px;"> Email: </label>" + "<span style="font-weight:bold;">'+
data[key[i]].Email+ '</span></div></div>';



    printWaiv=waiver;

		}
 

    if(ageGroup==0){
       var waiver=	'<div class="panel panel-primary">'+
  					  '<div class="panel-heading"><h3 id="header">Waiver</h3></div>'+
             ' <div class="panel-body">'+'<div id = "f1">'+       
							'<h2><span>Child(18 and under) Volunteer Waiver Form</span></h2> '+ '<h4><span clasee="label">WAIVER, RELEASE OF ALL CLAIMS, AND HOLD HARMLESS AGREEMENT FOR PERSON UNDER  18 YEARS OF AGE PARTICIPATION IN SANTEE SANTAS FOUNDATION PROGRAMS.</span></h4></div>'+
							'<div style="border:3px solid #73AD21; padding:10px;">'+ firstpart+       
 							'</div>'+
							'<label for="photo"><h3>Photo Release</h3></label>'+
             '<div style="border:3px solid #73AD21; padding:10px;">'+ secondpart+ adult+  
              '</div>'+
            '<div class="form-group ">'+
              '<div class="checkbox">'+
                '<label for="agg1">'+
                  '<input type="checkbox" id="waiver-agree" checked disabled> <span id="l0">'+
                  'Click here to indicate that you agree to our terms and that you have read our Volunteers Waivers and Photo Release terms.</span>'+
                '</label>'+
              '</div>'+
            '</div></div></div>'+
'<div> <div class="form-group "><div class="form-inline">'+
              '<label for="initials" id="l1">Applicant Initial: '+ data[key[i]].Initials+'</label>'+
							'<label for="initials" style="padding-left:20px" id="l2">Parent/Guardian Initial: '+data[key[i]].parentInitials+'</label>'+
            '</div></div>'+
              '<div class="form-group"><label for="name" style= "padding-right:10px;"> Applicant Name: </label><span style="font-weight:bold;">'+data[key[i]].firstname+ ' ' + data.lastname +
 '</span> </div>'+
'<div class="form-group"><label for="name" style= "padding-right:10px;"> Applicant Guardian/Parent: </label><span style="font-weight:bold;">'+data[key[i]].parentFirstName+ ' '+ data.parentLastName+'</span></div>'+
'<div class="form-group"><label for="name" style= "padding-right:10px;"> Applicant Address: </label>' + '<span style="font-weight:bold;">'+data[key[i]].address1 + '&nbsp&nbsp' +data[key[i]].address2+
'</span> </div>'+
'<div class="form-group"><label for="name" style= "padding-right:10px;"> City: </label> <span style="font-weight:bold;">'+data[key[i]].City+
 '</span><label for="name" style= "padding-right:10px; padding-left:30px;"> State: </label><span style="font-weight:bold;">'+data[key[i]].State+ 
'</span> <label for="name" style= "padding-right:10px;padding-left:30px;"> Zip Code: ' + data[key[i]].ZipCode +'</label>'+
' </span></div>'+
 '<div class="form-group"><label for="name" style= "padding-right:10px;"> Phone Number:' +
'</label><span style="font-weight:bold;">'+ data[key[i]].Phone + '</span><label for="name" style= "padding-right:10px; padding-left:30px;"> Email: </label>" + "<span style="font-weight:bold;">'+
data[key[i]].Email+ '</span></div></div>';

   		 printWaiv=waiver;
  	 }
		 printDet =  '<div style="page-break-after:always;">'+printDet+'</div>';
     printWaiv =  '<div style="page-break-after:always;">'+printWaiv+'</div>';
 		 dataWaiver += (printDet + printWaiv);

 	 }
  	var original = document.body.innerHTML;
    var par = document.getElementById("mainrow");
		var child = document.getElementById("leftcol");
		par.removeChild(child);
  	document.getElementById("insertDom").innerHTML = dataWaiver
  	document.getElementById("insertWaiver").innerHTML =" ";
  	window.print();
    document.body.innerHTML = original;

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


 var firstpart='<p> Please Read Carefully!!!</p>'+
               '<p>Please read this form carefully and be aware that, in signing up and participating in the Santee Santas Foundation Programs, you will be waiving and releasing all claims or injuries arising out of these programs, that you or the other named participants might sustain. The terms “I”, “me”, and “my” also refer to parents or guardians as well as participants in the programs. In registering for these programs, you are agreeing as follows: As a participant in these programs, I recognize and acknowledge that there are certain risks of physical injury, and I agree to assume the full risk of any injuries, damages, or loss which I may sustain as a result of participating in any manner, in any and all activities connected with or associated with such programs. I further recognize and acknowledge that certain activities, such as loading and unloading packages, involving strenuous exertion are potentially hazardous activities and involve substantial risks of injury. I agree to waive and relinquish any and all claims I may have as a result of participating in these programs against the Santee Santas Foundation, their officers, agents and employees, any and all other participating or cooperating governmental units, any and all independent contractors, and any and all other persons and entities, of whatever nature, that might be directly or indirectly liable for any injuries that I might sustain while participating in these programs. (The parties described in the preceding sentence are referred to as “Released Parties” in the remainder of this Agreement.) I do hereby fully release and discharge the Santee Santas Foundation and the other Released Parties from any and all claims for injuries, damage or loss, which I may have or which may accrue to me on the account of my participation in these programs. I further agree to indemnify, hold harmless and defend the Santee Santas Foundation and any and all other Released Parties, from any and all claims resulting from injuries, damages, and all losses sustained by anyone, and arising out of, connected with, or in any way associated with my conduct and the activities of these programs. I further understand and agree that the terms such as “participation”, “programs”, and “activities”, referred to in this agreement, include all forms of physical exertion or movements of any nature while I am participating in these programs and further include the provision of or failure to provide proper instructions or supervision, the use and adjustment of any and all machinery, equipment, and apparatus and anything related to my use of the services, facilities, or premise involved in these programs, and transportation to and from any events. I understand the nature of these programs for which I am registering and have read and fully understand this Waiver, Release, and Hold Harmless Agreement. I further understand that any advisements or warnings of the particular risks of these programs that I subsequently receive will be incorporated by reference into and become a part of this agreement.</p>';

var secondpart="  I understand that photographs may be taken during events in which my son or daughter may volunteer as a participant and understand that an identifiable likeness of my child may appear in such photographs. I further understand that Santee Santas may use such photographs on their website and in promotional materials. By signing this form, I hereby give the Santee Santas Foundation the absolute right and permission to use any photograph containing my child’s likeness in promotional materials and publicity efforts. I understand that the photograph(s) may be used in a publication, print ad, direct-mail piece, electronic media (e.g. video, CD-ROM,Internet, World Wide Web), or other form of promotion. I release the Santee Santas Foundation, the photographer, their offices, employees, agents, and designees from liability for any violation of any personal or proprietary right I may have in connection with such use. I further understand and agree that if I do not want Santee Santas to use any event photographs depicting my child in promotional materials or publicity efforts, it is my sole and exclusive responsibility to notify the photographer.";


var adult="I am 18 years of age or older.";


var leftCol =  '<div class="col-md-2 col-sm-2 leftcol"  id="leftcol">'+
    		    '<div class="leftcolCon">'+
						 ' <form class="searchform" >'+
            	'  <div class="form-group">'+
								' <label for="search">Search by Name</label>'+
								 '<input type="text" class="form-control" id="searchbyname" style="width:50%;">	'+						
							  '</div>'+
                '<form>'+
           	     ' <div class="form-group">'+
								  '  <label for="search">Search by Age</label>'+
                   ' <div class="form-inline">'+
										'  <input type="text" class="form-control" id="minage" placeholder="Min" style="width:20%;">'+
										 ' <span>-<span>'+	
										  '<input type="text" class="form-control" id="maxage" placeholder="Max" style="width:24%;">	'+			
                	  '</div>	'+			
							   ' </div>'+
                '</form>'+

           		  '<div class="form-group">'+
								 ' <label for="search">Volunteer Type</label>'+
								  '<div class="checkbox">'+
      						 ' <label><input type="checkbox" id="foodsort"> Food Sorting </label>'+
								  '</div>'+
								  '<div class="checkbox">'+
         					 ' <label><input type="checkbox" id="toysort"> Toy Sorting </label>'+
								  '</div>'+
								  '<div class="checkbox">'+
         					 ' <label><input type="checkbox" id="delivery"> Delivery Day </label>'+
								  '</div>'+
						    '</div>'+

                '<div class="form-group">'+
							   '<input class="btn btn-primary btn-lg btn-block" type="submit" value="Update Search" onclick="searchParam()" style="width:60%"></button>'+							
							  '</div>'+
                
                '<div id="admindom">'+
               '</div>'+
              '</form>'+
		        '</div>';



