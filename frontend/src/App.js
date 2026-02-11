import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import ScoreCard from './components/ScoreCard';
import VulnerabilityList from './components/VulnerabilityList';
import SecurityHeaders from './components/SecurityHeaders';  

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleScan = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    
    try {
      const response = await axios.post('http://localhost:5000/api/scan', {
        url: url
      });
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      alert('Scan failed. Please check the URL and try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> Web Vulnerability Scanner</h1>
        <p>Scan websites for security vulnerabilities</p>
        
        <form onSubmit={handleScan} className="scan-form">
          <input
            type="text"
            placeholder="Enter website URL (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Scanning...' : 'Start Scan'}
          </button>
        </form>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Scanning {url}...</p>
          </div>
        )}

        {results && (
          <div className="results-container">
            <ScoreCard score={results.score} />
            <VulnerabilityList vulnerabilities={results.vulnerabilities} />
            <SecurityHeaders securityHeaders={results.securityHeaders} />  {/* ← Ajoute ça */}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;