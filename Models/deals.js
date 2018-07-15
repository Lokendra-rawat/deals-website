var mongodb = require('mongoose');
var mp = require('mongoose-paginate');

var Schema = mongodb.Schema;

var deal = mongodb.Schema({
  storeName: {
    type: String,
    required: true,
    unique: false
  },
  dealName: {
    type: String,
    required: true
  },
  spinName: {
    type: String,
    required: false
  },
  smallImageUrl: {
    type: String,
    required: false
  },
  bigImageUrl: {
    type: String,
    required: false
  },
  mainPrice: {
    type: Number,
    required: false
  },
  cutPrice: {
    type: Number,
    required: false
  },
  dealUrl: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: false
  },
  spin:{
    type: Boolean,
    required: false
  }
});

deal.plugin(mp);
module.exports = deals = mongodb.model('deals', deal);