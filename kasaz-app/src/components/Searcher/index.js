import React, { useState } from 'react';
import './index.sass'
import FiveOptions from './fiveOptions'
import ListOptions from './listOptions'
import listApartments from '../../logic/list-apartments'

export default function({ onListApartments }) {

  function handleSubmit(event) {
    event.preventDefault()
    const { location: { value: location }, minPrice: { value: minPrice }, maxPrice: { value: maxPrice }, minSqm: { value: minSqm }, maxSqm: { value: maxSqm }, } = event.target

    onListApartments(location, minPrice, maxPrice, minSqm, maxSqm)
  }

  return <>
    <form onSubmit={handleSubmit}>
      <div className='navbar'>
        <input className='navbar__input' type="text" name='location' placeholder="Introduce ciudad o barrio"/>
        <button className='navbar__button'>Buscar</button>
      </div>
      <div className='navbar__filters'>
        <section>
          <p>PRECIO</p>
          <div>
            <ListOptions name='minPrice' description='Min €' isSqm={false} isPrice={true} />
            <p>-</p>
            <ListOptions name='maxPrice' description='Max €' isSqm={false} isPrice={true} />
          </div>
        </section>
        <section>
          <p>TAMAÑO</p>
          <div>
            <ListOptions name='minSqm' description='Min m²' isSqm={true} isPrice={false} />
            <p>-</p>
            <ListOptions name='maxSqm' description='Max m²' isSqm={true} isPrice={false} />
          </div>
        </section>
        <FiveOptions description='HABITACIONES' />
        <FiveOptions description='BAÑOS' />
      </div>
    </form>
  </>
}












