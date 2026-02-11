import React from 'react';
import './SecurityHeaders.css';

function SecurityHeaders({ securityHeaders }) {
  if (!securityHeaders) {
    return null;
  }

  const headers = Object.entries(securityHeaders);

  return (
    <div className="security-headers">
      <h2> Security Headers</h2>
      
      <div className="headers-grid">
        {headers.map(([headerName, headerData]) => (
          <div 
            key={headerName} 
            className={`header-card ${headerData.present ? 'present' : 'missing'}`}
          >
            <div className="header-status">
              {headerData.present ? '' : ''}
            </div>
            
            <div className="header-content">
              <div className="header-name">{headerName}</div>
              
              {headerData.present ? (
                <div className="header-value">{headerData.value}</div>
              ) : (
                <div className="header-missing">Missing</div>
              )}
              
              <div className="header-description">
                {headerData.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SecurityHeaders;