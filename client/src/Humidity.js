import './App.css';

function Humidity({humidity}) {

  return (
    <div className="Humidity">
      <h2>Humidity</h2>
      <p>{humidity}</p>
    </div>
  );
}

export default Humidity;