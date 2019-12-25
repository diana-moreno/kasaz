import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import listApartments from '../../logic/list-apartments'
import Landing from '../Landing'

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
     <Route exact path='/' render={() => <Landing />} />

  </>
}
