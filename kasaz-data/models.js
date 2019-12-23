const { model } = require('mongoose')
const { apartment } = require('./schemas')

module.exports = {
  Apartment: model('Apartment', apartment)
}
