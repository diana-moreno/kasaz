import React, { useState } from 'react';
import { Route } from 'react-router-dom'
import listApartments from '../../logic/list-apartments'
import Landing from '../Landing'

export default function () {
  const [apartments, setApartments] = useState([])

  return <>
     <Route exact path='/' render={() => <Landing />} />

  </>
}
