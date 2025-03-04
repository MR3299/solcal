import React from 'react';
import './App.css';
import SolarCalculator from './SolarCalculator';
// import SolarCal from './SolarCal';
import ResidentialSolarCalculator from './components/ResidentialSolarCalculator';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>Solar Installation Cost Calculator</h1>
      </header> */}
      <main>
        {/* <SolarCalculator /> */}
        <ResidentialSolarCalculator />
      </main>
    </div>
  );
}

export default App;
