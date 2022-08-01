import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import TemperatureChart from './TemperatureChart';

function App() {

  return (
    <div className="App">

    <BrowserRouter>
    <Link to="/">Home</Link>
    <Link to="/temperature-chart">Temperature chart</Link>

    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/temperature-chart" element={<TemperatureChart />} />
    </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
