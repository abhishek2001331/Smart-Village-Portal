import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { lang, toggleLanguage, t } = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <>
      <div className="tricolor-stripe"></div>
      <nav className="navbar navbar-expand-lg gov-navbar sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center text-white" to="/">
            <i className="fa-solid fa-landmark text-warning me-2 fs-3"></i>
            <div>
              <div className="fw-bold fs-5 leading-tight">{t('portalName')}</div>
              <div className="text-warning small" style={{ fontSize: '0.72rem' }}>
                {t('tagline')}
              </div>
            </div>
          </Link>

          <button
            className="navbar-toggler text-white border-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#govNavbarNav"
          >
            <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
          </button>

          <div className="collapse navbar-collapse" id="govNavbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-1">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/')}`} to="/">{t('navHome')}</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/schemes')}`} to="/schemes">{t('navSchemes')}</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/announcements')}`} to="/announcements">{t('navAnnouncements')}</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/services')}`} to="/services">{t('navServices')}</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  Sector Portals
                </a>
                <ul className="dropdown-menu dropdown-menu-end shadow border-0">
                  <li><Link className="dropdown-item" to="/agriculture"><i className="fa-solid fa-wheat-awn text-success me-2"></i> Agriculture & Mandi</Link></li>
                  <li><Link className="dropdown-item" to="/health"><i className="fa-solid fa-user-doctor text-danger me-2"></i> Health Services</Link></li>
                  <li><Link className="dropdown-item" to="/education"><i className="fa-solid fa-graduation-cap text-primary me-2"></i> Schools & Education</Link></li>
                  <li><Link className="dropdown-item" to="/jobs"><i className="fa-solid fa-briefcase text-warning me-2"></i> Employment & Jobs</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/emergency"><i className="fa-solid fa-phone-volume text-danger me-2"></i> Emergency Contacts</Link></li>
                </ul>
              </li>

              {/* Language Switcher */}
              <li className="nav-item ms-lg-2 my-2 my-lg-0">
                <button className="lang-toggle-btn btn d-flex align-items-center gap-1" onClick={toggleLanguage}>
                  <i className="fa-solid fa-language"></i>
                  <span>{lang === 'en' ? 'हिंदी' : 'English'}</span>
                </button>
              </li>

              {user ? (
                <li className="nav-item dropdown ms-lg-2">
                  <a className="nav-link dropdown-toggle bg-white text-dark rounded-pill px-3 py-1 fw-semibold text-capitalize d-inline-flex align-items-center gap-2" href="#" role="button" data-bs-toggle="dropdown">
                    <i className={`fa-solid ${user.role === 'admin' ? 'fa-user-shield text-danger' : 'fa-user text-primary'}`}></i>
                    <span>{user.name.split(' ')[0]}</span>
                    <span className="badge bg-dark small">{user.role}</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                    {user.role === 'admin' ? (
                      <li><Link className="dropdown-item fw-semibold text-primary" to="/admin/dashboard"><i className="fa-solid fa-chart-pie me-2"></i> {t('navAdminDashboard')}</Link></li>
                    ) : (
                      <>
                        <li><Link className="dropdown-item fw-semibold text-primary" to="/citizen/dashboard"><i className="fa-solid fa-gauge me-2"></i> {t('navDashboard')}</Link></li>
                        <li><Link className="dropdown-item" to="/citizen/my-complaints"><i className="fa-solid fa-list-check me-2"></i> My Complaints</Link></li>
                        <li><Link className="dropdown-item" to="/citizen/submit-complaint"><i className="fa-solid fa-pen-to-square me-2"></i> Submit Complaint</Link></li>
                        <li><Link className="dropdown-item" to="/citizen/profile"><i className="fa-solid fa-id-card me-2"></i> My Profile</Link></li>
                      </>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger fw-semibold" onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket me-2"></i> {t('logout')}
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <div className="d-flex align-items-center gap-2 ms-lg-2">
                  <Link to="/login" className="btn btn-outline-light btn-sm px-3 rounded-pill">
                    {t('navLogin')}
                  </Link>
                  <Link to="/register" className="btn btn-warning btn-sm px-3 text-dark fw-bold rounded-pill">
                    {t('navRegister')}
                  </Link>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
