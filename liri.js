 
//dotenv
require('dotenv').config()

//9. Add the code required to import the `keys.js` file and store it in a variable. 
var stuffINeed = require("keys.js") // or is it ./keys.js
console.log(stuffINeed);

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);





//do I need any of the below?
//twitter request
var Twitter = require('twitter');
 
var client = new Twitter(keys.twitter);
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});


  //spotify request
  var Spotify = require('node-spotify-api');
 
  var spotify = new Spotify(keys.spotify);
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});


//OMDB
var request = require('request');
request('http://www.omdbapi.com/?apikey=[yourkey]&', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});



//dotenv
const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})


