import React, { useState } from 'react';
import './index.sass'
import FiveOptions from './fiveOptions'
import ListOptions from './listOptions'

export default function({ onListApartments }) {
  const [bedrooms, setBedrooms] = useState()
  const [bathrooms, setBathrooms] = useState()

  function handleSubmit(event) {
    event.preventDefault()
    const { location: { value: location }, minPrice: { value: minPrice }, maxPrice: { value: maxPrice }, minSqm: { value: minSqm }, maxSqm: { value: maxSqm }, } = event.target

    onListApartments(location, minPrice, maxPrice, minSqm, maxSqm, bedrooms, bathrooms)
  }

  function handleBedrooms(number) {
    setBedrooms(number)
  }

  function handleBathrooms(number) {
    setBathrooms(number)
  }

  return <>
    <form onSubmit={handleSubmit}>
      <div className='navbar'>
        <input
          className='navbar__input'
          type="text"
          name='location'
          placeholder="Barcelona"
        />
        <button className='navbar__button'>Buscar</button>
      </div>
      <div className='navbar__filters'>
        <section>
          <p>PRECIO</p>
          <div>
            <ListOptions
              name='minPrice'
              description='Min €'
              isSqm={false}
              isPrice={true}
            />
            <p>-</p>
            <ListOptions
              name='maxPrice'
              description='Max €'
              isSqm={false}
              isPrice={true}
            />
          </div>
        </section>
        <section>
          <p>TAMAÑO</p>
          <div>
            <ListOptions
              name='minSqm'
              description='Min m²'
              isSqm={true}
              isPrice={false}
            />
            <p>-</p>
            <ListOptions
              name='maxSqm'
              description='Max m²'
              isSqm={true}
              isPrice={false}
            />
          </div>
        </section>
        <FiveOptions
          description='HABITACIONES'
          onNumberSelected={handleBedrooms}
        />
        <FiveOptions
          description='BAÑOS'
          onNumberSelected={handleBathrooms}
        />
      </div>
    </form>
  </>
}












