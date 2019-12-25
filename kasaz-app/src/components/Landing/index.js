import React, { useState, useEffect } from 'react';
import './index.sass'
import listApartments from '../../logic/list-apartments'
import Searcher from '../Searcher'
import Card from '../Card'
import Feedback from '../Feedback'

export default function () {
  const [error, setError] = useState()

  useEffect(() => {
  }, [])

  return <>
    <header>
      <img className='logo' src="https://cdn-v2.kasaz.com/assets/logo-227e0bab21561a77c0c3b1156a8f40c39cc4c6c85a769aa758e81a054c56089b.svg"/>
      <Searcher />
    </header>
    <main>
      <ul class='board'>
        <Card />
        { error && <Feedback error={error} /> }
      </ul>
    </main>
  </>
}