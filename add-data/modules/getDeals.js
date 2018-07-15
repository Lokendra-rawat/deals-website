var cheerio = require('cheerio');
var https = require('https');


/* cdn config */
var cloudinary = require('cloudinary');
cloudinary.config({
	cloud_name: 'supremedeals',
	api_key: '686682926945333',
	api_secret: 'Ci23hGKo44rpP0r7zqlgWerGeM8'
});

/* require models */
var store = require('../../Models/stores');
var deal = require('../../Models/deals');

var saveImage = require('./saveImage');

function saveDeal(obj) {
	var deal = new deals(obj);
	deal.save({}, function(err, data) {
		if (err) console.log(err);
		else console.log("deal added");
	})
}

var spintoolurl = "http://seotoolstation.com/article-rewriter/output?data=";

module.exports = function(res) {
	var htm = "";
	res.on('data', data => {
		htm += data;
	});
	res.on('end', _ => {
		var $ = cheerio.load(htm);
		$(".product-name a").each(function(i, element) {
			var imageUrl = element.attribs['href'];
			// if (i >= 1) return;
			console.log(imageUrl);
			https.get(imageUrl, function(res) {
				var htm = "";

				var dealName = "";
				var imageUrl = "";
				// var imageName = "";
				var smallImageUrl = "";
				var bigImageUrl = "";
				var storeName = "";
				var cutPrice = "";
				var mainPrice = "";
				var tags = [];

				res.on('data', data => {
					htm += data;
				});
				res.on('end', _ => {
					console.log('deal page loaded');
					var $ = cheerio.load(htm);
					try {
						dealName = $(".product-details-div h1")[0].children[0].data;
						storeName = $(".sold-by a")[0].children[0].data;
						cutPrice = $(".cut-price-details del")[0].children[0].data.replace("Rs ", "");
						mainPrice = $(".main-price-details")[0].children[0].data.replace("Rs ", "");
						imageUrl = $(".details-image img")[0].attribs['data-original'];

						$(".detals-stores li").each(function(i, element) {
							if (element.type == "tag") {
								let tagName = element.children[0].children[0].data;
								tags.push(tagName);
							}
						});
						var dealUrl = $(".product-description-section strong a")[0].attribs['href'];
						dealUrl = dealUrl.slice(dealUrl.indexOf("=") + 1);
						if (dealUrl.includes('bit.ly')) {
							console.log('bit.ly link detected not adding ');
							return;
						}
					} catch (e) {
						console.log(e.message);
						return;
					}

					deal.find({
						dealName: dealName
					}, function(err, data) {
						if (err) console.log(err);
						if (data.length === 0) {
							cloudinary.uploader.upload(
								imageUrl,
								function(result) {
									bigImageUrl = result.secure_url;
									smallImageUrl = result.eager[0].secure_url;
									// create object for indexing
									var obj = {
										storeName: storeName,
										dealName: dealName,
										smallImageUrl: smallImageUrl,
										bigImageUrl: bigImageUrl,
										mainPrice: mainPrice,
										cutPrice: cutPrice,
										dealUrl: dealUrl,
										tags: tags
									}
									saveDeal(obj);
								}, {
									crop: 'limit',
									width: 2000,
									height: 2000,
									eager: [{
										height: 158,
									}],
									tags: tags
								}
							);
						} else {
							console.log('deal already added');
						}
					});



				}); //end response
			});
		});
	});
}