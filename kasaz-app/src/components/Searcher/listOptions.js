import React from 'react';
import constants from './constants'
const { prices,  sqms } = constants

export default function ({ name, description, isSqm, isPrice }) {

  return <>
    <select name={name}>
      <option>{description}</option>
      {isSqm && sqms
        .map((sqm, i) =>
        <option key={i} value={sqm}>{sqm} m²</option>
      )}
      {isPrice && prices
        .map((price, i) =>
          <option key={i} value={price}>{price} €</option>
      )}
    </select>
  </>
}
