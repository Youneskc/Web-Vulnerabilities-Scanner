const express = require('express');
const cors = require('cors');
const VulnerabilityScanner = require('./scanner/vulnerabilityScanner');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'Web Vulnerability Scanner API' });
});


app.post('/api/scan', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

   
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return res.status(400).json({ error: 'URL must start with http:// or https://' });
    }

    console.log(` Received scan request for: ${url}`);


    const scanner = new VulnerabilityScanner(url);
    const results = await scanner.scan();

    res.json(results);
  } catch (error) {
    console.error('Scan error:', error);
    res.status(500).json({ 
      error: 'Scan failed', 
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});