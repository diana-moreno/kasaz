import React, { useState, useEffect } from 'react';
import './index.sass'
import FiveOptions from './fiveOptions'
import ListOptions from './listOptions'

export default function () {

  useEffect(() => {
  }, [])

  return <>
    <form action="">
      <div className='navbar'>
        <input className='navbar__input' type="text" placeholder="Introduce ciudad o barrio"/>
        <button className='navbar__button'>Buscar</button>
      </div>
      <div className='navbar__filters'>
        <section>
          <p>PRECIO</p>
          <div>
            <ListOptions description='Min €' isSqm={false} isPrice={true} />
            <p>-</p>
            <ListOptions description='Max €' isSqm={false} isPrice={true} />
          </div>
        </section>
        <section>
          <p>TAMAÑO</p>
          <div>
            <ListOptions description='Min m²' isSqm={true} isPrice={false} />
            <p>-</p>
            <ListOptions description='Max m²' isSqm={true} isPrice={false} />
          </div>
        </section>
        <FiveOptions description='HABITACIONES' />
        <FiveOptions description='BAÑOS' />
      </div>
    </form>
  </>
}












