import React, { useState, useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import Center from '../../components/Container';

import hasDriverId from '../../utils/CheckDriverIdInLocalStorage/';

import FuelPurchaseItem from '../../components/FuelPurchaseItem';


function Fuel() {
  const [date, setDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fuelPurchases, setFuelPurchases] = useState([]);
  
  const handleChange = (event) => {
    setDate(event.target.value);
  };

  const setFuelItem = async () => {
    if(!hasDriverId) return;

    const driverId = localStorage.getItem('driverId');
    let apiUrl = process.env.REACT_APP_API_URL + "fuel?id=" + driverId;

    if (date) {
      apiUrl += `&date=${date}`;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setFuelPurchases(data.fuel);

    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true);

    setTimeout(async () => {
      await setFuelItem();
      setIsSubmitting(false);
    }, 1000);
  };

  useEffect(() => { 
    async function fetchMyAPI() {
        await setFuelItem();
    }

    fetchMyAPI()
  }, []);

  return (
    <Center>
      {!hasDriverId ? (
        <Redirect to="/register" /> 
      ) : (
        <div className='form'>
          <input
              type="date"
              id="date"
              value={date}
              onChange={handleChange}
              className="input"
              placeholder="0000/00/00"
          />

          <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={isSubmitting}
          >
            {isSubmitting ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      )}
      
      {fuelPurchases.length > 0 &&  fuelPurchases.map((purchase, index) => (
        <FuelPurchaseItem key={index} data={purchase} />
      ))}
    </Center>
  );
}

export default Fuel;