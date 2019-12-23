const { model } = require('mongoose')
const { apartment } = require('./schemas')

module.exports = {
  User: model('Apartment', apartment)
}
