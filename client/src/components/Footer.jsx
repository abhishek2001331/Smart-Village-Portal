import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useContext(LanguageContext);

  return (
    <footer className="gov-footer mt-auto">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3 text-white">
              <i className="fa-solid fa-landmark text-warning me-2 fs-3"></i>
              <span className="fw-bold fs-5">{t('portalName')}</span>
            </div>
            <p className="small text-secondary">
              Official Digital Portal of Gram Panchayat Kalyanpur. Facilitating transparent, accessible, and efficient public governance, scheme distribution, and grievance redressal for rural citizens.
            </p>
            <div className="d-flex gap-3 text-white">
              <a href="#" className="text-white"><i className="fa-brands fa-facebook fs-5"></i></a>
              <a href="#" className="text-white"><i className="fa-brands fa-twitter fs-5"></i></a>
              <a href="#" className="text-white"><i className="fa-brands fa-youtube fs-5"></i></a>
              <a href="#" className="text-white"><i className="fa-brands fa-whatsapp fs-5"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="text-white fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/">{t('navHome')}</Link></li>
              <li><Link to="/schemes">{t('navSchemes')}</Link></li>
              <li><Link to="/announcements">{t('navAnnouncements')}</Link></li>
              <li><Link to="/services">{t('navServices')}</Link></li>
              <li><Link to="/jobs">{t('navJobs')}</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-white fw-bold mb-3">Public Services</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/agriculture">Agriculture & Mandi Rates</Link></li>
              <li><Link to="/health">Health Centers & Hospitals</Link></li>
              <li><Link to="/education">Gram Panchayat Schools</Link></li>
              <li><Link to="/emergency">Emergency Helplines</Link></li>
              <li><Link to="/login">Citizen Login Portal</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-white fw-bold mb-3">Panchayat Office</h6>
            <p className="small mb-2"><i className="fa-solid fa-location-dot text-warning me-2"></i> Gram Panchayat Bhavan, Main Highway, Kalyanpur</p>
            <p className="small mb-2"><i className="fa-solid fa-phone text-warning me-2"></i> Helplines: +91 98765 43210 / 1800-180-1551</p>
            <p className="small mb-2"><i className="fa-solid fa-envelope text-warning me-2"></i> helpdesk@smartvillage.gov.in</p>
            <p className="small"><i className="fa-solid fa-clock text-warning me-2"></i> Working Hours: 9:00 AM - 5:00 PM (Mon-Sat)</p>
          </div>
        </div>

        <hr className="border-secondary my-3" />

        <div className="row align-items-center small">
          <div className="col-md-6 text-center text-md-start">
            {t('footerCopyright')}
          </div>
          <div className="col-md-6 text-center text-md-end text-secondary mt-2 mt-md-0">
            Designed for Final-Year MERN Project Demonstration
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
