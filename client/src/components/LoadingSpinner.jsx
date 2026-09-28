import React from 'react';

const LoadingSpinner = ({ message = 'Loading Smart Village Portal...' }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5 my-5">
      <div className="spinner-border text-navy" style={{ width: '3rem', height: '3rem', color: '#0B2545' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-secondary fw-semibold small">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
