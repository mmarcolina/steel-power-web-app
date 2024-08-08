import React from 'react';
import SteelDataForm from './components/SteelDataForm';

const App = () => {
  return (
    <div>
      <h1>Data Society: Fetch Steel Data</h1>
      <p>Please use the form below to query the power usage data set and fetch results for power usage in kWh.</p>
      <SteelDataForm />
    </div>
  );
};

export default App;
