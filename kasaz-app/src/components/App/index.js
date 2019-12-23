import React, { useState, useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom'
import './index.sass'
import listApartments from '../../logic/list-apartments'

export default function () {
  const [apartments, setApartments] = useState([])

  useEffect(() => {
    (async () => {
      try {
/*        const apartments = await listApartments('Barcelona', 5, undefined, 100, 200, 4, 2)*/
        const apartments = await listApartments('Barcelona')
        console.log(apartments)
        setApartments(apartments)

      } catch ({ message }) {
        console.log(message)
    /*    setNotification({ error: true, message })*/
      }
    })()
  }, [])

  return <>
    <ul>
    {apartments.map(apartment =>
      <li>
        <h1>{apartment.title}</h1>*
        <p>{apartment.price} €</p>
        <p>{apartment.sqm} m²</p>
        <p>{apartment.bedrooms} dormitorios</p>
        <p>{apartment.bathrooms} baños</p>
        <p>{Math.round(apartment.price / apartment.sqm)} €/m²</p>

        <img src={apartment.picture} />
      </li>
    )}
    </ul>
  </>
}