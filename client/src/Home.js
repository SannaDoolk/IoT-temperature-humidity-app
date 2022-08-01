import './App.css';
import Temperature from './Temperature';
import Humidity from './Humidity';

function Home() {
  
  
  return (
    <div className="Home">
      <h1>Termometer</h1>
      <Temperature />
      <Humidity />
    </div>
  );
}

export default Home;