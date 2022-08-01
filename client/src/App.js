import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import TemperatureChart from './TemperatureChart';
import HumidityChart from './HumidityChart';

function App() {

  return (
    <div className="App">
    <nav>
    <BrowserRouter>
    <Link to="/">Home</Link>
    <Link to="/temperature-chart">Temperature chart</Link>
    <Link to="/humidity-chart">Humidity chart</Link>

    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/temperature-chart" element={<TemperatureChart />} />
    <Route path="/humidity-chart" element={<HumidityChart />} />
    </Routes>
    </BrowserRouter>
    </nav>
    </div>
  );
}

export default App;
