require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const command = process.argv[2];
const selection = process.argv[3];

switch (command) {
  // Search Spotify API For A Song
  case "spotify-this-song":
    spotify.search({ type: "track", query: selection }, function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      //console.log(data);
      const results = data.tracks.items;
      // console.log("---------------- FULL OBJECT START -----------------");
      // console.log(results[0]);
      // console.log("---------------- FULL OBJECT END -----------------");
      // console.log(results[0].album.artists);
      console.log(results[0].album.name);
      console.log(results[0].name);
      console.log(results[0].preview_url);
      console.log(results[0].album.uri);
    });
    break;
  // Search OMBD API For A Movie
  case "movie-this":
    // console.log("movies");
    const queryURL =
      "https://www.omdbapi.com/?t=" +
      selection +
      "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(function(response) {
      console.log("Movie Title: ", response.data.Title);
      console.log("Year of Release:", response.data.Year);
      console.log("IMBD Rating:", response.data.imdbRating);
      console.log(
        "Rotten Tomatoes Rating:",
        getRottenTomatoesRating(response.data.Ratings)
      );
      console.log("Country:", response.data.Country);
      console.log("Language:", response.data.Language);
      console.log("Plot:", response.data.Plot);
      console.log("Actors:", response.data.Actors);
      
    });
    break;
  case "do-what-it-says":
    console.log("random");
    break;
  default:
    break;
}

// Helper Function For Rotten Tomatoes Ratings Using OMBD API
function getRottenTomatoesRating(arrOfRatings) {
  for (let index = 0; index < arrOfRatings.length; index++) {
    const element = arrOfRatings[index];
    if (element.Source === "Rotten Tomatoes") {
      return element.Value;
    }
  }
  // End Of Helper Function
  return null;
}

// COMMAND AND PATH TO RUN FOR TESTING
// mbd07@SamLordsEstate MINGW64 ~/OneDrive/Desktop/My-Repo/LIRI BOT Homework/liri-node-app (master)
// node liri.js spotify-this-song 'you should see me now'

/* Artist(s)
 * The song's name
 * A preview link of the song from Spotify
 * The album that the song is from
 * If no song is provided then choose a default song to submit to the API. */

// COMMAND AND PATH TO RUN FOR TESTING
/* node liri.js movie-this '<movie name here>'`

* This will output the following information to your terminal/bash window:

  ```
    * Title of the movie. (t)
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.

 // AXIOS OMBD URL - var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
 // Path to Solution - C:\Users\mbd07\OneDrive\Desktop\My-Repo\09-nodejs\01-Activities\18-OMDB_Axios_Students\Solved
 // OMBD URL - http://www.omdbapi.com/

 /* Axios is a javaScript library that works the same way in both a server side, as well as client side environment. 
 In the npm package the axios.js file that will work in both environments is in the dist folder. */

// INITIAL COMMANDS:
// npm install axios
// npm init -y

// AXIOS EXAMPLE
/* // INSTRUCTIONS:
// ---------------------------------------------------------------------------------------------------------
// Level 1:
// Take any movie with a word title (ex: Cinderella) as a Node argument and retrieve the year it was created

// Level 2 (More Challenging):
// Take a move with multiple words (ex: Forrest Gump) as a Node argument and retrieve the year it was created.
// ---------------------------------------------------------------------------------------------------------

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

// Grab the movieName which will always be the third node argument.
var movieName = process.argv[2];

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Release Year: " + response.data.Year);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  }); */
