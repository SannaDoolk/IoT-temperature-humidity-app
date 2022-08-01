import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Temperature from './Temperature';
import Humidity from './Humidity';

function Home() {
const [temperature, setTemperature] = useState(null);
const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/iot')
    .then(function (data) {
      setTemperature(data.data.temperature.value)
      setHumidity(data.data.humidity.value)
      console.log(data.data.temperature.value)
    })
    .catch(function (error) {
      console.log(error.response.status)
    })
  })
  
  return (
    <div className="Home">
      <h1>Termometer</h1>
      <Temperature temperature={temperature}/>
      <Humidity humidity={humidity} />
    </div>
  );
}

export default Home;