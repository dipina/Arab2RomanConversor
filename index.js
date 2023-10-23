	/**
* @author @dipina
* http://paginaspersonales.deusto.es/dipina
**/

var controller = require("./controller");
var urlResponseHandlers = require("./urlResponseHandlers");

// Load the express library, which we installed using npm
var express = require("express");
// enabled CORS as documented in https://medium.com/zero-equals-false/using-cors-in-express-cac7e29b005b#:~:text=and%20custom%20headers.-,Enabling%20CORS,using%20the%20cors%20npm%20module.&text=That's%20it.,CORS%20is%20now%20enabled.&text=The%20Access%2DControl%2DAllow%2D,allows%20access%20from%20any%20origin).
var cors = require('cors');
var app = express();
app.use(cors());

// Tell Express we want to serve static files from a 
// particular directory, in this case `./public`. In 
// this app, we're serving the CSS files from `./public/css`
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
	//var _url = url.parse(req.url).pathname;
	// If "/" is requested we have to make a redirect to app.html
	res.redirect("app.html");
	//controller.dispatch(urlResponseHandlers.fetch, req, res);
});

app.get('/retrieveLastConversions', function(req, res) {
	console.log("Retrieving last conversions");
	controller.dispatch(urlResponseHandlers.retrieveLastConversions, req, res);
});

app.get('/convertDecimal2Roman', function(req, res) {
	console.log("Converting from Decimal to Roman");
	controller.dispatch(urlResponseHandlers.convertDecimal2Roman, req, res);
});

app.get('/convertRoman2Decimal', function(req, res) {
	controller.dispatch(urlResponseHandlers.convertRoman2Decimal, req, res);
});



// This is where we actually get the server started. We
// default to port 3000, unless the process has another
// port defined, and we log that we are up and running.
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Listening on " + port);
});



