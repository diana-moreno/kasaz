import React, { useState, useEffect } from 'react';

export default function ({ description, onNumberSelected }) {
  const [number, setNumber] = useState('Todos')

  useEffect(() => {
    onNumberSelected(number)
  }, [number])

  function handleNumber(event) { setNumber(event.target.value) }

  return <>
    <section>
      <p>{description}</p>
      <ul>
        <li>
          <input
            id={`${description}-todos`}
            name={`${description}-quantity`}
            type='radio'
            value='Todos'
            onChange={handleNumber}
            checked={number === 'Todos'}
          />
          <label className='left-corner' htmlFor={`${description}-todos`}>
            Todos
          </label>
        </li>
        <li>
          <input
            id={`${description}-1`}
            name={`${description}-quantity`}
            type='radio'
            value='1'
            onChange={handleNumber}
          />
          <label htmlFor={`${description}-1`}>1</label>
        </li>
        <li>
          <input
            id={`${description}-2`}
            name={`${description}-quantity`}
            type='radio'
            value='2'
            onChange={handleNumber}
          />
          <label htmlFor={`${description}-2`}>2</label>
        </li>
        <li>
          <input
            id={`${description}-3`}
            name={`${description}-quantity`}
            type='radio'
            value='3'
            onChange={handleNumber}
          />
          <label htmlFor={`${description}-3`}>3</label>
        </li>
        <li>
          <input
            id={`${description}-4`}
            name={`${description}-quantity`}
            type='radio'
            value='4'
            onChange={handleNumber}
          />
          <label htmlFor={`${description}-4`}>4</label>
        </li>
        <li>
          <input
            id={`${description}-5`}
            name={`${description}-quantity`}
            type='radio'
            value='5'
            onChange={handleNumber}
          />
          <label className='right-corner' htmlFor={`${description}-5`}>
            5
          </label>
        </li>
      </ul>
    </section>
  </>
}
