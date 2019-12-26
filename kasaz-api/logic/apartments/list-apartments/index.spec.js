require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const listApartments = require('.')
const { random, floor } = Math
const { database, models: { Apartment } } = require('kasaz-data')
const { validate, errors: { NotfoundError } } = require('kasaz-utils')

describe('logic - list apartments', () => {
  before(() => database.connect(TEST_DB_URL))

  let insertions, ids, locations, titles, prices, sqms, bedroomsArr, bathroomsArr, pictures, location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms

  beforeEach(async () => {
    // clean data base
    await Promise.all([Apartment.deleteMany()])

    // create apartments
    const insertions = []
    ids = []
    titles = []
    locations = ['Barcelona', 'Sants', 'Sants', 'Barcelona', 'Sants', 'Sants', 'Barcelona', 'Sants', 'Sants', 'Barcelona']
    prices = [95000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 500000, 550000]
    sqms = [65, 70, 75, 80, 85, 90, 95, 100, 150, 200]
    bedroomsArr = [1, 2, 3, 4, 1, 2, 3, 4,  1, 2]
    bathroomsArr = [1, 2, 3, 4, 1, 2, 3, 4,  1, 2]
    pictures = []

    for (let i = 0; i < 10; i++) {
      const apartment = {
        location: locations[i],
        title: `title-${random()}`,
        price: prices[i],
        sqm: sqms[i],
        bedrooms: bedroomsArr[i],
        bathrooms: bathroomsArr[i],
        picture: `picture-${random()}`
      }
      const currentApartment = await Apartment.create(apartment)

      insertions.push(currentApartment)
      ids.push(currentApartment._id.toString())
      titles.push(currentApartment.title)
      pictures.push(currentApartment.picture)
    }

    await Promise.all(insertions)
  })

  it('should succeed on listing apartments with filter location', async () => {
    location = 'Barcelona'
    minPrice = undefined
    maxPrice = undefined
    minSqm = undefined
    maxSqm = undefined
    bedrooms = undefined
    bathrooms = undefined

    let apartments = await listApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)

    expect(apartments).to.exist
    expect(apartments).to.have.lengthOf(4)

    apartments.forEach(apartment => {
      expect(apartment._id).to.exist
      expect(apartment._id.toString()).to.be.a('string')
      expect(apartment._id.toString()).be.oneOf(ids)

      expect(apartment.location).to.exist
      expect(apartment.location).to.be.a('string')
      expect(apartment.location).to.have.length.greaterThan(0)
      expect(apartment.location).be.oneOf(locations)

      expect(apartment.title).to.exist
      expect(apartment.title).to.be.a('string')
      expect(apartment.title).to.have.length.greaterThan(0)
      expect(apartment.title).be.oneOf(titles)

      expect(apartment.price).to.exist
      expect(apartment.price).be.oneOf(prices)

      expect(apartment.sqm).to.exist
      expect(apartment.sqm).be.oneOf(sqms)

      expect(apartment.bedrooms).to.exist
      expect(apartment.bedrooms).be.oneOf(bedroomsArr)

      expect(apartment.bathrooms).to.exist
      expect(apartment.bathrooms).be.oneOf(bathroomsArr)

      expect(apartment.picture).to.exist
      expect(apartment.picture).be.oneOf(pictures)
      expect(apartment.picture).to.be.a('string')
      expect(apartment.picture).to.have.length.greaterThan(0)
    })

    location = 'Sants'

    apartments = await listApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)

    expect(apartments).to.exist
    expect(apartments).to.have.lengthOf(6)

    apartments.forEach(apartment => {
      expect(apartment._id).to.exist
      expect(apartment._id.toString()).to.be.a('string')
      expect(apartment._id.toString()).be.oneOf(ids)

      expect(apartment.location).to.exist
      expect(apartment.location).to.be.a('string')
      expect(apartment.location).to.have.length.greaterThan(0)
      expect(apartment.location).be.oneOf(locations)

      expect(apartment.title).to.exist
      expect(apartment.title).to.be.a('string')
      expect(apartment.title).to.have.length.greaterThan(0)
      expect(apartment.title).be.oneOf(titles)

      expect(apartment.price).to.exist
      expect(apartment.price).be.oneOf(prices)

      expect(apartment.sqm).to.exist
      expect(apartment.sqm).be.oneOf(sqms)

      expect(apartment.bedrooms).to.exist
      expect(apartment.bedrooms).be.oneOf(bedroomsArr)

      expect(apartment.bathrooms).to.exist
      expect(apartment.bathrooms).be.oneOf(bathroomsArr)

      expect(apartment.picture).to.exist
      expect(apartment.picture).be.oneOf(pictures)
      expect(apartment.picture).to.be.a('string')
      expect(apartment.picture).to.have.length.greaterThan(0)
    })
  })

  it('should succeed on listing apartments with filter price', async () => {
    location = 'Barcelona'
    minPrice = 250000
    maxPrice = 500000
debugger
    let apartments = await listApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)

    expect(apartments).to.exist
    expect(apartments).to.have.lengthOf(1)

    apartments.forEach(apartment => {
      expect(apartment._id).to.exist
      expect(apartment._id.toString()).to.be.a('string')
      expect(apartment._id.toString()).be.oneOf(ids)

      expect(apartment.location).to.exist
      expect(apartment.location).to.be.a('string')
      expect(apartment.location).to.have.length.greaterThan(0)
      expect(apartment.location).be.oneOf(locations)

      expect(apartment.title).to.exist
      expect(apartment.title).to.be.a('string')
      expect(apartment.title).to.have.length.greaterThan(0)
      expect(apartment.title).be.oneOf(titles)

      expect(apartment.price).to.exist
      expect(apartment.price).be.oneOf(prices)

      expect(apartment.sqm).to.exist
      expect(apartment.sqm).be.oneOf(sqms)

      expect(apartment.bedrooms).to.exist
      expect(apartment.bedrooms).be.oneOf(bedroomsArr)

      expect(apartment.bathrooms).to.exist
      expect(apartment.bathrooms).be.oneOf(bathroomsArr)

      expect(apartment.picture).to.exist
      expect(apartment.picture).be.oneOf(pictures)
      expect(apartment.picture).to.be.a('string')
      expect(apartment.picture).to.have.length.greaterThan(0)
    })

    location = 'Sants'
debugger
    apartments = await listApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)

    expect(apartments).to.exist
    expect(apartments).to.have.lengthOf(4)

    apartments.forEach(apartment => {
      expect(apartment._id).to.exist
      expect(apartment._id.toString()).to.be.a('string')
      expect(apartment._id.toString()).be.oneOf(ids)

      expect(apartment.location).to.exist
      expect(apartment.location).to.be.a('string')
      expect(apartment.location).to.have.length.greaterThan(0)
      expect(apartment.location).be.oneOf(locations)

      expect(apartment.title).to.exist
      expect(apartment.title).to.be.a('string')
      expect(apartment.title).to.have.length.greaterThan(0)
      expect(apartment.title).be.oneOf(titles)

      expect(apartment.price).to.exist
      expect(apartment.price).be.oneOf(prices)

      expect(apartment.sqm).to.exist
      expect(apartment.sqm).be.oneOf(sqms)

      expect(apartment.bedrooms).to.exist
      expect(apartment.bedrooms).be.oneOf(bedroomsArr)

      expect(apartment.bathrooms).to.exist
      expect(apartment.bathrooms).be.oneOf(bathroomsArr)

      expect(apartment.picture).to.exist
      expect(apartment.picture).be.oneOf(pictures)
      expect(apartment.picture).to.be.a('string')
      expect(apartment.picture).to.have.length.greaterThan(0)
    })
  })

// fail with some cases
  after(() => Promise.all([Apartment.deleteMany()]).then(database.disconnect))
})
