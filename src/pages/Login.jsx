import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import API from '../api';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await API.post('/auth/login', { email, password });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Login failed. Please check your email and password.'
      );
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 w-100">
      <div className="card shadow-lg p-5" style={{ maxWidth: '420px', width: '100%', borderRadius: '1.5rem' }}>

        <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
          <img src={logo} alt="Brain Logo" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
          <div>
            <h4 className="fw-bold m-0" style={{ color: 'var(--color-purple)' }}>Mind Pulse</h4>
            <p className="small text-secondary m-0" style={{ fontSize: '0.8rem' }}>Early detection for better mental health</p>
          </div>
        </div>

        {errorMessage && (
          <div className="alert small py-3 mb-4 text-center fw-bold rounded-3"
            style={{ backgroundColor: '#f8d7da', color: '#721c24', border: 'none' }} role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">✉️</span>
              <input type="email" className="form-control form-control-lg bg-white border-start-0 fs-6 text-dark"
                placeholder="Email Address" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold text-secondary">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">🔒</span>
              <input type={showPassword ? 'text' : 'password'}
                className="form-control form-control-lg bg-white border-start-0 border-end-0 fs-6 text-dark"
                placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
              <span className="input-group-text bg-white border-start-0" style={{ cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide Password' : 'Show Password'}>
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100 rounded-3 mb-4 py-2 fs-6"
            style={{ backgroundColor: 'var(--color-purple)', borderColor: 'var(--color-purple)' }}>
            Sign In
          </button>
        </form>

        <div className="text-center mb-3">
          <span className="text-secondary small">Don't have an account? </span>
          <Link to="/register" className="small fw-bold" style={{ color: 'var(--color-blue)' }}>Create one</Link>
        </div>

        <div className="text-center pt-3 border-top">
          <p className="text-secondary m-0" style={{ fontSize: '0.7rem' }}>
            Your mental health data is stored locally and privately on your device.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
