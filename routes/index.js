var express = require('express');
var router = express.Router();
var faker = require('faker');

/* Databases Models*/
var stores = require("../Models/stores");
var deals = require("../Models/deals");

/* Controllers */
var index = require("../controllers/homeController");

/* GET home page. */

router.get('/', index.home);
router.get('/all-stores', index.allStores);
router.get('/all-categories', function(req, res, next) {
  res.render('catagory', {});
});
router.get('/test', function(req, res, next) {
  res.send('<script src="https://shoptly.com/api/button.js"></script><a href="https://shoptly.com/i/vw7/" class="shoptly-btn" data-color="#4f80db" data-size="20" data-radius="60">Buy Now</a>  ');
});

module.exports = router;