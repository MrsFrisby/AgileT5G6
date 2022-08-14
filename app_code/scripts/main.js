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

function actionSubmitDream(){
	
	if (user.isLoggedIn != true){
		alert('Please log-in or create a new account first');
	} else {
		
		let dreamTitle = document.getElementById('submitDreamTitle').value;
		let dreamDescription = document.getElementById('submitDreamDescription').value;
		
		if(
			!dreamTitle || 
			dreamTitle == "" || 
			dreamTitle == " " || 
			!dreamDescription || 
			dreamDescription == "" || 
			dreamDescription == " " 
		){
			alert("You need to enter a title and a description");
		} else {
			
			// Let's post this dream to the API
			console.log("Let's log this dream!");
			submitDream(dreamTitle, dreamDescription);
		}
	}	
}

function submitDream(dreamTitle, dreamDescription){
	
	// Create a URL-encoded key/value pairs.
	var urlEncodedDataPairs = urlEncodedDataPairs = 'dream_app_uid='+user.userId+'&title='+dreamTitle+'&description='+dreamDescription;
	var params = urlEncodedDataPairs;

	// Make the network request
	let url = "https://galaxie.link/api/dream/dreams/";

	var http = new XMLHttpRequest();
	http.open('POST', url, true);
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	http.send(params);

	http.onreadystatechange = function() {
		
		//console.log("Submit response: ");
		//console.log(http.response);
		
		if(http.readyState == 4 && http.status == 200) {
			//console.log("Submit dream status 200: "); 
			//console.log(http.response);
			
			callback_Auth(http.response);
		} else {
			//console.log("Submit dream status change: ");
			//console.log(http.response);

			if(http.status == 400){
				alert("Oops something is wrong. Please check your details and try again.");
			} else {
				
				if(http.response && http.response!="" && http.response!= " "){
					document.getElementById('submitDreamTitle').value = "";
					document.getElementById('submitDreamDescription').value = "";
					document.getElementById('submitDreamMessage').innerHTML = "Your dream log was submitted!";
				}
			} 
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
		userLogIn(responseObject.name, responseObject.email, responseObject.id, userToken);
	}
}
	
// This function logs a user in
function userLogIn(userName, userEmail, userId, userToken){
	
	user.isLoggedIn = true;
	user.name = userName;
	user.emailAddress = userEmail;
	user.userId = userId;
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

// This function is now deprecated and replaced with a new method that calls a different end-point
function initDreamsDisplay_deprecated(){
	
	let fetchNumberOfDreams = 25;
	var currentDreamId = 1;
	
	document.getElementById('dreamsDisplay').innerHTML = '';
	
	// Hack until the database set-tup supports getting all entries or latest 100
	function fetchDream(currentDreamIdPassed){
	
		// Make the network request
		let url = "https://galaxie.link/api/dream/dreams/"+currentDreamIdPassed;

		var http = new XMLHttpRequest();
		http.open('GET', url, true);
		http.setRequestHeader('Content-type', 'application/json');
		http.send(null);
		console.log("Get dream: "+currentDreamIdPassed);
		
		http.onreadystatechange = function() {

			//console.log(http.response);

			if(http.readyState == 4 && http.status == 200) {
	
				if(http.response && http.response!="" && http.response!= " "){
						
					let responseObject = JSON.parse(http.response);
					let dreamTitle = responseObject.title;
					let dreamDescription = responseObject.description;
					let userId = responseObject.dream_app_uid;
					
					let titleHTML = '<p><strong><div class="displayDreamRowTitle">'+dreamTitle+' (by user id: '+userId+')<div></strong></p>';
					let descriptionHTML = '<div class="displayDreamRowDescription">'+dreamDescription+'<div>';
					
					let rowHTML = '<div class="displayDreamRow">'+titleHTML+descriptionHTML+'</div><br>';
					
					document.getElementById('dreamsDisplay').innerHTML += rowHTML;
						
					if(currentDreamId<fetchNumberOfDreams){
						currentDreamId++;
						
						setTimeout(function(){
							fetchDream(currentDreamId);
						}, 250);
					}
				}
			} 
		}
	}
	
	setTimeout(function(){
		fetchDream(currentDreamId);
	}, 250);
}

function initDreamsDisplay(){
	
	document.getElementById('dreamsDisplay').innerHTML = '';
	
	// Make the network request
	let url = "https://galaxie.link/api/dream/dreams/";

	var http = new XMLHttpRequest();
	http.open('GET', url, true);
	http.setRequestHeader('Content-type', 'application/json');
	http.send(null);

	http.onreadystatechange = function() {

		//console.log(http.response);

		if(http.readyState == 4 && http.status == 200) {
			
			let dreams = JSON.parse(http.response);
			
			for(var i=0; i<dreams.length; i++){
				
				let responseObject = dreams[i];
				let userId = responseObject.dream_app_uid;
				
				if(userId == user.userId){

					
					let dreamTitle = responseObject.title;
					let dreamDescription = responseObject.description;
					let createdAt = responseObject.created_at;

					// Split date format
					// e.g. ["2022","08","14","06","17","07.891979Z"]
					var t = createdAt.split(/[-T:]/);

					console.log(JSON.stringify(t));

					// Remove final part (after last dot)
					var part5 = t[5];
					var tt = part5.split(/[.]/);

					// e.g. "2010-06-09 13:12:01"
					var jsDateFormat = t[0]+'-'+ t[1]+'-'+t[2]+' '+t[3]+':'+t[4]+':'+tt[0];

					// JS date - use this one for even better formatting
					var jsd = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], tt[0]));
					console.log(jsd);

					// Apply each element to the Date function

					var createdAtFormatted = t[2]+'-'+t[1]+'-'+t[0]+' at '+t[3]+':'+t[4];
				
					let titleHTML = '<div class="displayDreamRowTitle">'+dreamTitle+'</div>';
					let dateHTML = '<div class="displayDreamDate">Logged:<br>'+jsd+'</div>';
					let descriptionHTML = '<div class="displayDreamRowDescription">'+dreamDescription+'</div>';
					
					let rowHTML = '<div class="displayDreamRow">'+titleHTML+dateHTML+descriptionHTML+'</div><br>';

					document.getElementById('dreamsDisplay').innerHTML += rowHTML;
				
				}
			}
		} 
	}
}
	
// User object
var user = {
	isLoggedIn: false,
	userId:"",
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
			initDreamsDisplay();
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
			document.getElementById('dreamsDisplay').innerHTML = '';
		},500);
	}
	
	if(viewId=='view_tab_4'){
		document.getElementById('nav_tab_4').style.opacity = '0';
		setTimeout(function(){
			document.getElementById('nav_tab_4').style.display = 'none';
			document.getElementById('submitDreamMessage').innerHTML = "";
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