const { Router } = require('express')
const { listApartments } = require('../../logic')
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('kasaz-utils')
const jsonBodyParser = bodyParser.json()
const router = Router()


router.get('/', jsonBodyParser, (req, res) => {
  try {
  const { body: { location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms} } = req
    listApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)
      .then(apartments => res.json({ apartments }))
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })
        if (error instanceof ConflictError)
          return res.status(409).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

module.exports = router