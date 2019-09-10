var discoveryDocs=[''];

function HandleGoogleApiLibrary() {
gapi.load('client:auth2',  {
	callback: function() {
		gapi.client.init({
			apiKey: 'AIzaSyCy79wKjon3b9RRAxfqqMnOyxHclCbKm8g',
			clientId: '661047287510-22938i57ja33qpt96s99kvdjgjerrhos.apps.googleusercontent.com',
			scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me'
		}).then(
		function(success) {
		}, 
		function(error) {
			console.log(error);
	  }
	);
},
onerror: function() {
}
});
}

$(".g-signin2").on('click', function() {
	$(".g-signin2").attr('disabled', 'disabled');
			
	// API call for Google login
	gapi.auth2.getAuthInstance().signIn().then(
		// On success
		function(success) {
			// API call to get user information
			gapi.client.request({ path: 'https://www.googleapis.com/plus/v1/people/me' }).then(
				// On success
				function(success) {
					console.log(success);
					var user_info = JSON.parse(success.body);
					console.log(user_info);

					$("#user-information div").eq(0).find("span").text(user_info.displayName);
					$("#user-information div").eq(1).find("span").text(user_info.id);
					$("#user-information div").eq(2).find("span").text(user_info.gender);
					$("#user-information div").eq(3).find("span").html('<img src="' + user_info.image.url + '" />');
					$("#user-information div").eq(4).find("span").text(user_info.emails[0].value);

					$("#user-information").show();
					$("#login-button").hide();
				},
				// On error
				function(error) {
					$("#login-button").removeAttr('disabled');
					alert('Error : Failed to get user user information');
				}
			);
		},
		// On error
		function(error) {
			$("#login-button").removeAttr('disabled');
			alert('Error : Login Failed');
		}
	);
});


function onSignIn(googleUser) {
// Useful data for your client-side scripts:
var profile = googleUser.getBasicProfile();
	console.log("ID: " + profile.getId()); // Don't send this directly to your server!
	console.log('Full Name: ' + profile.getName());
	console.log('Given Name: ' + profile.getGivenName());
	console.log('Family Name: ' + profile.getFamilyName());
	console.log("Image URL: " + profile.getImageUrl());
	console.log("Email: " + profile.getEmail());
	display_button();

// The ID token you need to pass to your backend:
var id_token = googleUser.getAuthResponse().id_token;
	console.log("ID Token: " + id_token);
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	if(GoogleUser.is.SignedIn() == true){
		document.getElementById("out").style.display="block";
		document.getElementById("info").style.display="block";
		auth2.disconnect().then(function ()
			{console.log('User signed out.');});
	}
	else{
		document.getElementById("out").style.display="none";
		document.getElementById("info").style.display="none";
	}
}

/*function SignOut(){
 if(GoogleUser.is.SignedIn() == true)
	document.getElementById("out").style.display="block";
	document.getElementById("info").style.display="block";
}

function display_button(){
	document.getElementById("out").style.display="block";
	document.getElementById("info").style.display="block";
}

function hide_button(){
	document.getElementById("out").style.display="none";
	document.getElementById("info").style.display="none";
}*/

function show_info(){
	window.alert("Ala pa");
}

function topFunction() {
  window.scroll({
	  top: -2800, 
	  left: 0, 
	  behavior: 'smooth'
	});

	window.scrollBy({ 
	  top: -2800,
	  left: 0, 
	  behavior: 'smooth' 
	});
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollUp.style.display = "block";
  } else {
    scrollUp.style.display = "none";
  }
}