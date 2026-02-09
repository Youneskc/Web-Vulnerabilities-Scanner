import React from "react";
import './App.css';
import axios from "axios";

function App() {
  const [url,setUrl] = React.useState("");
  const [loading,setLoading] = React.useState(false);
  const [results,setResults] = React.useState(null);

   const handleScan = async(e) =>{
    e.preventDefault();
    setLoading(true);
    try{
      const res = await axios.post("http://localhost:5000/scan",{url});
      setResults(res.data);
    }catch(err){
      console.error(err);
    }
    setLoading(false);
   }

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

        {results && (
          <div className="results">
            <h2>Scan Results</h2>
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;







