import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import API from '../api';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Password and Confirm Password do not match. Please check again.');
      return;
    }

    try {
      await API.post('/auth/register', { name, email, password });
      setShowPopup(true);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/login');
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center w-100"
      style={{ minHeight: '100vh', overflow: 'hidden' }}
    >
      {/* Congrats Popup */}
      {showPopup && (
        <div
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
          }}
        >
          <div
            className="card shadow-lg text-center p-5"
            style={{ maxWidth: '380px', width: '90%', borderRadius: '1.5rem' }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎉</div>
            <h4 className="fw-bold mb-2" style={{ color: 'var(--color-purple)' }}>
              Congratulations!
            </h4>
            <p className="text-secondary mb-4">
              Your account has been created successfully. You're ready to start your mental health journey!
            </p>
            <button
              className="btn btn-primary w-100 py-2 fw-bold"
              style={{ backgroundColor: 'var(--color-purple)', borderColor: 'var(--color-purple)', borderRadius: '0.75rem' }}
              onClick={handlePopupClose}
            >
              Go to Sign In
            </button>
          </div>
        </div>
      )}

      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: '420px', width: '100%', borderRadius: '1.5rem' }}
      >
        <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
          <img src={logo} alt="Brain Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          <div>
            <h5 className="fw-bold m-0" style={{ color: 'var(--color-purple)' }}>Mind Pulse</h5>
            <p className="small text-secondary m-0" style={{ fontSize: '0.75rem' }}>
              Start your journey to better mental health
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="alert small py-2 mb-3 text-center rounded-3"
            style={{ backgroundColor: '#f8d7da', color: '#721c24', border: 'none' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-2">
            <label className="form-label small fw-bold text-secondary mb-1">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">👤</span>
              <input type="text" className="form-control bg-white border-start-0 text-dark"
                placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label small fw-bold text-secondary mb-1">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">✉️</span>
              <input type="email" className="form-control bg-white border-start-0 text-dark"
                placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label small fw-bold text-secondary mb-1">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control bg-white border-start-0 border-end-0 text-dark"
                placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)} required
              />
              <span className="input-group-text bg-white border-start-0" style={{ cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </span>
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label small fw-bold text-secondary mb-1">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">🛡️</span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-control bg-white border-start-0 border-end-0 text-dark"
                placeholder="Confirm Password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} required
              />
              <span className="input-group-text bg-white border-start-0" style={{ cursor: 'pointer' }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </span>
            </div>
          </div>

          <div className="mb-3 d-flex align-items-start gap-2 p-2 rounded-3" style={{ background: 'rgba(79, 70, 229, 0.08)' }}>
            <input type="checkbox" className="form-check-input mt-1 flex-shrink-0" required />
            <label className="form-check-label" style={{ fontSize: '0.7rem', color: 'var(--color-blue)' }}>
              By creating an account, you agree to use this tool for personal mental health awareness. This is not a substitute for professional medical advice.
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100 rounded-3 mb-3 py-2"
            style={{ backgroundColor: 'var(--color-purple)', borderColor: 'var(--color-purple)' }}>
            Create Account
          </button>

          <div className="text-center">
            <span className="text-secondary small">Already have an account? </span>
            <Link to="/login" className="small fw-bold" style={{ color: 'var(--color-blue)' }}>Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
