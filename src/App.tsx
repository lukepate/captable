import React, { useState } from 'react';
import './App.scss';
import Dashboard from './components/DashboardView';

function App() {
  return (
    <div className="App">
      <div className="chartContainer">
        <Dashboard />
        </div>
    </div>
  );
}

export default App;
