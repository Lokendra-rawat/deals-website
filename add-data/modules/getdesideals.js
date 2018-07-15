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

var tu = "https://www.desidime.com";

function saveDeal(obj) {
    var deal = new deals(obj);
    deal.save({}, function(err, data) {
        if (err) console.log(err);
        else console.log("deal added");
    })
}

module.exports = function(res) {
    var htm = "";
    res.on('data', data => {
        htm += data;
    });
    res.on('end', _ => {
        console.log('aa gya data');
        var $ = cheerio.load(htm);
        $(".deal-dsp a").each(function(i, element) {
            var imageUrl = element.attribs['href'];
            // if (i >= 1) return;
            console.log(tu + imageUrl);
            https.get(tu + imageUrl, function(res) {
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

                        dealName = $(".wcard h1")[0].children[2].data.replace("\n", "");
                        // console.log(dealName);
                        storeName = $(".media-image.store-image-sm")[0].parent.parent['attribs'].href;
                        storeName = storeName.slice(storeName.lastIndexOf('/') + 1);
                        // console.log(storeName);
                        cutPrice = $(".line-through")[0].children[2].data.replace("\n", "");
                        // console.log(cutPrice);

                        mainPrice = $(".dealprice span")[0].children[0].data;
                        // console.log(mainPrice);
                        imageUrl = $(".dealpromoimage")[0].children[0].attribs['src'];

                        // console.log(imageUrl);

                        var tg = $(".list-details a")[0].attribs['href'];
                        tg = tg.slice(tg.lastIndexOf('/') + 1);
                        tags.push(tg);
                        // console.log(tags);

                        var dealUrl = $(".buy_now_tag")[0].attribs['href'];
                        dealUrl = dealUrl.slice(dealUrl.match(/url=/)['index'] + 4)
                        // dealUrl = dealUrl.slice(dealUrl.lastIndexOf("=") + 1);

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
                                        width: 158
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