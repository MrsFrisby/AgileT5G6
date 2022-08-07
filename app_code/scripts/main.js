// JavaScript Document
	
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //  
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // //  BACK-END I/O  // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// This function starts the user sign-up process
function actionUserSignUp(){
	
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
		
		// Params object
		var paramsObject = new Object();
		paramsObject.email = userEmail;
		paramsObject.password = userPassword;
		paramsObject.name = userName;
		
		// Turn the data object into an array of URL-encoded key/value pairs.
		var urlEncodedDataPairs = urlEncodedDataPairs = 'name='+paramsObject.name+'&email='+paramsObject.email+'&password='+paramsObject.password;
		
		var params = urlEncodedDataPairs;
		
		// Make the network request
		let url = "https://galaxie.link/api/user/create/";
		
		var http = new XMLHttpRequest();		
		http.open('POST', url, true);
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		http.send(params);
		
		http.onreadystatechange = function() {
						
			if(http.readyState == 4 && http.status == 201) {
				
				console.log('Signup Response: ');
				console.log(http.response)
				
				// Now let's get the token!
				console.log("Let's get the token!");
				userAuth(paramsObject.email, paramsObject.password);
				
			} else {
				if(http.status == 400){
				   alert("Oops something is wrong. Please check your details and try again.");
				}   
			}
		}
	}
}

// This function starts the user log-in process
function actionUserLogInOut(){
	
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
			
			// Let's get the token!
			console.log("Let's get the token!");
			userAuth(userEmail, userPassword);
		}
	}
}

// To Do: This function will start the 'Forgotten Password' process
function userForgottenPassword(){
	
	alert("ToDo: This function is coming soon!");
	
	let userName = document.getElementById('enterName').value;
	let userEmail = document.getElementById('enterEmail').value;
	let userPassword = document.getElementById('enterPassword').value;
	
//	if(
//		!userEmail || 
//		userEmail == "" || 
//		userEmail == " " || 
//		!userPassword || 
//		userPassword == "" || 
//		userPassword == " " 
//	){
//		alert("You need to enter an email and a password");
//	} else {
//		alert("An email has been sent to you with further insructions");
//		document.getElementById('enterName').value = "";
//		document.getElementById('enterEmail').value = "";
//		document.getElementById('enterPassword').value = "";
//	}
}

// This function fetches an auth token
function userAuth(userEmail, userPassword){
	
	// Params object
	var paramsObject = new Object();
	paramsObject.email = userEmail;
	paramsObject.password = userPassword;

	// Turn the data object into an array of URL-encoded key/value pairs.
	var urlEncodedDataPairs = urlEncodedDataPairs = 'email='+paramsObject.email+'&password='+paramsObject.password;
	var params = urlEncodedDataPairs;

	// Make the network request
	let url = "https://galaxie.link/api/user/token/";

	var http = new XMLHttpRequest();
	http.open('POST', url, true);
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	http.send(params);

	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			//alert("Logged-in with auth token");
			callback_Auth(http.response);
		} else {
			//console.log("Auth status change: ");
			//console.log(http.response);

			if(http.status == 400){
				alert("Oops something is wrong. Please check your details and try again.");
			} 
		}
	}
}

// This function handles the auth token response
function callback_Auth(response){
	
	if(response){
		
		//console.log("Auth Response: ");
		//console.log(response);
		
		let responseObject = JSON.parse(response);
		let userToken = responseObject.token;
		
		console.log("Let's get the user!");
		console.log("With token: "+userToken);

		// Make the network request
		let url = "https://galaxie.link/api/user/me/";

		var http = new XMLHttpRequest();
		http.open('GET', url, true);
		http.setRequestHeader('Content-type', 'application/json');
		http.setRequestHeader('Authorization', 'Token '+userToken); 
		http.send();
		
		http.onreadystatechange = function() {
			
			//console.log('Auth call back: ');
			//console.log(http.status);
			//console.log(http.response);
			
			if(http.readyState == 4 && http.status == 200) {
				
				// We got the token
				callback_LogIn(http.response, userToken);
			} else {
				//console.log('Get user status change');
				//console.log(http.response);
				
				if(http.status == 400){
					alert("Oops something is wrong. Please check your details and try again.");
				} 
				
				else if(http.status == 401){
					//alert("Oops something is wrong. Please check your details and try again.");
					alert("There is something wrong with the auth token");
				} 
			}
		}
	}
}
	
// This function handles the log-in response
function callback_LogIn(response, userToken){
	
	if(response){
		
		console.log("Login Response: ");
		console.log(response);
	  
		let responseObject = JSON.parse(response);
		userLogIn(responseObject.name, responseObject.email, userToken);
	}
}
	
// This function logs a user in
function userLogIn(userName, userEmail, userToken){
	
	user.isLoggedIn = true;
	user.name = userName;
	user.emailAddress = userEmail;
	user.token = userToken;
	saveUserAsCookie();
	
	uiDrawProfileView();
	
	alert("Welcome!");
	
	document.getElementById('userName').value = userName;
	document.getElementById('userEmail').value = userEmail;
	
	document.getElementById('enterName').value = "";
	document.getElementById('enterEmail').value = "";
	document.getElementById('enterPassword').value = "";
}
	
// This function logs a user out
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
	isLoggedIn: false,
	name: "New guest",
	emailAddress: "",
	token: ""
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