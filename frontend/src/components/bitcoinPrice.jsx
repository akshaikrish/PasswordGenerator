import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; 
import '../styles/bitcoinPrice.css'; 

function BitCoinPrices() {
  // State variables to manage number of days, bitcoin prices, and error messages
  const [numberOfDays, setNumberOfDays] = useState(10); // Number of days for Bitcoin price history
  const [bitcoinPrices, setBitcoinPrices] = useState([]); // Array to store Bitcoin prices
  const [errorMessage, setErrorMessage] = useState(''); // Error message to display if fetching fails
  const [debouncedFetchBitcoinPrices, setDebouncedFetchBitcoinPrices] = useState(null); // Debounced function to fetch Bitcoin prices

  // Function to fetch Bitcoin prices from the server
  const fetchBitcoinPrices = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/bitcoinPrices?days=${numberOfDays}`);
      const prices = response.data.prices.reverse(); // Reverse the array to display recent prices first
      const filteredPrices = filterPrices(prices); // Filter and process the prices
      setBitcoinPrices(filteredPrices); // Update state with the filtered prices
      setErrorMessage(''); // Clear any previous error messages
    } catch (error) {
      console.error('Error fetching Bitcoin prices:', error);
      if (error.response && error.response.status === 500) {
        setErrorMessage('Status Code 500 : Internal server error. Please try again later.');
      } else {
        setErrorMessage('Failed to fetch Bitcoin prices. Please try again later.');
      }
    }
  }, [numberOfDays]);

  // Debounce the fetchBitcoinPrices function to prevent excessive API requests
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedFetchBitcoinPrices(() => fetchBitcoinPrices);
    }, 500); // Adjust the debounce delay as needed

    return () => {
      clearTimeout(timeoutId); // Cleanup the timeout
    };
  }, [numberOfDays, fetchBitcoinPrices]);

  // Call the debounced function when it's available
  useEffect(() => {
    if (debouncedFetchBitcoinPrices) {
      debouncedFetchBitcoinPrices();
    }
  }, [debouncedFetchBitcoinPrices]);

  // Function to filter and process Bitcoin prices
  const filterPrices = (prices) => {
    const filteredPrices = [];
    const datesMap = new Map();
    
    // Group prices by date
    prices.forEach((price) => {
      const date = new Date(price[0]).toLocaleDateString(); // Convert timestamp to date string
      if (!datesMap.has(date)) {
        datesMap.set(date, [price[1]]); // Initialize with the first price
      } else {
        datesMap.get(date).push(price[1]); // Append price to existing array
      }
    });
    
    // Extract first and last prices for each date
    datesMap.forEach((pricesArray, date) => {
      filteredPrices.push([date, pricesArray[0], pricesArray[pricesArray.length - 1]]);
    });

    return filteredPrices;
  };

  // Event handler to update the number of days
  const handleNumberOfDaysChange = (e) => {
    const days = parseInt(e.target.value); // Parse the input value to an integer
    if (days < 1 || days > 300) {
      setErrorMessage('Number of days must be between 1 and 300.');
    } else {
      setErrorMessage(''); // Clear any previous error messages
      setNumberOfDays(days); // Update state with the new number of days
    }
  };

  // Event handler to fetch Bitcoin prices
  const handleFetchPrices = () => {
    if (numberOfDays >= 1 && numberOfDays <= 300) {
      if (debouncedFetchBitcoinPrices) {
        debouncedFetchBitcoinPrices();
      }
    } else {
      setErrorMessage('Number of days must be between 1 and 300.');
    }
  };

  // JSX to render the BitCoinPrices component
  return (
    <div className="BitCoinPrices">
      <h1>Bitcoin Price History</h1>
      <div>
        <label htmlFor="numberOfDays">Number of Days:</label>
        <input
          type="number"
          id="numberOfDays"
          value={numberOfDays}
          onChange={handleNumberOfDaysChange}
        />
        <button onClick={handleFetchPrices}>Fetch Prices</button>
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div><h2>Bitcoin Prices for the last {!numberOfDays ? 0 : numberOfDays} Days</h2></div>
      <div className='priceList'>
        <table className='priceTable'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Opening Price (USD)</th>
              <th>Closing Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through bitcoinPrices array to render price data */}
            {bitcoinPrices.map(([date, openingPrice, closingPrice], index) => (
              <tr key={index}>
                <td>{date}</td>
                <td>${openingPrice}</td>
                <td>${closingPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BitCoinPrices;
