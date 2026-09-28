import React from 'react';

const StatCard = ({ title, value, icon, color = 'primary', subtitle = '' }) => {
  return (
    <div className={`stat-card ${color} h-100`}>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <div className="text-secondary small fw-bold text-uppercase mb-1">{title}</div>
          <div className="fs-3 fw-extrabold text-dark">{value}</div>
          {subtitle && <div className="text-muted small mt-1" style={{ fontSize: '0.78rem' }}>{subtitle}</div>}
        </div>
        <div className={`rounded-circle p-3 bg-${color} bg-opacity-10 d-flex align-items-center justify-content-center`} style={{ width: '54px', height: '54px' }}>
          <i className={`fa-solid ${icon} fs-4 text-${color}`}></i>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
