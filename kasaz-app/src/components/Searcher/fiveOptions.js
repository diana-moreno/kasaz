import React, { useState, useEffect } from 'react';

export default function ({ description, values }) {

  useEffect(() => {
  }, [])

  return <>
    <section>
      <p>{description}</p>
      <ul>
        <li className='left-corner' id='selected'>
          <input type="radio"/>
          <label for="">Todos</label>
        </li>
        <li>
          <input type="radio"/>
          <label for="">1</label>
        </li>
        <li>
          <input type="radio"/>
          <label for="">2</label>
        </li>
        <li>
          <input type="radio"/>
          <label for="">3</label>
        </li>
        <li>
          <input type="radio"/>
          <label for="">4</label>
        </li>
        <li className='right-corner'>
          <input type="radio"/>
          <label for="">5</label>
        </li>
      </ul>
    </section>
  </>
}









