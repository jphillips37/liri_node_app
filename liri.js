require("dotenv").config();

var Spotify = require("node-spotify-api");
var keys = require("./key.js");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var cutFromArray = process.argv.splice(0, 3);
var input = process.argv.join(" ");

console.log(input);