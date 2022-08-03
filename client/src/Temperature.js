import './App.css';
import { FaTemperatureHigh } from 'react-icons/fa';


/**
 * The component that shows the temperature.
 *
 * @component
 * return (
 *   <Temperature />
 * )
 */
function Temperature({temperature}) {
  
  return (
    <div className="Temperature">
      <h2>current</h2>
      <h2>temperature</h2>
      <p>-------------</p>
      <h1><FaTemperatureHigh /></h1>
      <p className="temperature-value">{temperature} C°</p>
    </div>
  );
}

export default Temperature;