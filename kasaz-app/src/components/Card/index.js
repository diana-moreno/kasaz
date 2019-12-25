import React, { useState, useEffect } from 'react';
import './index.sass'

export default function () {

  useEffect(() => {
  }, [])

  return <>
    <li>
      <article class='card'>
        <div class='card__image'>
          <img src='https://dywf8esi8sang.cloudfront.net/pictures/cbc4256f93c4ca47e7372336daf43e3e_large.jpg' />
          <div class='card__price'>
            <p class='card__price-total'>280000 €</p>
            <p>3000 €/m²</p>
          </div>
        </div>
        <div class='card__title'>
          <h3>Apartamento luminoso en el centro de Barcelona</h3>
        </div>
        <div class='card__features'>
          <div>
            <i class="fas fa-check-circle"></i>
            <p>85 m²</p>
          </div>
          <p>|</p>
          <div>
            <i class="fas fa-bed"></i>
            <p>2 habs.</p>
          </div>
          <p>|</p>
          <div>
            <i class="fas fa-bath"></i>
            <p>1 baños</p>
          </div>
        </div>
      </article>
    </li>
  </>
}


