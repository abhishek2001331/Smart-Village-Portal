import React, { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleQuickLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data);

      const redirectPath = res.data.role === 'admin' ? '/admin/dashboard' : (location.state?.from?.pathname || '/citizen/dashboard');
      navigate(redirectPath);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your email & password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
              <div className="text-center mb-4">
                <i className="fa-solid fa-landmark text-warning fs-1 mb-2"></i>
                <h3 className="fw-extrabold text-navy" style={{ color: '#0B2545' }}>Portal Sign In</h3>
                <p className="small text-secondary">Access Smart Village Citizen Services & Administration</p>
              </div>

              {error && (
                <div className="alert alert-danger d-flex align-items-center small" role="alert">
                  <i className="fa-solid fa-circle-exclamation me-2 fs-5"></i>
                  <div>{error}</div>
                </div>
              )}

              {/* Demo Credentials Quick Switcher Banner */}
              <div className="alert alert-warning border-0 p-3 rounded-3 mb-4 small">
                <div className="fw-bold mb-1 text-dark"><i className="fa-solid fa-key me-1"></i> Demo Credentials (Click to fill):</div>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-dark me-1"
                    onClick={() => handleQuickLogin('citizen@smartvillage.gov.in', 'citizen123')}
                  >
                    Citizen Account
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => handleQuickLogin('admin@smartvillage.gov.in', 'admin123')}
                  >
                    Admin Account
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark small">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light"><i className="fa-solid fa-envelope text-secondary"></i></span>
                    <input
                      type="email"
                      className="form-control bg-light"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark small">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light"><i className="fa-solid fa-lock text-secondary"></i></span>
                    <input
                      type="password"
                      className="form-control bg-light"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning btn-lg fw-bold text-dark w-100 rounded-pill mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  ) : (
                    <i className="fa-solid fa-right-to-bracket me-2"></i>
                  )}
                  Sign In
                </button>
              </form>

              <div className="text-center text-secondary small pt-3 border-top">
                Don't have a citizen account? <Link to="/register" className="fw-bold text-primary">Register Here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
