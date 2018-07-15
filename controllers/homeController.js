var stores = require("../Models/stores");
var deals = require("../Models/deals");

var page = 2;

exports.home = function(req, res, next) {
  if (req.xhr === true) {
    deals.paginate({}, {
      page: page,
      limit: 20,
      sort: '-_id'
    }, function(err, result) {
      res.json(result.docs);
    });
    page++;
  } else {
    page = 2;
    deals.find({}, {},
      function(err, data) {
        res.render('index', {
          data: data
        });
      }).limit(25).sort('-_id'); 
  }
}

exports.allStores = function(req, res, next) {
  stores.find({}, {
    _id: 0,
    __v: 0
  }, function(err, data) {
    // console.log(data);
    if (err) throw err;
    res.render('allStores', data);
  }).sort({
    storeName: 1
  }).limit(30);
}