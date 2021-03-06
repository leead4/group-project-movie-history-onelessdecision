// This file builds the DOM elements for the wrapper section of index.html.
"use strict";

let $ = require ("../lib/node_modules/jquery/dist/jquery.min.js");


//puts cards on the DOM takes ad array of objects (movies)
function printCards(movies) {

	return new Promise((resolve, reject)=>{

		let cards = "",
			counter = 0;

		$("#container").html(""); 

			movies.forEach(movie => {

				 console.log(movie);

			cards += `<div id="${movie.id}" class="thumbnail col-sm-6 col-md-4 untracked">
						<img src="https://image.tmdb.org/t/p/w500${movie.poster}" alt="${movie.title} poster">
						<div class="caption">
							<h3>${movie.title}</h3>
							<p>Originally released: ${movie.date}</p>
							<p>${movie.synopsis}</p>
							<button movieid="${movie.id}" poster="${movie.poster}" title="${movie.title}" date="${movie.date}" plot="${movie.synopsis}" type="button" class="btn btn-default add-to-watchlist">Add to Watch List</button>

							<div class="rating">
							    <span id="str10">☆</span><span id="str9">☆</span><span id="str8">☆</span><span id="str7">☆</span><span id="str6">☆</span><span id="str6">☆</span><span id="str7">☆</span><span id="str8">☆</span><span id="str9">☆</span><span id="str1">☆</span>
							</div>
							<button type="button" class="btn btn-default remove-movie">Remove Movie</button>
						</div>
					  </div>`;

		    counter++;
//every three cards, make a section and prepend it to the container.
		    if (counter % 3 === 0) {
		    var rowCount = 1;
		    $("#container").append(`<section class="row">${cards}</section>`);
		    rowCount ++;
		    cards = "";
		   }

	}); //end forEach

  });//end promise
}//end printCards


module.exports = {printCards};
