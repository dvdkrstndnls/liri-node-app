//dotenv
require('dotenv').config();

//twitter, OMDB and spotify request
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

//user variables
process.argv[2] // command
process.argv[3]  /// search query  plus loop to capture the others   can use condtionals or switch function




//9. Add the code required to import the `keys.js` file and store it in a variable. 
var keys = require("./keys.js") // or is it simply keys.js
console.log(keys);

// var spotify = new Spotify(keys.spotify); //what is wrong with my spotify secret key! its just cut and pasted!
// var client = new Twitter(keys.twitter);


var client = new Twitter(keys.twitter);
 
var params = {screen_name: 'messymountains'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i<tweets.length; i++) {
      console.log(tweets[i].text);
  }
  } else {
    console.log(error);
    
    
  }
});





  //spotify request
 
 
  var spotify = new Spotify(keys.spotify);
  var spotifyQuery = 'the sign ace of base';

 
spotify.search({ type: 'track', query: spotifyQuery }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data.tracks.items[0].album.artists[0].name); 
console.log(data.tracks.items[0].name); 
console.log(data.tracks.items[0].preview_url);
console.log(data.tracks.items[0].album.name);
});





//OMDB

var movieQuery = 'up';

request('http://www.omdbapi.com/?apikey=trilogy&?t=' + movieQuery), function (error, response, body) {
    if(movieQuery) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    console.log("Title: " + JSON.parse(body).title);
    console.log("Year: " + JSON.parse(body).year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).rottenTomatoesRating);
    console.log("Production Country: " + JSON.parse(body).country);
    console.log("Plot: " + JSON.parse(body).plot);
    console.log("Actors: " + JSON.parse(body).actors);

  } else { 
    console.log("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>")
    console.log("It's on Netflix!")
  }

};





//might use this kind of stuff??
// module.exports = Students

//var studemt = require(./keys)

//below is for `node liri.js do-what-it-says`
// Includes the FS package for reading and writing packages
var fs = require("fs");

// Running the readFile module that's inside of fs.
// Stores the read information into the variable "data"
fs.readFile("random.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }

  // Break the string down by comma separation and store the contents into the output array.
  var output = data.split(",");

  // Loop Through the newly created output array
  for (var i = 0; i < output.length; i++) {

    // Print each element (item) of the array/
    console.log(output[i]);
  }
});
