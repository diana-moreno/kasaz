import React, { useState, useEffect } from 'react';
import './index.sass';
import listApartments from '../../logic/list-apartments';
import Searcher from '../Searcher';
import Card from '../Card';
import Feedback from '../Feedback';
import image from '../../logo.png';

export default function () {
  const [error, setError] = useState();
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const apartments = await listApartments();
        setApartments(apartments);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, []);

  async function handleListApartments(
    location,
    minPrice,
    maxPrice,
    minSqm,
    maxSqm,
    bedrooms,
    bathrooms
  ) {
    setError();
    setApartments([]);

    try {
      const apartments = await listApartments(
        location,
        minPrice,
        maxPrice,
        minSqm,
        maxSqm,
        bedrooms,
        bathrooms
      );
      setApartments(apartments);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <header>
        <img className='logo' src={image} alt='logo kasaz' />
        <Searcher onListApartments={handleListApartments} />
      </header>
      <main>
        <ul className='board'>
          {apartments.map((apartment) => (
            <Card key={apartment._id} apartment={apartment} />
          ))}
          {error && <Feedback error={error} />}
        </ul>
      </main>
    </>
  );
}
