import React, { useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";

import hasDriverId from '../../utils/CheckDriverIdInLocalStorage/';

import Center from '../../components/Container';

function Register() {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handlePostRequestLogin = async () => {
    const apiUrl = process.env.REACT_APP_API_URL + "driver";
    const postData = {
      name: name,
      email: email,
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

      const data = await response.json();
      console.log('Response data:', data.driver.id);
      localStorage.setItem("driverId", data.driver.id);
      history.push("/");

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
    {hasDriverId ? (
      <Redirect to="/" /> 
    ) : (
      <div>
        <h1>Cadastro</h1>

        <div className='form'>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="Seu nome"
            />

            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="Seu email"
            />


            <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </button>
        </div>
      </div>
    )}
      
    </Center>
  );
}

export default Register;