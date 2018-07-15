const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const mongodb = require('mongoose')
// create the express app

var stores = require("./Models/stores");
var deals = require("./Models/deals");


mongodb.connect('mongodb://lokendra:lokendra@ds115166.mlab.com:15166/stories', {
	useMongoClient: true
}, function(err) {
	if (err) {
		throw err;
	}
});

const app = express();

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.send(200);
	} else {
		next();
	}
});

// create middleware to handle the serving the app
app.use("/", serveStatic(path.join(__dirname, '/public')))
// Catch all routes and redirect to the index file
var page = 1;

app.get('/hello', function(req, res) {
	deals.paginate({}, {
		page: page,
		limit: 10,
		sort: '-_id'
	}, function(err, result) {
		// console.log(res.json(result.docs));
		console.log(result);
		res.json(result.docs);
	});
	page++;
});

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/views/index.html')
});



// Create default port to serve the app on
const port = process.env.PORT || 8080
app.listen(port)
// Log to feedback that this is actually running
// console.log('Server started on port ' + port);

