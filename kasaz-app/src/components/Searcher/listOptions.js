import React, { useState } from 'react';
import constants from './constants'
const { prices,  sqms } = constants

export default function ({ name, description, isSqm, isPrice, onMin, minIndex}) {

  function handleMinIndex(event) {
    const result = Number(event.target.value)
    const list = isPrice ? prices : sqms
    const index = list.indexOf(result)
    onMin(index)
  }

  return <>
    <select name={name} onChange={handleMinIndex}>
      <option>{description}</option>
      {isSqm && sqms
        .slice(minIndex, sqms.length - 1)
        .map(sqm =>
        <option value={sqm}>{sqm} m²</option>
      )}
      {isPrice && prices
        .slice(minIndex, prices.length - 1)
        .map(price =>
        <option value={price}>{price} €</option>
      )}
    </select>
  </>
}









