import call from '../../utils/call'
const { validate, errors: { NotFoundError, CredentialsError } } = require('kasaz-util')
const API_URL = process.env.REACT_APP_API_URL

export default function(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms) {

  location && validate.string(location)
  minPrice && validate.number(minPrice)
  maxPrice && validate.number(maxPrice)
  minSize && validate.number(minSize)
  maxSize && validate.number(maxSize)
  bedrooms && validate.number(bedrooms)
  bathrooms && validate.number(bathrooms)

  return (async () => {
    const res = await call(`${API_URL}/apartments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms })
    })

    if (res.status === 200) return JSON.parse(res.body).apartments
    if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)
    if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)
    throw new Error(JSON.parse(res.body).message)
  })()
}
