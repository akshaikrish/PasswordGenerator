import React, { useState } from 'react';
import './App.css';
import PasswordGenerator from './components/passwordGenerator.jsx';
import BitcoinPrices from './components/bitcoinPrice.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('password'); // State to track active tab

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <div className="tab-navigation">
        <button className={activeTab === 'password' ? 'active' : ''} onClick={() => handleTabChange('password')}>Password Generator</button>
        <button className={activeTab === 'bitcoin' ? 'active' : ''} onClick={() => handleTabChange('bitcoin')}>Bitcoin Price</button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'password' && <PasswordGenerator />}
        {activeTab === 'bitcoin' && <BitcoinPrices />}
      </div>
    </div>
  );
}

export default App;
