import React, { useState } from 'react';
import './index.sass'
import listApartments from '../../logic/list-apartments'
import Searcher from '../Searcher'
import Card from '../Card'
import Feedback from '../Feedback'

export default function () {
  const [error, setError] = useState()
  const [apartments, setApartments] = useState([])

  async function handleListApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms) {
    setError()
    setApartments([])

    try {
      const apartments = await listApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)
      setApartments(apartments)
    } catch(error) {
      setError(error.message)
    }
  }

  return <>
    <header>
      <img className='logo' src="https://cdn-v2.kasaz.com/assets/logo-227e0bab21561a77c0c3b1156a8f40c39cc4c6c85a769aa758e81a054c56089b.svg" alt='logo kasaz' />
      <Searcher onListApartments={handleListApartments} />
    </header>
    <main>
      <ul className='board'>
        { apartments.map(apartment =>
          <Card key={apartment._id} apartment={apartment} />)
        }
        { error && <Feedback error={error} /> }
      </ul>
    </main>
  </>
}
