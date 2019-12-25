import React, { useState } from 'react';

export default function ({ description, values }) {

  return <>
    <section>
      <p>{description}</p>
      <ul>
        <li className='left-corner' id='selected'>
          <input type='radio'/>
          <label>Todos</label>
        </li>
        <li>
          <input type='radio' value='1'/>
          <label>1</label>
        </li>
        <li>
          <input type='radio' value='2'/>
          <label>2</label>
        </li>
        <li>
          <input type='radio' value='3'/>
          <label>3</label>
        </li>
        <li>
          <input type='radio' value='4'/>
          <label>4</label>
        </li>
        <li className='right-corner'>
          <input type='radio' value='5'/>
          <label>5</label>
        </li>
      </ul>
    </section>
  </>
}









