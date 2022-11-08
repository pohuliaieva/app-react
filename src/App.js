import Weather from "./Weather";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Search your city</h1>
      <Weather defaultCity="Paris" />
    </div>
  );
}

export default App;
