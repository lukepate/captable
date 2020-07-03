import React, { useState } from 'react';
import './App.scss';
import TableView from './components/TableView';
import ChartView from './components/ChartView';


function App() {

  const data = [
    {
      id: '1',
      key: 1,
      shareholder: 'Mike',
      role: 'Founder',
      shares: 40,
      PPS: 5,
      capital: 100,
      ownership: 30
    },
    {
      id: '2',
      key: 2,
      role: 'Investor',
      shareholder: 'John',
      shares: 30,
      PPS: 5,
      capital: 50,
      ownership: 50
    },
    {
      id: '3',
      key: 3,
      role: 'Investor',
      shareholder: 'Luke',
      shares: 30,
      PPS: 15,
      capital: 150,
      ownership: 150
    },
  ];

  const initialData = () => {
    return data.map(slice => ({ x: slice.shareholder, y: slice.shares }));
  };

  const [selectedPieData, setSelectedPieData] = useState(initialData);

  return (
    <div className="App">
      <div className="chartContainer">
        <ChartView data={selectedPieData} />
        <TableView data={data} />
        </div>
    </div>
  );
}

export default App;
