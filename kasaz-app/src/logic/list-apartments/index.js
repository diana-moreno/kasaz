import call from '../../utils/call'
const { errors: { NotFoundError } } = require('kasaz-utils')
const API_URL = process.env.REACT_APP_API_URL

export default function(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms) {

  return (async () => {
    // building the queryString avoiding undefined or null values
    let string = '/?'

    if(location) string += `location=${location}&`
    if(minPrice) string += `minPrice=${minPrice}&`
    if(maxPrice) string += `maxPrice=${maxPrice}&`
    if(minSqm) string += `minSqm=${minSqm}&`
    if(maxSqm) string += `maxSqm=${maxSqm}&`
    if(bedrooms) string += `bedrooms=${bedrooms}&`
    if(bathrooms) string += `bathrooms=${bathrooms}&`

    const queryString = string.split('').slice(0, string.length-1).join('')

    const res = await call(`${API_URL}/apartments${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.status === 200) return JSON.parse(res.body).apartments
    if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)
    throw new Error(JSON.parse(res.body).message)
  })()
}
