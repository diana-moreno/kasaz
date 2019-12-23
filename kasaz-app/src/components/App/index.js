import React, { useState, useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom'
import './index.sass'
import listApartments from '../../logic/list-apartments'

export default function () {

  useEffect(() => {
    (async () => {
      try {
        const apartments = await listApartments('Barcelona', 5, undefined, 100, 200, 4, 2)
        console.log(apartments)

      } catch ({ message }) {
        console.log(message)
    /*    setNotification({ error: true, message })*/
      }
    })()
  }, [])

  return <>
    <h1>Hello World</h1>
  </>
}