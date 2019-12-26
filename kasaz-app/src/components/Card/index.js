import React from 'react';
import './index.sass'

export default function({ apartment }) {
  const { location, title, price, sqm, bedrooms, bathrooms, picture } = apartment
  const relativePrice = parseInt(price / sqm)

  return <>
    <li>
      <article className='card'>
        <div className='card__image'>
          <img src={picture} alt='flat' />
          <div className='card__info'>
            <div className='card__location'>
              <p>{location}</p>
            </div>
            <div className='card__price'>
              <p className='card__price-total'>{price} €  / </p>
              <p>{relativePrice} €/m²</p>
            </div>
          </div>
        </div>
        <div className='card__title'>
          <h3>{title}</h3>
        </div>
        <div className='card__features'>
          <div>
            <i className="fas fa-check-circle"></i>
            <p>{sqm} m²</p>
          </div>
          <p>|</p>
          <div>
            <i className="fas fa-bed"></i>
            <p>{bedrooms} habs.</p>
          </div>
          <p>|</p>
          <div>
            <i className="fas fa-bath"></i>
            <p>{bathrooms} baños</p>
          </div>
        </div>
      </article>
    </li>
  </>
}


