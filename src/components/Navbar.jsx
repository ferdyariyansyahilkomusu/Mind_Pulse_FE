import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';
import dashboardIcon from '../assets/dashboard.png';
import diaryIcon from '../assets/diary.png';
import profileIcon from '../assets/profile.png';
import logoutIcon from '../assets/logout.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.name) {
      setUserName(savedUser.name.split(" ")[0]);
    }
  }, []);

  const navLinks = [
    { name: 'Diary', path: '/diary', icon: diaryIcon },
    { name: 'Profile', path: '/profile', icon: profileIcon },
    { name: 'Dashboard', path: '/dashboard', icon: dashboardIcon },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate('/login');
  };

  return (
    <nav className="card shadow-sm d-flex flex-row justify-content-between align-items-center px-4 py-3 mb-4 border-0" style={{ borderRadius: '1rem' }}>

      {/* Logo Utama */}
      <div className="d-flex align-items-center gap-3">
        <img src={logo} alt="Mind Pulse Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
        <span className="fs-5 fw-bold m-0" style={{ color: 'var(--color-purple)' }}>Mind Pulse</span>
      </div>

      {/* Menu Navigasi Tengah */}
      <div className="d-none d-md-flex gap-2">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`d-flex align-items-center gap-2 text-decoration-none px-3 py-2 rounded-3 ${isActive ? 'fw-bold' : 'fw-semibold text-secondary'}`}
              style={{
                backgroundColor: isActive ? '#f3e8ff' : 'transparent',
                color: isActive ? 'var(--color-purple)' : 'var(--color-black)',
                transition: 'all 0.2s'
              }}
            >
              <img
                src={link.icon}
                alt={link.name}
                style={{
                  width: '20px',
                  height: '20px',
                  objectFit: 'contain',
                  opacity: isActive ? 1 : 0.6
                }}
              />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Tombol Logout */}
      <div className="d-flex align-items-center gap-3">
        <span
          className="fw-semibold"
          style={{ color: "var(--color-blue)" }}
        >
          Hi, {userName} 👋
        </span>
        
        <button
          onClick={handleLogout}
          className="btn d-flex align-items-center gap-2 p-1"
          style={{ border: 'none', background: 'transparent' }}
          title="Log out"
        >
          <img src={logoutIcon} alt="Log out" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
          <span className="fw-bold fs-6" style={{ color: '#E50000' }}>Log out</span>
        </button>
      </div>

    </nav>
  );
};

export default Navbar;