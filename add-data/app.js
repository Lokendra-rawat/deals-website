var cheerio = require('cheerio');
var fs = require('fs');
var https = require('https');
var mongoose = require('mongoose');
var xhrRequest = require('xhr-request');
var needle = require('needle');

/* require models */
var store = require('../Models/stores');
var deal = require('../Models/deals');

/* require functions */
var saveImage = require('./modules/saveImage');
var getFkmDeals = require('./modules/getDeals');
var getDesiDeals = require('./modules/getdesideals');
var getGrabondeals = require('./modules/getgrabondeals');
var addStores = require('./modules/saveStores');
var spinbot = require('./modules/spinbot');

mongoose.connect('mongodb://lokendra:lokendra@ds115166.mlab.com:15166/stories', {
	useMongoClient: true
}, function(err) {
	if (err) console.log(err.name + " => " + err.message);
});

// deal.find({}, saveImage);

var targetUrl = "https://freekaamaal.com/";
var targetUrl2 = "https://www.desidime.com/";
var targetUrl3 = "https://www.grabon.in/deals/";

setInterval(function() {
	https.get(targetUrl, getFkmDeals);
}, 1000 * 60 * 10);

setInterval(function() {
	https.get(targetUrl2, getDesiDeals);
}, 1000 * 60 * 15);

setInterval(function() {
	https.get(targetUrl3, getGrabondeals);
}, 1000 * 60 * 30);


setInterval(spinbot, 1000 * 60 * 12);

// spinbot();

/* add stores */
// fs.readFile('./Stores.html', "utf-8", addStores);