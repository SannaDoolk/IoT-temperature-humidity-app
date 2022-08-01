import './App.css';
import { BsDroplet } from 'react-icons/bs';

/**
 * The component that shows the humidity.
 *
 * @component
 * return (
 *   <Humidity />
 * )
 */
function Humidity({humidity}) {

  return (
    <div className="Humidity">
      <h2>current</h2>
      <h2>humidity</h2>
      <p>-------------</p>
      <h1><BsDroplet /></h1>
      <p className="humidity-value">{humidity} %</p>
    </div>
  );
}

export default Humidity;