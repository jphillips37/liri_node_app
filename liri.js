require("dotenv").config();

var moment = require("moment");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var command = process.argv[2];
var cutFromArray = process.argv.splice(0, 3);  // saving these values in case I need them later. probably won't
var input = process.argv.join(" ");

function checkCommand(command, input) {
    switch (command) {
        case "concert-this":
            concertThis(input);
            break;
        case "spotify-this-song":
            spotifyThisSong(input);
            break;
        case "movie-this":
            movieThis(input);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}

function concertThis(band) {
    bandUrlName = band.replace(/ /g, "+");
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandUrlName + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(function(response){
        concertDate = moment(response.data[0].datetime).format("MM/DD/YYYY");
    
        console.log(" ");
        console.log("----------------------");
        console.log("Next Concert for " + band + ":")
        console.log("Venue: " + response.data[0].venue.name);
        console.log("Location: " + response.data[0].venue.city+", "+response.data[0].venue.country);
        console.log("Date: "+concertDate);
        console.log("----------------------");
        console.log(" ");
    })
} // concertThis(input);

function spotifyThisSong(songName){
    if (typeof songName !== 'undefined' && songName){
        
    }
    else {
        songName = "the sign ace of base"
    }
    spotify.search({ type: 'track', query: songName, limit: 1 }).then(function(response) {
        //console.log(response.tracks.items[0].album.name);
        console.log(" ");
        console.log("----------------------");
        console.log("Artist: " + response.tracks.items[0].artists[0].name);
        console.log("Song Name: " + response.tracks.items[0].name);
        console.log("Preview Link: " + response.tracks.items[0].external_urls.spotify);
        console.log("Album: " + response.tracks.items[0].album.name)
        console.log("----------------------");
        console.log(" ");
        })
        .catch(function(err) {
            console.log(err);
        });
} //spotifyThisSong(input);

function movieThis(input){
    if (typeof input !== 'undefined' && input){
        
    }
    else {
        input = "Mr. Nobody"
    }

    input = input.replace(/ /g, "+");

    var queryUrl = "http://www.omdbapi.com/?apikey=5ef02536&t="+input;

    axios.get(queryUrl).then(function(response){
        console.log(" ");
        console.log("----------------------");
        console.log("Title: " + response.data.Title);
        console.log("Released: " + response.data.Year)
        console.log("IMDB Rating: " + response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country of Origin: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Cast: " + response.data.Actors);
        console.log("----------------------");
        console.log(" ");
    })
} //movieThis(input);

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if (err){
            console.log(err);
        }
        else {
            var output = data.split(",");
            checkCommand(output[0], output[1]);
        }
    })
}
checkCommand(command, input);