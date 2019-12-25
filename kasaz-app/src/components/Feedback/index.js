import React from 'react'
import './index.sass'

export default function({ error }) {
  return (
    <section className="feedback">
      <p className='feedback__message'>{error}</p>
    </section>
  )
}