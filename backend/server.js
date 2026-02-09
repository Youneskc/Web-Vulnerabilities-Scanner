const express= require('express');
const cors = require('cors');
const app = express();
const port = 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'Web Vulnerability Scanner API'});
});

app.post('/scan', (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'No URL provided' });
    }
    // Simple placeholder scan result — replace with real scanning logic later
    const result = {
        url,
        vulnerabilities: [],
        scannedAt: new Date().toISOString()
    };
    res.json(result);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});