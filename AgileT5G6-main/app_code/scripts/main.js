// JavaScript Document
	
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //  
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // //  BACK-END I/O  // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// The main user data object
var user = {
	isLoggedIn: false,
	userId:"",
	name: "New guest",
	emailAddress: "",
	token: ""
}

// This function starts the user sign-up process
function actionUserSignUp(){
	
	// Clear the error message if one is displayed
	document.getElementById('errorNote').innerHTML = "";
	
	// Get the field values
	let userName = document.getElementById('enterName').value;
	let userEmail = document.getElementById('enterEmail').value;
	let userPassword = document.getElementById('enterPassword').value;
	
	// First do some validation
	if(
		!userEmail || 
		userEmail == "" || 
		userEmail == " " || 
		!userPassword || 
		userPassword == "" || 
		userPassword == " " 
	){
		// Let the user know what they need to do
		alert("You need to enter an email and a password");
	} else {
		
		// Params object
		var paramsObject = new Object();
		paramsObject.email = userEmail;
		paramsObject.password = userPassword;
		paramsObject.name = userName;
		
		// Turn the data object into an array of URL-encoded key/value pairs.
		var urlEncodedDataPairs = urlEncodedDataPairs = 'name='+paramsObject.name+'&email='+paramsObject.email+'&password='+paramsObject.password;
		
		var params = urlEncodedDataPairs;
		
		// Set the API URL
		let url = "https://galaxie.link/api/user/create/";
		
		// Start the Http request
		var http = new XMLHttpRequest();		
		http.open('POST', url, true);
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		http.send(params);
		
		// Ready
		http.onreadystatechange = function() {
						
			if(http.readyState == 4 && http.status == 201) {
				
				// For debugging
				//console.log('Signup Response: ');
				//console.log(http.response);
				
				// Now let's get the token!
				//console.log("Let's get the token!");
				userAuth(paramsObject.email, paramsObject.password);
				
			} else {
				if(http.status == 400){
					
					// Log the error for debugging
					//console.log('Signup Error');
					//console.log(http.response);

					// Get the error message from response
					var errorMessage;
					let responseObjectError = JSON.parse(http.response);
					
					if(responseObjectError.name){

						// Name error
						errorMessage = 'Name: ' + responseObjectError.name[0];
					}
					else if(responseObjectError.email){

						// Email error
						errorMessage = 'Email: ' + responseObjectError.email[0];
					}
					else if(responseObjectError.password){

						// Password error
						errorMessage = 'Password: ' + responseObjectError.password[0];
					}
					else if(responseObjectError.non_field_errors){

						// Non field error
						errorMessage = responseObjectError.non_field_errors[0];
					} else {

						// Something else
						errorMessage = 'Oops. Please check your details and try again.';
					}
					
					// Let the user know what the error is
					document.getElementById('errorNote').innerHTML = errorMessage;
				}   
			}
		}
	}
}

// This function starts the user log-in process
function actionUserLogInOut(){
	
	// Is the user logged in?
	if (user.isLoggedIn == true){
		userLogOut();
	} else {
		
		// Get the field values
		let userName = document.getElementById('enterName').value;
		let userEmail = document.getElementById('enterEmail').value;
		let userPassword = document.getElementById('enterPassword').value;
		
		// Do some validation 
		if(
			!userEmail || 
			userEmail == "" || 
			userEmail == " " || 
			!userPassword || 
			userPassword == "" || 
			userPassword == " " 
		){
			// Let the user know what they need to do
		    alert("You need to enter an email and a password");
		} else {
			
			// Let's get the token!
			//console.log("Let's get the token!");
			userAuth(userEmail, userPassword);
		}
	}
}

// This function starts the dream submission process
function actionSubmitDream(){
	
	// Is the user logged in?
	if (user.isLoggedIn != true){
		alert('Please log-in or create a new account first');
	} else {
		
		// Get the field values
		let dreamTitle = document.getElementById('submitDreamTitle').value;
		let dreamDescription = document.getElementById('submitDreamDescription').value;
		
		// Do some validation
		if(
			!dreamTitle || 
			dreamTitle == "" || 
			dreamTitle == " " || 
			!dreamDescription || 
			dreamDescription == "" || 
			dreamDescription == " " 
		){
			// Let the user know what they need to do
			alert("You need to enter a title and a description");
		} else {
			
			// Let's post this dream to the API
			//console.log("Let's log this dream!");
			submitDream(dreamTitle, dreamDescription);
		}
	}	
}

// This function handles the dream data submission and response
function submitDream(dreamTitle, dreamDescription){
	
	// Create a URL-encoded key/value pairs.
	var urlEncodedDataPairs = urlEncodedDataPairs = 'dream_app_uid='+user.userId+'&title='+dreamTitle+'&description='+dreamDescription;
	var params = urlEncodedDataPairs;

	// Set the API URL
	let url = "https://galaxie.link/api/dream/dreams/";

	// Start the Http request
	var http = new XMLHttpRequest();
	http.open('POST', url, true);
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	http.send(params);

	// Ready 
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
				
				// Let the user know something went wrong 
				// Note: The API response doesn't describe the issue for this request
				alert("Oops something is wrong. Please check your details and try again.");
			} else {
				
				// Reset the fields
				if(http.response && http.response!="" && http.response!= " "){
					document.getElementById('submitDreamTitle').value = "";
					document.getElementById('submitDreamDescription').value = "";
					document.getElementById('submitDreamMessage').innerHTML = "Your dream log was submitted!";
					
					// Refresh the view
					initDreamsDisplay();
				}
			} 
		}
	}
}

// To Do for V2: This function will start the 'Forgotten Password' process
function userForgottenPassword(){
	
	// Let the user know this is coming soon (in V2!)
	alert("Hold tight! This function is coming soon");
}

// This function fetches an auth token
function userAuth(userEmail, userPassword){
	
	// Clear the error message if one is displayed
	document.getElementById('errorNote').innerHTML = "";
	
	// Params object
	var paramsObject = new Object();
	paramsObject.email = userEmail;
	paramsObject.password = userPassword;

	// Turn the data object into an array of URL-encoded key/value pairs.
	var urlEncodedDataPairs = urlEncodedDataPairs = 'email='+paramsObject.email+'&password='+paramsObject.password;
	var params = urlEncodedDataPairs;

	// Set the API URL
	let url = "https://galaxie.link/api/user/token/";

	// Start the Http request
	var http = new XMLHttpRequest();
	http.open('POST', url, true);
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	http.send(params);

	// Ready
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			
			// Handle the token
			callback_Auth(http.response);
		} else {

			if(http.status == 400){
				
				// Log the error for debugging
				//console.log('Log-in Error');
				//console.log(http.response);
				
				// Get the error message from response
				var errorMessage;
				let responseObjectError = JSON.parse(http.response);
				
				if(responseObjectError.name){

					// Name error
					errorMessage = 'Name: ' + responseObjectError.name[0];
				}
				else if(responseObjectError.email){

					// Email error
					errorMessage = 'Email: ' + responseObjectError.email[0];
				}
				else if(responseObjectError.password){

					// Password error
					errorMessage = 'Password: ' + responseObjectError.password[0];
				}
				else if(responseObjectError.non_field_errors){

					// Non field error
					errorMessage = responseObjectError.non_field_errors[0];
				} else {

					// Something else
					errorMessage = 'Oops. Please check your details and try again.';
				}

				// Let the user know what the error is
				document.getElementById('errorNote').innerHTML = errorMessage;
			} 
		}
	}
}

// This function handles the auth token response
function callback_Auth(response){
	
	// Check we have a response first
	if(response){
		
		// Clear the error message if one is displayed
		document.getElementById('errorNote').innerHTML = "";
		
		// For debugging
		//console.log("Auth Response: ");
		//console.log(response);
		
		// Get the token
		let responseObject = JSON.parse(response);
		let userToken = responseObject.token;
		
		// For debugging
		//console.log("Let's get the user!");
		//console.log("With token: "+userToken);

		// Set the API URL
		let url = "https://galaxie.link/api/user/me/";
		
		// Start the Http request
		var http = new XMLHttpRequest();
		http.open('GET', url, true);
		http.setRequestHeader('Content-type', 'application/json');
		http.setRequestHeader('Authorization', 'Token '+userToken); 
		http.send();
		
		// Ready
		http.onreadystatechange = function() {
			
			if(http.readyState == 4 && http.status == 200) {
				
				// We got the token
				callback_LogIn(http.response, userToken);
				
			} else {
				
				// Log the error for debugging
				//console.log('Get user status change');
				//console.log(http.response);
				
				if(http.status == 400){
					
					// Log the error for debugging
					//console.log('Auth Error');
					//console.log(http.response);

					// Get the error message from response
					var errorMessage;
					let responseObjectError = JSON.parse(http.response);

					if(responseObjectError.name){

						// Name error
						errorMessage = 'Name: ' + responseObjectError.name[0];
					}
					else if(responseObjectError.email){

						// Email error
						errorMessage = 'Email: ' + responseObjectError.email[0];
					}
					else if(responseObjectError.password){

						// Password error
						errorMessage = 'Password: ' + responseObjectError.password[0];
					}
					else if(responseObjectError.non_field_errors){

						// Non field error
						errorMessage = responseObjectError.non_field_errors[0];
					} else {

						// Something else
						errorMessage = 'Oops. Please check your details and try again.';
					}

					// Let the user know what the error is
					document.getElementById('errorNote').innerHTML = errorMessage;
				} 
				
				else if(http.status == 401){
					alert("There is something wrong with the auth token");
				} 
			}
		}
	}
}
	
// This function handles the log-in response
function callback_LogIn(response, userToken){
	
	// Check we have a response first
	if(response){
		
		// For debugging
		//console.log("Login Response: ");
		//console.log(response);
		
		// Get the response and send it to the userLogIn function to handle
		let responseObject = JSON.parse(response);
		userLogIn(responseObject.name, responseObject.email, responseObject.id, userToken);
	}
}
	
// This function logs a user in
function userLogIn(userName, userEmail, userId, userToken){
	
	// Set the user object data
	user.isLoggedIn = true;
	user.name = userName;
	user.emailAddress = userEmail;
	user.userId = userId;
	user.token = userToken;
	saveUserAsCookie();
	
	// Build the profile view
	uiDrawProfileView();
	
	// Welcome the user! :)
	alert("Welcome!");
	
	// Populate the display name and email fields
	document.getElementById('userName').value = userName;
	document.getElementById('userEmail').value = userEmail;
	
	// Empty the other fields
	document.getElementById('enterName').value = "";
	document.getElementById('enterEmail').value = "";
	document.getElementById('enterPassword').value = "";
	
	// Fetch and display dreams
	document.getElementById('dreamsDisplay').innerHTML = "Loading dream logs..";
	initDreamsDisplay();
}
	
// This function logs a user out
function userLogOut(){
	
	// Set the user object data
	user.isLoggedIn = false;
	user.userId = "";
	user.name = "";
	user.emailAddress = "";
	user.token = "";
	
	// Save the data in a cookie
	saveUserAsCookie();
	
	// Re-build the profile view
	uiDrawProfileView();
	
	// Let the user know they are now logged out
	alert("You are now logged out");
	
	// Empty the fields
	document.getElementById('enterName').value = "";
	document.getElementById('enterEmail').value = "";
	document.getElementById('enterPassword').value = "";
	
	// Reset log-in message
	document.getElementById('dreamsDisplay').innerHTML = "Please log back in first";
}
	
// This function displays the profile view UI
function uiDrawProfileView(){
	
	// Check the user is logged in or out
	if (user.isLoggedIn == true){
		
		// Set the UI for logged in
		document.getElementById('userLogInOutButton').innerHTML = "Log Out";
		document.getElementById('userName').innerHTML = user.name;
		document.getElementById('userEmail').innerHTML = user.emailAddress;
		document.getElementById('logInForm').style.display = "none";
		document.getElementById('userSignUpButtonContainer').style.display = "none";
		document.getElementById('userForgottenPasswordButtonContainer').style.display = "none";
		
	} else {
		
		// Set the UI for logged out
		document.getElementById('userLogInOutButton').innerHTML = "Log In";
		document.getElementById('userName').innerHTML = "-";
		document.getElementById('userEmail').innerHTML = "-";
		document.getElementById('logInForm').style.display = "block";
		document.getElementById('userSignUpButtonContainer').style.display = "inline-block";
		document.getElementById('userForgottenPasswordButtonContainer').style.display = "block";
	}
}

// This function fetches dreams from the DB and displays them
function initDreamsDisplay(){
	
	console.log('calling!');
	
	// Clear the dreams display area
	document.getElementById('dreamsDisplay').innerHTML = '';
	
	// Set the API URL
	let url = "https://galaxie.link/api/dream/dreams/";

	// Start the Http request
	var http = new XMLHttpRequest();
	http.open('GET', url, true);
	http.setRequestHeader('Content-type', 'application/json');
	http.send(null);
	
	// Ready
	http.onreadystatechange = function() {

		// For debugging
		//console.log(http.response);

		// Handle the response
		if(http.readyState == 4 && http.status == 200) {
			
			// Get the dreams
			let dreams = JSON.parse(http.response);
			
			// Clear the dreams display area again just to be safe
			document.getElementById('dreamsDisplay').innerHTML = '';
			
			// Loop through dreams
			var items = 0;
			for(var i=0; i<dreams.length; i++){
				
				// Get a dream at index 'i'
				let responseObject = dreams[i];
				let userId = responseObject.dream_app_uid;
				
				// Check it belongs to the logged-in user
				if(userId == user.userId){
					
					// Increment item number so that we know that we're now adding dreams
					items++;
					
					// Get the dream data
					let dreamTitle = responseObject.title;
					let dreamDescription = responseObject.description;
					let createdAt = responseObject.created_at;
					let dreamUID = responseObject.dream_app_uid;

					// Split date format
					// e.g. ["2022","08","14","06","17","07.891979Z"]
					var t = createdAt.split(/[-T:]/);

					// For debugging
					//console.log(JSON.stringify(t));

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
				
					// Build the dream row HTML
					let titleHTML = '<div class="trackRowIcon"><img src="images/HomeTrack/yesterday.png" width="100%" height="100%" alt="Dream" title="Dream"></div><div class="displayDreamRowTitle">'+dreamTitle+'</div>';
					let dateHTML = '<div class="displayDreamDate">Logged:<br>'+jsd+'</div>';
					let descriptionHTML = '<div class="displayDreamRowDescription">'+dreamDescription+'</div>';
					let rowHTML = '<div class="displayDreamRow">'+titleHTML+dateHTML+descriptionHTML+'</div>';
					
					// Add the dream row HTML
					document.getElementById('dreamsDisplay').innerHTML += rowHTML;
				}
			}
			
			// If the user didn't have any dreams to display, let them know
			if(items == 0){
				
				// Display a message
				document.getElementById('dreamsDisplay').innerHTML += "<br>You havn't logged any dreams yet!<br><br>Want to log one now?<br>Tap the 'Add Dream' tab below";
			}
		} 
	}
}
	

// // // Cookie Helper Functions // // // 
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
	
// This function fetches a cookie
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
	
// This function erases a cookie
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
	
// This function saves a cookie
function saveUserAsCookie(){
	var userObjectJson = JSON.stringify(user);
	setCookie('user_object',userObjectJson,10000);
}
	
// Initiate the cookie object
function initCookieObject(userObjectCookie){
	if (userObjectCookie) {
		user = JSON.parse(userObjectCookie);
	} else {
		user.name = "Guest";
		saveUserAsCookie();
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

// A global var for keeping track of the user's current view
var currentViewId = '';

// This function displays a modal view
function openModal(viewId){
	
	// If it's the main, change the style of it's cover
	if(viewId=='view_main'){	
		document.getElementById('view_cover').style.opacity = 1;
	}
	  
	// Animate the view into position
	var view = document.getElementById(viewId);
	view.style.top = 0;
}
	
// This function dismisses a modal view
function closeModal(viewId){
	
	// Clear any error message on display
	document.getElementById('errorNote').innerHTML = "";
	
	// Animate the view into position
	var view = document.getElementById(viewId);
	view.style.top = '100vh';
}

// This function displays a 'story' view (a view that may journey with additional views)
function openStory(viewId){
	
	// Close a view that could be open
	if(currentViewId!=''){
		closeStory(currentViewId)
	}
	
	// Set the current view ID
	currentViewId = viewId;
	
	// Fade in the cover
	document.getElementById('view_cover').style.opacity = 1;
	
	// Animate the view into position
	var view = document.getElementById(viewId);
	view.style.left = 0; 
	
	// If this view is the 'tab 2' view, initiate the fetching of dreams
	if(viewId=='view_tab_2'){
		
		setTimeout(function(){
			
			// Check the user is logged in first
			if(user.isLoggedIn == true){
				
				// Fetch and display dreams
				document.getElementById('dreamsDisplay').innerHTML = "Loading dream logs..";
				initDreamsDisplay();
			} else { 
				
				// Let the user know they need to be logged in
				document.getElementById('dreamsDisplay').innerHTML = "<br>You'll need to log-in to see your dream logs";
			}
			
		},500);
	}
}
	
// This function dismisses a 'story' view (a view that may journey with additional views)
function closeStory(viewId){
	
	// Clear the current view ID
	currentViewId = '';
	
	// Fade out the cover
	document.getElementById('view_cover').style.opacity = 0;
	
	// Animate the view into position
	var view = document.getElementById(viewId);
	view.style.left = '100vw';
	
	// Hide the list view
	if(viewId=='view_list'){
		document.getElementById('nav_list').style.opacity = '0';
		setTimeout(function(){
			document.getElementById('nav_list').style.display = 'none';
		},500);
	}
	
	// Hide the tab 1 view
	if(viewId=='view_tab_1'){
		document.getElementById('nav_tab_1').style.opacity = '0';
		setTimeout(function(){
			document.getElementById('nav_tab_1').style.display = 'none';
		},500);
	}
	
	// Hide the tab 2 view
	if(viewId=='view_tab_2'){
		document.getElementById('nav_tab_2').style.opacity = '0';
		setTimeout(function(){
			document.getElementById('nav_tab_2').style.display = 'none';
			document.getElementById('dreamsDisplay').innerHTML = '';
		},500);
	}
	
	// Hide the tab 3 view?
	// Tab 3 doesn't need to be hidden
	
	// Hide the tab 4 view
	if(viewId=='view_tab_4'){
		document.getElementById('nav_tab_4').style.opacity = '0';
		setTimeout(function(){
			document.getElementById('nav_tab_4').style.display = 'none';
			document.getElementById('submitDreamMessage').innerHTML = "";
		},500);
	}
	
	// Hide the tab 5 view
	if(viewId=='view_tab_5'){
		document.getElementById('nav_tab_5').style.opacity = '0';
		setTimeout(function(){
			document.getElementById('nav_tab_5').style.display = 'none';
		},500);
	}
}
	
// // // Tabs // // // 

// This function handles the funtionality when the user taps on tab 1
function buttonAction_1(){
	
	// Set tab styles
	document.getElementById('navButton_1_img').style.opacity = 1.0;
	document.getElementById('navButton_2_img').style.opacity = 0.3;
	document.getElementById('navButton_4_img').style.opacity = 0.3;
	document.getElementById('navButton_5_img').style.opacity = 0.3;
	
	// Close a current view
	if(currentViewId!=''){
		closeStory(currentViewId);
	}
}
	
// This function handles the funtionality when the user taps on tab 2
function buttonAction_2(){
	
	// Set tab styles
	document.getElementById('navButton_1_img').style.opacity = 0.3;
	document.getElementById('navButton_2_img').style.opacity = 1.0;
	document.getElementById('navButton_4_img').style.opacity = 0.3;
	document.getElementById('navButton_5_img').style.opacity = 0.3;
	
	// Open a 'story' type view
	openStory('view_tab_2');
}
	
// This function handles the funtionality when the user taps on tab 3
function buttonAction_3(){
	
	// Open a 'modal' type view
	openModal('view_modal_dream_log');
}
	
// This function handles the funtionality when the user taps on tab 4
function buttonAction_4(){
	
	// Set tab styles
	document.getElementById('navButton_1_img').style.opacity = 0.3;
	document.getElementById('navButton_2_img').style.opacity = 0.3;
	document.getElementById('navButton_4_img').style.opacity = 1.0;
	document.getElementById('navButton_5_img').style.opacity = 0.3;
	
	// Open a 'story' type view
	openStory('view_tab_4');
}
	
// This function handles the funtionality when the user taps on tab 5
function buttonAction_5(){
	
	// Set tab styles
	document.getElementById('navButton_1_img').style.opacity = 0.3;
	document.getElementById('navButton_2_img').style.opacity = 0.3;
	document.getElementById('navButton_4_img').style.opacity = 0.3;
	document.getElementById('navButton_5_img').style.opacity = 1.0;
	
	// Open a 'story' type view
	openStory('view_tab_5');
}

// This function handles the funtionality when the user taps the 'members' button
function buttonAction_members(){	
	
	// Open a 'modal' type view 
	openModal('view_modal_members');
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
	document.getElementById('oneiro_app').style.height = (window.innerHeight)+'px';
	
	// Handle cookie
	var userObjectCookie = getCookie('user_object');
	
	// Set first tab
	document.getElementById('navButton_1_img').style.opacity = 1.0;
	
	// Wait a moment for data to load
	setTimeout(function(){
		// Set user
		initCookieObject(userObjectCookie)
		
		// Draw UI views
		uiDrawProfileView();
		
		// Wait a moment for the splash screen cover
		setTimeout(function(){
			
			// Fade out the splash screen cover
			document.getElementById('splashCover').style.opacity = 0;
			
			// Remove the splash screen cover
			setTimeout(function(){
				document.getElementById('splashCover').style.display = 'none';
			},2000);
			
		},2000);
		
	},1000);
	
})();