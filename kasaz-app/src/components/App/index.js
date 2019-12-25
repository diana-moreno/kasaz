import React from 'react';
import { Route } from 'react-router-dom'
import Landing from '../Landing'

export default function () {
  return <>
     <Route exact path='/' render={() => <Landing />} />
  </>
}
