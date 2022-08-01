import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts'

/**
 * The component that shows the chart for humidity values.
 *
 * @component
 * return (
 *   <HumidityChart />
 * )
 */
function TemperatureChart() {
  const [temperatures, setTemperatures] = useState([])
  const [timeAndDates, setTimeAndDates] = useState([]);

  // Get values for temperatures everytime page loads and save them in arrays to show in chart
  useEffect(() => {
    axios.get('http://localhost:8080/temperature-values')
    .then(function (data) {
      const temps = []
      const timings = []
      data.data.forEach(obj => {
        temps.push(obj.value)
        timings.push(obj.time)
      })
      setTemperatures(temps)
      setTimeAndDates(timings)
      console.log(temperatures)
      console.log(timeAndDates)
    })
    .catch(function (error) {
      console.log(error.response.status)
    })
  }, []);

  const temperatureChart = {
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
        data: temperatures
      }
    ]
  }

  return (
    <div className="TemperatureChart">
      <h2>Temp beskriv vad </h2>
      <div className="chart-box">
      <Chart
        options={temperatureChart.options}
        series={temperatureChart.series}
        type="line"
        width="600"
        height="400"
        />
      </div>  
    </div>
  );
}

export default TemperatureChart;