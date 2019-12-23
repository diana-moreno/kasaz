const { Schema } = require('mongoose')

module.exports = new Schema({
  location: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  sqm: {
    type: Number,
    require: true
  },
  bedrooms: {
    type: Number,
    require: true
  },
  bathrooms: {
    type: Number,
    require: true
  },
  picture: {
    type: String,
    require: true
  }

})
