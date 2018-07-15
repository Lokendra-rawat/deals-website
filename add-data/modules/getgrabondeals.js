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

var tu = "https://www.grabon.in/deals/";

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
        console.log('aa gya data ');
        var $ = cheerio.load(htm);

        $(".go-pdContent").each(function(i, element) {
            // if (i >= 2) return;

            var dealName = "";
            var imageUrl = "";
            // var imageName = "";
            var smallImageUrl = "";
            var bigImageUrl = "";
            var storeName = "";
            var cutPrice = "";
            var mainPrice = "";
            var tags = [];
            try {
                var dealUrl = element.next.next.attribs['data-href'];
                dealUrl = dealUrl.replace(dealUrl.slice(dealUrl.indexOf('ref')), "");
                var data = element.children.filter(x => x.type === 'tag');
                imageUrl = data[0].children[1].attribs['src'];
                storeName = data[1].attribs['title'];
                dealName = data[2].children[1].children[0].data;
                try {
                   mainPrice  = data[2].children[3].children[0].children[0].data.replace("Rs. ", "");
                   cutPrice  = data[2].children[3].children[2].children[0].data.replace("Rs. ", "");
                }catch(e){
                    //silent error
                }
                tags.push(storeName);

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
        });

    });
}