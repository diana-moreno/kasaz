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

  // set default values if undefined is received
  if (!location) location = 'Barcelona'
  if (!minPrice) minPrice = 0
  if (!maxPrice) maxPrice = Number.MAX_SAFE_INTEGER
  if (!minSqm) minSqm = 0
  if (!maxSqm) maxSqm = Number.MAX_SAFE_INTEGER

  return (async () => {
    let initialQuery = {
      location: { $regex: location, $options: 'i' },
      price: { $gte: minPrice, $lte: maxPrice },
      sqm: { $gte: minSqm, $lte: maxSqm }
    }

    let findParams = []

    if (bedrooms && !bathrooms) {
      findParams.push({ ...initialQuery, bedrooms }, { __v: 0 })
    } else if (bathrooms && !bedrooms) {
      findParams.push({ ...initialQuery, bathrooms }, { __v: 0 })
    } else if (bathrooms && bedrooms) {
      findParams.push({ ...initialQuery, bathrooms, bedrooms }, { __v: 0 })
    } else {
      findParams.push({ ...initialQuery }, { __v: 0 })
    }

    const apartments = await Apartment.find(...findParams).lean()

    if (apartments.length === 0)
      throw new NotFoundError(`Lo sentimos, no hemos encontrado resultados.`)

    return apartments
  })()
}
