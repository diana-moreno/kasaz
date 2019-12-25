import React, { useState, useEffect } from 'react';

export default function ({ description, isSqm, isPrice }) {

const prices = [0, 25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000, 225000, 250000, 275000, 300000, 325000, 350000, 375000, 400000, 325000, 350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000, 800000, 900000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000]

const sqms= [0, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140,150, 200, 300]

  useEffect(() => {
  }, [])

  return <>
    <select>
      <option value="">{description}</option>
      {isSqm && sqms.map(sqm =>
        <option value={sqm}>{sqm} m²</option>
      )}
      {isPrice && prices.map(price =>
        <option value={price}>{price} €</option>
      )}
    </select>
  </>
}









