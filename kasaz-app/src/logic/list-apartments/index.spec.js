const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
import listApartments from '.'
const { random } = Math
const { database, models: { Apartment } } = require('kasaz-data')
const { validate, errors: { NotfoundError } } = require('kasaz-utils')
require('../../helpers/jest-matchers')

describe('logic - list apartments', () => {
  beforeAll(() => database.connect(TEST_DB_URL))

  let insertions, ids, locations, titles, prices, sqms, bedroomsArr, bathroomsArr, pictures, location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms

  beforeEach(async () => {
    // clean data base
    await Promise.all([Apartment.deleteMany()])

    // create 10 apartments
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

    expect(apartments).toBeDefined()
    expect(apartments).toHaveLength(4)

    apartments.forEach(apartment => {
      expect(apartment._id).toBeDefined()
      expect(apartment._id.toString()).toBeOfType('string')
      expect(apartment._id.toString()).toBeOneOf(ids)

      expect(apartment.location).toBeDefined()
      expect(apartment.location).toBeOfType('string')
      expect(apartment.location).toHaveLengthGreaterThan(0)
      expect(apartment.location).toBeOneOf(locations)

      expect(apartment.title).toBeDefined()
      expect(apartment.title).toBeOfType('string')
      expect(apartment.title).toHaveLengthGreaterThan(0)
      expect(apartment.title).toBeOneOf(titles)

      expect(apartment.price).toBeDefined()
      expect(apartment.price).toBeOneOf(prices)

      expect(apartment.sqm).toBeDefined()
      expect(apartment.sqm).toBeOneOf(sqms)

      expect(apartment.bedrooms).toBeDefined()
      expect(apartment.bedrooms).toBeOneOf(bedroomsArr)

      expect(apartment.bathrooms).toBeDefined()
      expect(apartment.bathrooms).toBeOneOf(bathroomsArr)

      expect(apartment.picture).toBeDefined()
      expect(apartment.picture).toBeOneOf(pictures)
      expect(apartment.picture).toBeOfType('string')
      expect(apartment.picture).toHaveLengthGreaterThan(0)
    })

    location = 'Sants'

    apartments = await listApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)

    expect(apartments).toBeDefined()
    expect(apartments).toHaveLength(6)

    apartments.forEach(apartment => {
      expect(apartment._id).toBeDefined()
      expect(apartment._id.toString()).toBeOfType('string')
      expect(apartment._id.toString()).toBeOneOf(ids)

      expect(apartment.location).toBeDefined()
      expect(apartment.location).toBeOfType('string')
      expect(apartment.location).toHaveLengthGreaterThan(0)
      expect(apartment.location).toBeOneOf(locations)

      expect(apartment.title).toBeDefined()
      expect(apartment.title).toBeOfType('string')
      expect(apartment.title).toHaveLengthGreaterThan(0)
      expect(apartment.title).toBeOneOf(titles)

      expect(apartment.price).toBeDefined()
      expect(apartment.price).toBeOneOf(prices)

      expect(apartment.sqm).toBeDefined()
      expect(apartment.sqm).toBeOneOf(sqms)

      expect(apartment.bedrooms).toBeDefined()
      expect(apartment.bedrooms).toBeOneOf(bedroomsArr)

      expect(apartment.bathrooms).toBeDefined()
      expect(apartment.bathrooms).toBeOneOf(bathroomsArr)

      expect(apartment.picture).toBeDefined()
      expect(apartment.picture).toBeOneOf(pictures)
      expect(apartment.picture).toBeOfType('string')
      expect(apartment.picture).toHaveLengthGreaterThan(0)
    })
  })

  it('should succeed on listing apartments with filter price', async () => {
    location = 'Barcelona'
    minPrice = 250000
    maxPrice = 500000

    let apartments = await listApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)

    expect(apartments).toBeDefined()
    expect(apartments).toHaveLength(1)

    apartments.forEach(apartment => {
      expect(apartment._id).toBeDefined()
      expect(apartment._id.toString()).toBeOfType('string')
      expect(apartment._id.toString()).toBeOneOf(ids)

      expect(apartment.location).toBeDefined()
      expect(apartment.location).toBeOfType('string')
      expect(apartment.location).toHaveLengthGreaterThan(0)
      expect(apartment.location).toBeOneOf(locations)

      expect(apartment.title).toBeDefined()
      expect(apartment.title).toBeOfType('string')
      expect(apartment.title).toHaveLengthGreaterThan(0)
      expect(apartment.title).toBeOneOf(titles)

      expect(apartment.price).toBeDefined()
      expect(apartment.price).toBeOneOf(prices)

      expect(apartment.sqm).toBeDefined()
      expect(apartment.sqm).toBeOneOf(sqms)

      expect(apartment.bedrooms).toBeDefined()
      expect(apartment.bedrooms).toBeOneOf(bedroomsArr)

      expect(apartment.bathrooms).toBeDefined()
      expect(apartment.bathrooms).toBeOneOf(bathroomsArr)

      expect(apartment.picture).toBeDefined()
      expect(apartment.picture).toBeOneOf(pictures)
      expect(apartment.picture).toBeOfType('string')
      expect(apartment.picture).toHaveLengthGreaterThan(0)
    })

    location = 'Sants'

    apartments = await listApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)

    expect(apartments).toBeDefined()
    expect(apartments).toHaveLength(4)

    apartments.forEach(apartment => {
      expect(apartment._id).toBeDefined()
      expect(apartment._id.toString()).toBeOfType('string')
      expect(apartment._id.toString()).toBeOneOf(ids)

      expect(apartment.location).toBeDefined()
      expect(apartment.location).toBeOfType('string')
      expect(apartment.location).toHaveLengthGreaterThan(0)
      expect(apartment.location).toBeOneOf(locations)

      expect(apartment.title).toBeDefined()
      expect(apartment.title).toBeOfType('string')
      expect(apartment.title).toHaveLengthGreaterThan(0)
      expect(apartment.title).toBeOneOf(titles)

      expect(apartment.price).toBeDefined()
      expect(apartment.price).toBeOneOf(prices)

      expect(apartment.sqm).toBeDefined()
      expect(apartment.sqm).toBeOneOf(sqms)

      expect(apartment.bedrooms).toBeDefined()
      expect(apartment.bedrooms).toBeOneOf(bedroomsArr)

      expect(apartment.bathrooms).toBeDefined()
      expect(apartment.bathrooms).toBeOneOf(bathroomsArr)

      expect(apartment.picture).toBeDefined()
      expect(apartment.picture).toBeOneOf(pictures)
      expect(apartment.picture).toBeOfType('string')
      expect(apartment.picture).toHaveLengthGreaterThan(0)
    })
  })

  it('should succeed on listing apartments with filter sqm', async () => {
    location = 'Barcelona'
    minSqm = 70
    maxSqm = 100
    minPrice = undefined
    maxPrice = undefined

    let apartments = await listApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)

    expect(apartments).toBeDefined()
    expect(apartments).toHaveLength(2)

    apartments.forEach(apartment => {
      expect(apartment._id).toBeDefined()
      expect(apartment._id.toString()).toBeOfType('string')
      expect(apartment._id.toString()).toBeOneOf(ids)

      expect(apartment.location).toBeDefined()
      expect(apartment.location).toBeOfType('string')
      expect(apartment.location).toHaveLengthGreaterThan(0)
      expect(apartment.location).toBeOneOf(locations)

      expect(apartment.title).toBeDefined()
      expect(apartment.title).toBeOfType('string')
      expect(apartment.title).toHaveLengthGreaterThan(0)
      expect(apartment.title).toBeOneOf(titles)

      expect(apartment.price).toBeDefined()
      expect(apartment.price).toBeOneOf(prices)

      expect(apartment.sqm).toBeDefined()
      expect(apartment.sqm).toBeOneOf(sqms)

      expect(apartment.bedrooms).toBeDefined()
      expect(apartment.bedrooms).toBeOneOf(bedroomsArr)

      expect(apartment.bathrooms).toBeDefined()
      expect(apartment.bathrooms).toBeOneOf(bathroomsArr)

      expect(apartment.picture).toBeDefined()
      expect(apartment.picture).toBeOneOf(pictures)
      expect(apartment.picture).toBeOfType('string')
      expect(apartment.picture).toHaveLengthGreaterThan(0)
    })

    location = 'Sants'

    apartments = await listApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)

    expect(apartments).toBeDefined()
    expect(apartments).toHaveLength(5)

    apartments.forEach(apartment => {
      expect(apartment._id).toBeDefined()
      expect(apartment._id.toString()).toBeOfType('string')
      expect(apartment._id.toString()).toBeOneOf(ids)

      expect(apartment.location).toBeDefined()
      expect(apartment.location).toBeOfType('string')
      expect(apartment.location).toHaveLengthGreaterThan(0)
      expect(apartment.location).toBeOneOf(locations)

      expect(apartment.title).toBeDefined()
      expect(apartment.title).toBeOfType('string')
      expect(apartment.title).toHaveLengthGreaterThan(0)
      expect(apartment.title).toBeOneOf(titles)

      expect(apartment.price).toBeDefined()
      expect(apartment.price).toBeOneOf(prices)

      expect(apartment.sqm).toBeDefined()
      expect(apartment.sqm).toBeOneOf(sqms)

      expect(apartment.bedrooms).toBeDefined()
      expect(apartment.bedrooms).toBeOneOf(bedroomsArr)

      expect(apartment.bathrooms).toBeDefined()
      expect(apartment.bathrooms).toBeOneOf(bathroomsArr)

      expect(apartment.picture).toBeDefined()
      expect(apartment.picture).toBeOneOf(pictures)
      expect(apartment.picture).toBeOfType('string')
      expect(apartment.picture).toHaveLengthGreaterThan(0)
    })
  })

  it('should succeed on listing apartments with filter bedrooms', async () => {
    location = 'Barcelona'
    minSqm = undefined
    maxSqm = undefined
    minPrice = undefined
    maxPrice = undefined
    bedrooms = 1

    let apartments = await listApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)

    expect(apartments).toBeDefined()
    expect(apartments).toHaveLength(1)

    apartments.forEach(apartment => {
      expect(apartment._id).toBeDefined()
      expect(apartment._id.toString()).toBeOfType('string')
      expect(apartment._id.toString()).toBeOneOf(ids)

      expect(apartment.location).toBeDefined()
      expect(apartment.location).toBeOfType('string')
      expect(apartment.location).toHaveLengthGreaterThan(0)
      expect(apartment.location).toBeOneOf(locations)

      expect(apartment.title).toBeDefined()
      expect(apartment.title).toBeOfType('string')
      expect(apartment.title).toHaveLengthGreaterThan(0)
      expect(apartment.title).toBeOneOf(titles)

      expect(apartment.price).toBeDefined()
      expect(apartment.price).toBeOneOf(prices)

      expect(apartment.sqm).toBeDefined()
      expect(apartment.sqm).toBeOneOf(sqms)

      expect(apartment.bedrooms).toBeDefined()
      expect(apartment.bedrooms).toBeOneOf(bedroomsArr)

      expect(apartment.bathrooms).toBeDefined()
      expect(apartment.bathrooms).toBeOneOf(bathroomsArr)

      expect(apartment.picture).toBeDefined()
      expect(apartment.picture).toBeOneOf(pictures)
      expect(apartment.picture).toBeOfType('string')
      expect(apartment.picture).toHaveLengthGreaterThan(0)
    })

    location = 'Sants'

    apartments = await listApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)

    expect(apartments).toBeDefined()
    expect(apartments).toHaveLength(2)

    apartments.forEach(apartment => {
      expect(apartment._id).toBeDefined()
      expect(apartment._id.toString()).toBeOfType('string')
      expect(apartment._id.toString()).toBeOneOf(ids)

      expect(apartment.location).toBeDefined()
      expect(apartment.location).toBeOfType('string')
      expect(apartment.location).toHaveLengthGreaterThan(0)
      expect(apartment.location).toBeOneOf(locations)

      expect(apartment.title).toBeDefined()
      expect(apartment.title).toBeOfType('string')
      expect(apartment.title).toHaveLengthGreaterThan(0)
      expect(apartment.title).toBeOneOf(titles)

      expect(apartment.price).toBeDefined()
      expect(apartment.price).toBeOneOf(prices)

      expect(apartment.sqm).toBeDefined()
      expect(apartment.sqm).toBeOneOf(sqms)

      expect(apartment.bedrooms).toBeDefined()
      expect(apartment.bedrooms).toBeOneOf(bedroomsArr)

      expect(apartment.bathrooms).toBeDefined()
      expect(apartment.bathrooms).toBeOneOf(bathroomsArr)

      expect(apartment.picture).toBeDefined()
      expect(apartment.picture).toBeOneOf(pictures)
      expect(apartment.picture).toBeOfType('string')
      expect(apartment.picture).toHaveLengthGreaterThan(0)
    })
  })

  it('should succeed on listing apartments with filter bathrooms', async () => {
    location = 'Barcelona'
    minSqm = undefined
    maxSqm = undefined
    minPrice = undefined
    maxPrice = undefined
    bedrooms = undefined
    bathrooms = 2

    let apartments = await listApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)

    expect(apartments).toBeDefined()
    expect(apartments).toHaveLength(1)

    apartments.forEach(apartment => {
      expect(apartment._id).toBeDefined()
      expect(apartment._id.toString()).toBeOfType('string')
      expect(apartment._id.toString()).toBeOneOf(ids)

      expect(apartment.location).toBeDefined()
      expect(apartment.location).toBeOfType('string')
      expect(apartment.location).toHaveLengthGreaterThan(0)
      expect(apartment.location).toBeOneOf(locations)

      expect(apartment.title).toBeDefined()
      expect(apartment.title).toBeOfType('string')
      expect(apartment.title).toHaveLengthGreaterThan(0)
      expect(apartment.title).toBeOneOf(titles)

      expect(apartment.price).toBeDefined()
      expect(apartment.price).toBeOneOf(prices)

      expect(apartment.sqm).toBeDefined()
      expect(apartment.sqm).toBeOneOf(sqms)

      expect(apartment.bedrooms).toBeDefined()
      expect(apartment.bedrooms).toBeOneOf(bedroomsArr)

      expect(apartment.bathrooms).toBeDefined()
      expect(apartment.bathrooms).toBeOneOf(bathroomsArr)

      expect(apartment.picture).toBeDefined()
      expect(apartment.picture).toBeOneOf(pictures)
      expect(apartment.picture).toBeOfType('string')
      expect(apartment.picture).toHaveLengthGreaterThan(0)
    })

    location = 'Sants'

    apartments = await listApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)

    expect(apartments).toBeDefined()
    expect(apartments).toHaveLength(2)

    apartments.forEach(apartment => {
      expect(apartment._id).toBeDefined()
      expect(apartment._id.toString()).toBeOfType('string')
      expect(apartment._id.toString()).toBeOneOf(ids)

      expect(apartment.location).toBeDefined()
      expect(apartment.location).toBeOfType('string')
      expect(apartment.location).toHaveLengthGreaterThan(0)
      expect(apartment.location).toBeOneOf(locations)

      expect(apartment.title).toBeDefined()
      expect(apartment.title).toBeOfType('string')
      expect(apartment.title).toHaveLengthGreaterThan(0)
      expect(apartment.title).toBeOneOf(titles)

      expect(apartment.price).toBeDefined()
      expect(apartment.price).toBeOneOf(prices)

      expect(apartment.sqm).toBeDefined()
      expect(apartment.sqm).toBeOneOf(sqms)

      expect(apartment.bedrooms).toBeDefined()
      expect(apartment.bedrooms).toBeOneOf(bedroomsArr)

      expect(apartment.bathrooms).toBeDefined()
      expect(apartment.bathrooms).toBeOneOf(bathroomsArr)

      expect(apartment.picture).toBeDefined()
      expect(apartment.picture).toBeOneOf(pictures)
      expect(apartment.picture).toBeOfType('string')
      expect(apartment.picture).toHaveLengthGreaterThan(0)
    })
  })

  it('should succeed on listing apartments with filter location, price, sqm, bedrooms and bathrooms at same time', async () => {
    location = 'Sants'
    minSqm = 70
    maxSqm = 90
    minPrice = 95000
    maxPrice = 250000
    bedrooms = 3
    bathrooms = 3

    let apartments = await listApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)

    expect(apartments).toBeDefined()
    expect(apartments).toHaveLength(1)

    apartments.forEach(apartment => {
      expect(apartment._id).toBeDefined()
      expect(apartment._id.toString()).toBeOfType('string')
      expect(apartment._id.toString()).toBeOneOf(ids)

      expect(apartment.location).toBeDefined()
      expect(apartment.location).toBeOfType('string')
      expect(apartment.location).toHaveLengthGreaterThan(0)
      expect(apartment.location).toBeOneOf(locations)

      expect(apartment.title).toBeDefined()
      expect(apartment.title).toBeOfType('string')
      expect(apartment.title).toHaveLengthGreaterThan(0)
      expect(apartment.title).toBeOneOf(titles)

      expect(apartment.price).toBeDefined()
      expect(apartment.price).toBeOneOf(prices)

      expect(apartment.sqm).toBeDefined()
      expect(apartment.sqm).toBeOneOf(sqms)

      expect(apartment.bedrooms).toBeDefined()
      expect(apartment.bedrooms).toBeOneOf(bedroomsArr)

      expect(apartment.bathrooms).toBeDefined()
      expect(apartment.bathrooms).toBeOneOf(bathroomsArr)

      expect(apartment.picture).toBeDefined()
      expect(apartment.picture).toBeOneOf(pictures)
      expect(apartment.picture).toBeOfType('string')
      expect(apartment.picture).toHaveLengthGreaterThan(0)
    })
  })


  it('should fail on listing apartments with filter location, price, sqm, bedrooms and bathrooms at same time and no apartments for this filters', async () => {
    location = 'Barcelona'
    minSqm = 70
    maxSqm = 90
    minPrice = 95000
    maxPrice = 250000
    bedrooms = 3
    bathrooms = 3

    try {
      await listApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)

      throw new Error('should not reach this point')
    } catch (error) {
        expect(error).toBeDefined()
/*        expect(error).to.be.an.instanceOf(NotFoundError)*/
        expect(error.message).toBe(`Lo sentimos, no hemos encontrado resultados.`)
    }
  })

  afterAll(() => Promise.all([Apartment.deleteMany()]).then(database.disconnect))
})
