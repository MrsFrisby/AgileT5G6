// JavaScript Document
	
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //  
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // //  BACK-END I/O  // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
	
function userSignUp(){
	
	let userName = document.getElementById('enterName').value;
	let userEmail = document.getElementById('enterEmail').value;
	let userPassword = document.getElementById('enterPassword').value;
	
	if(
		!userEmail || 
		userEmail == "" || 
		userEmail == " " || 
		!userPassword || 
		userPassword == "" || 
		userPassword == " " 
	){
		alert("You need to enter an email and a password");
	} else {
		console.log("Let's sign up!");
		document.getElementById('enterName').value = "";
		document.getElementById('enterEmail').value = "";
		document.getElementById('enterPassword').value = "";
		
		alert("The end-point needs to be secure https");
		
		// Below is the code for creating new user's in the app but the end-point needs to be secure https
		/*
		// Params object
		var paramsObject = new Object();
		paramsObject.email = userEmail;
		paramsObject.password = userPassword;
		paramsObject.name = userName;

		// Turn the data object into an array of URL-encoded key/value pairs.
		let urlEncodedData = "", urlEncodedDataPairs = [], name;
		for( name in params ) {
			urlEncodedDataPairs.push(encodeURIComponent(name)+'='+encodeURIComponent(params[name]));
		}
		
		// Make the network request
		let url = "https://13.41.73.111:8000/api/user/create";
		
		var http = new XMLHttpRequest();

		var params = urlEncodedDataPairs;
		
		http.open('POST', url, true);

		// Send the proper header information along with the request
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				//success(JSON.parse(http.responseText));
				callback_SignUp(null, http.response);
			} else {
				callback_SignUp(http.status, http.response);
			}
		}
		http.send(params);
		*/
	}
}
	
function callback_SignUp(status, response){
	
	console.log("Status: ");
	console.log(status);
	
	console.log("Response: ");
	console.log(response);
}
	
function userForgottenPassword(){
	
	let userName = document.getElementById('enterName').value;
	let userEmail = document.getElementById('enterEmail').value;
	let userPassword = document.getElementById('enterPassword').value;
	
	if(
		!userEmail || 
		userEmail == "" || 
		userEmail == " " || 
		!userPassword || 
		userPassword == "" || 
		userPassword == " " 
	){
		alert("You need to enter an email and a password");
	} else {
		alert("An email has been sent to you with further insructions");
		document.getElementById('enterName').value = "";
		document.getElementById('enterEmail').value = "";
		document.getElementById('enterPassword').value = "";
	}
}
	
function userLogInOut(){
	
	if (user.isLoggedIn == true){
		userLogOut();
	} else {
		
		let userName = document.getElementById('enterName').value;
		let userEmail = document.getElementById('enterEmail').value;
		let userPassword = document.getElementById('enterPassword').value;
		
		if(
			!userEmail || 
			userEmail == "" || 
			userEmail == " " || 
			!userPassword || 
			userPassword == "" || 
			userPassword == " " 
		){
		    alert("You need to enter an email and a password");
		} else {
			userLogIn();
		}
	}
}
	
function userLogIn(){
	
	user.isLoggedIn = true;
	saveUserAsCookie();
	uiDrawProfileView();
	alert("Welcome!\nYou are now logged in");
	
	document.getElementById('enterName').value = "";
	document.getElementById('enterEmail').value = "";
	document.getElementById('enterPassword').value = "";
}
	
function userLogOut(){
	
	user.isLoggedIn = false;
	saveUserAsCookie();
	uiDrawProfileView();
	alert("You are now logged out");
	
	document.getElementById('enterName').value = "";
	document.getElementById('enterEmail').value = "";
	document.getElementById('enterPassword').value = "";
}
	
function uiDrawProfileView(){
	
	if (user.isLoggedIn == true){
		
		document.getElementById('userLogInOutButton').innerHTML = "Log Out";
		document.getElementById('userName').innerHTML = user.name;
		document.getElementById('userEmail').innerHTML = user.emailAddress;
		
		document.getElementById('logInForm').style.display = "none";
		document.getElementById('userSignUpButtonContainer').style.display = "none";
		document.getElementById('userForgottenPasswordButtonContainer').style.display = "none";
		
		
	} else {
		
		document.getElementById('userLogInOutButton').innerHTML = "Log In";
		document.getElementById('userName').innerHTML = "-";
		document.getElementById('userEmail').innerHTML = "-";
		
		document.getElementById('logInForm').style.display = "block";
		document.getElementById('userSignUpButtonContainer').style.display = "inline-block";
		document.getElementById('userForgottenPasswordButtonContainer').style.display = "block";
	}
}
	
// User object
var user = {
	isLoggedIn : false,
	name : "New guest",
	emailAddress : ""
}

// // // Cookie Data Functions // // // 
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
	
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
	
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
	
function saveUserAsCookie(){
	var userObjectJson = JSON.stringify(user);
	setCookie('user_object',userObjectJson,10000);
}
	
// Initiate the cookie object
function initCookieObject(userObjectCookie){
	if (userObjectCookie) {
		//console.log('Found data cookie: '+userObjectCookie);
		user = JSON.parse(userObjectCookie);
		//console.log('User: '+JSON.stringify(user))
	} else {
		//console.log('No data cookie: '+userObjectCookie);
		user.name = "Guest";
		saveUserAsCookie();
		//console.log('User: '+JSON.stringify(user))
	}
}
	
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //  
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // FRONT-END SCRIPTS // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
		
// // // View Controller Navigation Functions // // // 	
function openModal(viewId){
	
	if(viewId=='view_main'){	
		document.getElementById('view_cover').style.opacity = 1;
	}
	   
	var view = document.getElementById(viewId);
	view.style.top = 0;
}
	
function closeModal(viewId){
	
	if(viewId=='view_main'){
		document.getElementById('view_cover').style.opacity = 0;
	}
	
	var view = document.getElementById(viewId);
	view.style.top = '100vh';
}

function openStory(viewId){
	
	document.getElementById('view_cover').style.opacity = 1;
	var view = document.getElementById(viewId);
	view.style.left = 0; 
	
	if(viewId=='view_tab_1'){
		document.getElementById('nav_tab_1').style.display = 'block';
		setTimeout(function(){
			document.getElementById('nav_tab_1').style.opacity = '1';
		},500);
	}
	
	if(viewId=='view_tab_2'){
		document.getElementById('nav_tab_2').style.display = 'block';
		setTimeout(function(){
			document.getElementById('nav_tab_2').style.opacity = '1';
		},500);
	}
	
	if(viewId=='view_tab_4'){
		document.getElementById('nav_tab_4').style.display = 'block';
		setTimeout(function(){
			document.getElementById('nav_tab_4').style.opacity = '1';
		},500);
	}
	
	if(viewId=='view_tab_5'){
		document.getElementById('nav_tab_5').style.display = 'block';
		setTimeout(function(){
			document.getElementById('nav_tab_5').style.opacity = '1';
		},500);
	}
}
	
function closeStory(viewId){
	
	document.getElementById('view_cover').style.opacity = 0;
	var view = document.getElementById(viewId);
	view.style.left = '100vw';
	
	if(viewId=='view_list'){
		document.getElementById('nav_list').style.opacity = '0';
		setTimeout(function(){
			document.getElementById('nav_list').style.display = 'none';
		},500);
	}
	
	if(viewId=='view_tab_1'){
		document.getElementById('nav_tab_1').style.opacity = '0';
		setTimeout(function(){
			document.getElementById('nav_tab_1').style.display = 'none';
		},500);
	}
	
	if(viewId=='view_tab_2'){
		document.getElementById('nav_tab_2').style.opacity = '0';
		setTimeout(function(){
			document.getElementById('nav_tab_2').style.display = 'none';
		},500);
	}
	
	if(viewId=='view_tab_4'){
		document.getElementById('nav_tab_4').style.opacity = '0';
		setTimeout(function(){
			document.getElementById('nav_tab_4').style.display = 'none';
		},500);
	}
	
	if(viewId=='view_tab_5'){
		document.getElementById('nav_tab_5').style.opacity = '0';
		setTimeout(function(){
			document.getElementById('nav_tab_5').style.display = 'none';
		},500);
	}
}
	
// // // Tabs // // // 
function buttonAction_1(){
	openStory('view_tab_1');
}
	
function buttonAction_2(){
	openStory('view_tab_2');
}
	
function buttonAction_3(){
	openModal('view_main');
}
	
function buttonAction_4(){
	openStory('view_tab_4');
}
	
function buttonAction_5(){
	openStory('view_tab_5');
}
	
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //  
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // //   BOOT   // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
	
// Wait for DOM to be available
(function() {
	// DOM now available
	
	// Set the main view height
	document.getElementById('dreamCatcher_app').style.height = (window.innerHeight)+'px';
	
	// Handle cookie
	var userObjectCookie = getCookie('user_object');
	
	// Wait a moment for data to load
	setTimeout(function(){
		// Set user
		initCookieObject(userObjectCookie)
		
		// Draw UI views
		uiDrawProfileView();
		
	},1000);
	
})();