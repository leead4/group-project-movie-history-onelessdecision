// This file enables users to interact with the default features of index.html
//  	The initial page is a splash page that asks user to log in.
//		After log in, the page loads data depending on the history of the user.
//			If the user is new or has no movies, the wrapper loads random movies for the user to see.
//			If the user has a history, the wrapper loads historical data.
// 		This file sends movie data gleaned from user input to firebase (Build Movie Object).

"use strict";

//////////////////////
// GLOBAL VARIABLES //
//////////////////////
console.log('something is happening');

let userArray = [];

//////////////////////
//      MODULES		//
//////////////////////

let $ = require("../lib/node_modules/jquery/dist/jquery.min.js"),
	user = require("./user.js"),
	fbConfig = require("./firebaseConfig.js"),
	// fbGetter = require("./firebaseGetter.js"),
	dom = require("./domBuilder.js"),
	fbData = require("./firebaseInteraction.js"),
	omdb = require("./omdbInteraction.js");



/////////////////////
//LOAD SPLASH PAGE //
/////////////////////

/////////////////////
// EVENT HANDLERS  //
/////////////////////

//enterpress from search-input field
$("#search-input").keypress(function(e) {
    if(e.which == 13) {
        omdb.findMovies($(this).val())
		.then((movieData)=>{
		console.log('movieData passed to parse:', movieData);
		omdb.parseMovies(movieData)
		.then((moviesArray)=>{
			$("#search-input").html("");
			dom.printCards(moviesArray);
			addButtonListeners();
		});
	});
  }
});


//login
$("#login").click(()=>{
	console.log('you clicked login');
	user.logInGoogle();
	$("#registeredHeader").removeClass("hidden");
	$("#splash").addClass("hidden");
});

// //logout
$("#logout").click(()=>{
	console.log('you clicked logout');
	user.logOut();
	$("#logout").addClass("hidden");
	$("#registeredHeader").addClass("hidden");
    $("#login").removeClass("hidden");
	$("#splash").removeClass("hidden");
	$("#container").html("");


});

//show untracked
$("#untracked").click((event)=>{
	event.preventDefault();
	console.log("you clicked untracked");
	$("#music-history").html("Movie History > Untracked");
	$("#movie-nav-bar > li.active").removeClass("active");
	$(event.target).parent().addClass("active");
});

//show unwatched
$("#to-watch").click((event)=>{
	event.preventDefault();
	console.log('you clicked on show to watch');
	$("#music-history").html("Movie History > To Watch");
	$("#movie-nav-bar > li.active").removeClass("active");
	$(event.target).parent().addClass("active");
	$("#container").html("");
	let userPotato = user.getUser();
	fbData.getUserData(userPotato).then(
		(userdata) => potatoBag(userdata)	
		).then(
		(potatoArray) => {
			dom.printCards(potatoArray);
		});
});

//show watched
$("#watched").click((event)=>{
	event.preventDefault();
	console.log('you clicked on show-watched');
	$("#music-history").html("Movie History > Watched");
	$("#movie-nav-bar > li.active").removeClass("active");
	$(event.target).parent().addClass("active");
});

//add to watchlist
function addButtonListeners(){
	$(".add-to-watchlist").click(function(){
		let movieObj = fbData.makeObj();
		fbData.addMovie(movieObj);
		console.log("you clicked the add button", movieObj);
	});
}

function potatoBag(potato){
	return new Promise((resolve, reject) => { 
	console.log("this is our potato in a bag", potato);
	var potatoArray = [];
	potatoArray = Object.values(potato);
	var potatoObject = {results:potatoArray};
		
		//potatoArray.push(potato.prop);
	console.log("blah", potatoObject);
	resolve (potatoObject);	
	});
	
}

// stars
let stars = ["str1", "str2", "str3", "str4" ]

$(document).on("click", "stars[i]", function(event){
	//console.log('you clicked on a star');
	console.log($(event.target));
	$(this).parents(".js-card").addClass("watched").removeClass("unwatched");
	
    });
//add id to stars 
//console logs clicks to get rating values
//make ajax uptade to watched and now has a rating
	//


// $("#add-song").click(function() {
//   console.log("clicked add song");
//   var songForm = templates.songForm()
//   .then(function(songForm) {
//     $(".uiContainer--wrapper").html(songForm);
//   });




////////	Range bar functionality

$("#ratings-bar").on("change", function(){
	showValue(this.value);
});

function showValue(newValue){
	$("#range").html( newValue);
	console.log("Bar changed!");
}







//////////////////////
//BUILD MOVIE OBJECT//
//////////////////////

// build movie object
// 	sends info to firebase to store (userid, movie title, year, actors, watched boolean, rating[if applicable] )
