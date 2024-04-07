const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON request bodies
app.use(express.json());

// CORS middleware to allow requests from your frontend domain
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Route to proxy requests to CoinGecko API
app.get('/api/bitcoinPrices', async (req, res) => {
  try {
    const { days } = req.query;
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Bitcoin prices:', error);
    res.status(500).json({ error: 'Failed to fetch Bitcoin prices. Please try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
