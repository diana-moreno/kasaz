import React, { useState, useEffect } from 'react';
import constants from './constants'
const { prices,  sqms } = constants
export default function ({ name, description, isSqm, isPrice }) {

  useEffect(() => {
  }, [])

  return <>
    <select name={name}>
      <option>{description}</option>
      {isSqm && sqms.map(sqm =>
        <option value={sqm}>{sqm} m²</option>
      )}
      {isPrice && prices.map(price =>
        <option value={price}>{price} €</option>
      )}
    </select>
  </>
}









