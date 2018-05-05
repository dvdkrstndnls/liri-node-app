//dotenv
require('dotenv').config();

//load twitter, OMDB and spotify npm packages
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

//user variables
var command = process.argv[2] // command
var query = process.argv[3]  /// search query  plus loop to capture the others   can use condtionals or switch function




//9. Add the code required to import the `keys.js` file and store it in a variable. 
var keys = require("./keys.js") // or is it simply keys.js
console.log(keys);

// var spotify = new Spotify(keys.spotify); //what is wrong with my spotify secret key! its just cut and pasted!
// var client = new Twitter(keys.twitter);


var client = new Twitter(keys.twitter);

// Function for Twitter function
var myTweets = function() {

// Twitter API parameters
var params = {screen_name: 'messymountains',
              count: 20
};
// GET request for last 20 tweets
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i<tweets.length; i++) {
      console.log(tweets[i].text);
  }
  } else {
    console.log(error);
    
    
  }
});
}




// Function for Spotify function
var spotifyThisSong = function() {
//spotify request
var spotify = new Spotify(keys.spotify);
var spotifyQuery = 'the sign ace of base';

 
spotify.search({ type: 'track', query: spotifyQuery }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log("Artist:       " + data.tracks.items[0].album.artists[0].name); 
console.log("Song:         " + data.tracks.items[0].name); 
console.log("Preview Link: " + data.tracks.items[0].preview_url);
console.log("Album:        " + data.tracks.items[0].album.name);
});
}




// Functions for OMDB
var movieThis = function() {
//OMDB
var movieQuery;
if (movieQuery === undefined) {
  movieQuery = "mr nobody";
}

// HTTP GET request
request('http://www.omdbapi.com/?apikey=trilogy&?t=' + movieQuery), function (error, response, body) {
    if(movieQuery) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).rottenTomatoesRating);
    console.log("Production Country: " + JSON.parse(body).Country);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);

  } else { 
    console.log("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>")
    console.log("It's on Netflix!")
  }

};
}


// App functionality due to user input
if(command === "my-tweets") {
	myTweets();
} else if(command === "spotify-this-song") {
	spotifyThisSong(query);
} else if(command === "movie-this") {
	movieThis(query);
} else if(command === "do-what-it-says") {
	// App functionality from file read / loads fs npm package
	var fs = require("fs");

	fs.readFile("random.txt", "utf-8", function(error, data) {
		var command;
		var query;

		// If there is a comma, then we will split the string from file in order to differentiate between the command and query
		// 	--> if there is no comma, then only the command is considered (my-tweets)
		if(data.indexOf(",") !== -1) {
			var dataArr = data.split(",");
			command = dataArr[0];
			query = dataArr[1];
		} else {
			command = data;
		}

		// After reading the command from the file, decides which app function to run
		if(command === "my-tweets") {
			myTweets();
		} else if(command === "spotify-this-song") {
			spotifyThisSong(query);
		} else if(command === "movie-this") {
			movieThis(query);
		} else { // Where the command is not recognized
			console.log("Command from file is not a valid command! Please try again.")
		}
	});
} else if(command === undefined) { // Where no command is given
	console.log("Please enter a command to run this LIRI Bot.")
} else { // use case where command is given but not recognized
  console.log("Hmm, I don't recognize that command. Would you mind trying again?")
}