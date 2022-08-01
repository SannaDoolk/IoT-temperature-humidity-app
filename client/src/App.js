import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AiOutlineLineChart } from 'react-icons/ai';
import { FiThermometer } from 'react-icons/fi';
import Home from './Home';
import TemperatureChart from './TemperatureChart';
import HumidityChart from './HumidityChart';

/**
 * The app component.
 *
 * @component
 * return (
 *   <App />
 * )
 */
function App() {

  return (
    <div className="App">
    <BrowserRouter>

    <nav>
    <Link to="/">home <FiThermometer/> </Link>
    <Link to="/temperature-chart">temperature chart <AiOutlineLineChart/> </Link>
    <Link to="/humidity-chart">humidity chart <AiOutlineLineChart/> </Link>
    </nav>

    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/temperature-chart" element={<TemperatureChart />} />
    <Route path="/humidity-chart" element={<HumidityChart />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
