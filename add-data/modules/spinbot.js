var needle = require('needle');
var fs = require('fs');
var cheerio = require('cheerio');
var mongoose = require('mongoose');

var deal = require('../../Models/deals');



// mongoose.connect('mongodb://lokendra:lokendra@ds115166.mlab.com:15166/stories', {
// 	useMongoClient: true
// }, function(err) {
// 	if (err) console.log(err.name + " => " + err.message);
// });

module.exports = function() {
	deals.find({}, function(err, data) {
		// console.log(data);

		data.forEach(data => {
			var id = data._id;
			var data = data.dealName;
			if (!data.spin) {
				needle.post('http://seotoolstation.com/article-rewriter/output', {
						data: data
					},
					function(err, resp, body) {
						var $ = cheerio.load(body);
						try {
							var spindata = $("textarea")[0].children[0].data;
							deals.update({
								'_id': id
							}, {
								$set: {
									'spinName': spindata
								}
							}, {
								multi: true
							}).exec(function(err, data) {
								if (err) return;
								deals.update({
									'_id': id
								}, {
									$set: {
										'spin': true
									}
								}, {
									multi: true
								}).exec(function(err, data) {
									if (err) console.log(err);
									// console.log(data);
									if(data.nModified == 1){
										console.log('deal spinned');
									}else{
										console.log('deal already spinned');
									}
								});
							});
							// console.log(data, id, '\n', spindata);
						} catch (e) {
							//silent
							console.log(e);
						}
					});
			} //endif
			else {
				console.log('already spinned the deal name');
			}

		})

	}).limit(100).sort('-_id');
}