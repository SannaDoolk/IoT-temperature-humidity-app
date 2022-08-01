import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts'

function HumidityChart() {
  const [humidityValues, setHumidityValues] = useState([])
  const [timeAndDates, setTimeAndDates] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/iot/humidity-chart')
    .then(function (data) {
      const humidityResults = []
      const timings = []
      data.data.forEach(obj => {
        humidityResults.push(obj.value)
        timings.push(obj.time)
      })
      setHumidityValues(humidityResults)
      setTimeAndDates(timings)
      console.log(humidityResults)
      console.log(timeAndDates)
    })
    .catch(function (error) {
      console.log(error.response.status)
    })
  }, []);

  const humidityChart = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: timeAndDates
      }
    },
    series: [
      {
        name: "Temps",
        data: humidityValues
      }
    ]
  }

  return (
    <div className="HumidityChart">
      <h2>Humidity beskriv vad</h2>
      <div className="chart-box">
      <Chart
        options={humidityChart.options}
        series={humidityChart.series}
        type="line"
        width="600"
        height="400"
        />
      </div>  
    </div>
  );
}

export default HumidityChart;