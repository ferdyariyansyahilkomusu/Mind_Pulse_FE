import React, { useState, useEffect } from 'react';
import profileIcon from '../assets/profile.png';
import API from '../api';

const Profile = () => {
  const [user, setUser] = useState({ name: 'Guest', email: '-' });

  const [stats, setStats] = useState({
    totalEntries: 0,
    positiveDays: 0,
    neutralDays: 0,
    negativeDays: 0,
    emotionsTracked: 0,
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await API.get('/journals');
      const journals = response.data.data || [];

      const total = journals.length;
      const positives = journals.filter((item) => item.label === 'positive').length;
      const neutrals = journals.filter((item) => item.label === 'neutral').length;
      const negatives = journals.filter((item) => item.label === 'negative').length;
      const uniqueEmotions = new Set(journals.map((item) => item.label)).size;

      setStats({
        totalEntries: total,
        positiveDays: positives,
        neutralDays: neutrals,
        negativeDays: negatives,
        emotionsTracked: uniqueEmotions,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column gap-4 pb-5">
      <div className="mb-2">
        <h2 className="fw-bold" style={{ color: 'var(--color-purple)' }}>Your Profile</h2>
        <p className="text-secondary small">Personal information and mental health statistics</p>
      </div>

      {/* User Info Card - User ID dihapus */}
      <div className="card shadow-sm p-4 border-0" style={{ borderRadius: '1.5rem' }}>
        <div className="d-flex align-items-center gap-4">
          <div className="d-flex align-items-center justify-content-center shadow-sm"
            style={{ width: '90px', height: '90px', background: '#5b54fa', borderRadius: '1rem' }}>
            <img src={profileIcon} alt="Profile"
              style={{ width: '45px', height: '45px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          </div>

          <div className="d-flex flex-column justify-content-center">
            <h1 className="fw-bolder mb-2 text-capitalize" style={{ color: 'var(--color-black)' }}>
              {user.name}
            </h1>
            <p className="text-secondary mb-0 d-flex align-items-center gap-2 fs-6">
              <span style={{ opacity: 0.5 }}>✉️</span> {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Mental Health Journey - dengan Neutral Days */}
      <div className="card shadow-sm p-4 border-0"
        style={{ borderRadius: '1.5rem', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', color: 'white' }}>
        <h4 className="fw-bold mb-2">✨ Your Mental Health Journey</h4>
        <p className="small text-white-50 mb-4">
          Your journal data is connected to your account and stored securely in the database.
        </p>

        <div className="row g-3">
          <div className="col-6 col-md-3">
            <div className="bg-white bg-opacity-10 p-3 rounded-3">
              <h3 className="fw-bold mb-0">{stats.totalEntries}</h3>
              <span className="small text-white-50">Total Entries</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="bg-white bg-opacity-10 p-3 rounded-3">
              <h3 className="fw-bold mb-0">{stats.positiveDays}</h3>
              <span className="small text-white-50">Positive Days</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="bg-white bg-opacity-10 p-3 rounded-3">
              <h3 className="fw-bold mb-0">{stats.neutralDays}</h3>
              <span className="small text-white-50">Neutral Days</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="bg-white bg-opacity-10 p-3 rounded-3">
              <h3 className="fw-bold mb-0">{stats.negativeDays}</h3>
              <span className="small text-white-50">Negative Days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm p-4 border-0" style={{ borderRadius: '1.5rem' }}>
        <h5 className="fw-bold mb-3" style={{ color: 'var(--color-black)' }}>Privacy & Data</h5>
        <div className="p-3 rounded-3" style={{ backgroundColor: '#f8f9fa' }}>
          <p className="text-secondary small m-0 lh-lg">
            Your journal entries are stored in the Mind Pulse database and connected to your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
