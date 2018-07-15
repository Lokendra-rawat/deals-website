var needle = require('needle');
var fs = require('fs');
var cheerio = require('cheerio');
var mongoose = require('mongoose');

var deals = require('./Models/deals');



mongoose.connect('mongodb://lokendra:lokendra@ds115166.mlab.com:15166/stories', {
	useMongoClient: true
}, function(err) {
	if (err) console.log(err.name + " => " + err.message);
});

deals.find({}, function(err, data) {
	// console.log(data);

	data.forEach(data => {
		var id = data._id;
		var data = data.dealName;

		(function(id,data) {
			deals.update({
				'_id': id
			}, {
				$set: {
					'spinName' : data
				}
			}, {
				multi: true
			}).exec(function(err, data) {
				if (err) return;
				console.log(data.nModified);
			});
		})(id, data);

	});

}).limit(1000).sort('-_id');