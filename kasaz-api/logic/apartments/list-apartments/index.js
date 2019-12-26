const { validate, errors: { NotFoundError } } = require('kasaz-utils')
const { models: { Apartment } } = require('kasaz-data')

module.exports = function(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms) {

  // sincronous validation
  location && validate.string(location)
  minPrice && validate.number(minPrice)
  maxPrice && validate.number(maxPrice)
  minSqm && validate.number(minSqm)
  maxSqm && validate.number(maxSqm)
  bedrooms && validate.number(bedrooms)
  bathrooms && validate.number(bathrooms)

  return (async () => {

    // set default values if undefined is received
    if (!location) location = 'Barcelona'
    if (!minPrice) minPrice = 0
    if (!maxPrice) maxPrice = Number.MAX_SAFE_INTEGER
    if (!minSqm) minSqm = 0
    if (!maxSqm) maxSqm = Number.MAX_SAFE_INTEGER

    let apartments

    apartments = await Apartment.find({ location: { $regex: location, $options: 'i' }, price: { $gte: minPrice, $lte: maxPrice }, sqm: { $gte: minSqm, $lte: maxSqm } }, { __v: 0 }).lean()

    if (bedrooms && !bathrooms) {
      apartments = await Apartment.find({ location: { $regex: location, $options: 'i' }, price: { $gte: minPrice, $lte: maxPrice }, sqm: { $gte: minSqm, $lte: maxSqm }, bedrooms }, { __v: 0 }).lean()
    }

    if (bathrooms && !bedrooms) {
      apartments = await Apartment.find({ location: { $regex: location, $options: 'i' }, price: { $gte: minPrice, $lte: maxPrice }, sqm: { $gte: minSqm, $lte: maxSqm }, bathrooms }, { __v: 0 }).lean()
    }

    if (bathrooms && bedrooms) {
      apartments = await Apartment.find({ location: { $regex: location, $options: 'i' }, price: { $gte: minPrice, $lte: maxPrice }, sqm: { $gte: minSqm, $lte: maxSqm }, bedrooms, bathrooms }, { __v: 0 }).lean()
    }

    if (apartments.length === 0) throw new NotFoundError(`Lo sentimos, no hemos encontrado resultados.`)

    return apartments
  })()
}
