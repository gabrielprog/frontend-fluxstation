import React,{ useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";

import hasDriverId from '../../utils/CheckDriverIdInLocalStorage/';

import Center from '../../components/Container';

function Home() {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liter, setLiter] = useState("");
  const [fuel, setFuel] = useState("gasoline");
  const history = useHistory();

  const handlePostRequestLogin = async () => {

    if(!hasDriverId) return;

    const driverId = localStorage.getItem("driverId");
    const apiUrl = process.env.REACT_APP_API_URL + "fuel";
    const postData = {
      driverId,
      quantityLiters: liter,
      fuelType: fuel,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(postData);
      const data = await response.json();
      console.log('Response data:', data);
      history.push("/fuel");

    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  const handleSubmit = () => {
    setIsSubmitting(true);

    setTimeout(async () => {
      await handlePostRequestLogin();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Center>
     
    {!hasDriverId ? (
      <Redirect to="/register" /> 
    ) : (
      <div>
        <h1>Abastecer</h1>

        <div className='form'>
            <input
                type="number"
                id="liter"
                value={liter}
                onChange={(e) => setLiter(e.target.value)}
                className="input"
                placeholder="Quantos litros?"
            />

            <select
                id="fuel"
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                className="input"
            >
              <option value="gasoline">Gasoline</option>
              <option value="ethanol">Ethanol</option>
              <option value="diesel">Diesel</option>
            </select>


            <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
              {isSubmitting ? 'Abastecendo...' : 'Abastecer'}
            </button>
        </div>
      </div>
    )}
      
    </Center>
  );
}

export default Home;