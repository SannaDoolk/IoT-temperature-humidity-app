import './App.css';

function Temperature({temperature}) {
  console.log(temperature)
  return (
    <div className="Temperature">
      <h2>Temperature</h2>
      <p>{temperature}</p>
    </div>
  );
}

export default Temperature;