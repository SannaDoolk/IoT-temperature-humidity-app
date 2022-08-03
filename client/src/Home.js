import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Temperature from './Temperature';
import Humidity from './Humidity';

/**
 * The home component.
 *
 * @component
 * return (
 *   <Home />
 * )
 */
function Home() {
const [temperature, setTemperature] = useState(null);
const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/')
    .then(function (data) {
      setTemperature(data.data.temperature.value)
      setHumidity(data.data.humidity.value)
    })
    .catch(function (error) {
      console.log(error.response.status)
    })
  }, []);
  
  return (
    <div className="Home">

      <Temperature temperature={temperature}/>
      <Humidity humidity={humidity} />

    </div>
  );
}

export default Home;