const { Schema } = require('mongoose')

module.exports = new Schema({
  title: {
    type: String
  },
  price: {
    type: Number
  },
  sqm: {
    type: Number
  },
  bedrooms: {
    type: Number
  },
  bathrooms: {
    type: Number
  },
  picture: {
    type: String
  }

})
