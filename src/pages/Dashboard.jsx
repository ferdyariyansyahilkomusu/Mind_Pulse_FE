import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Dashboard = () => {
  const navigate = useNavigate();

  const [dailyQuote, setDailyQuote] = useState('');
  const [history, setHistory] = useState([]);
  const [burnout, setBurnout] = useState(null);

  useEffect(() => {
    const quotes = [
      'These heavy feelings are valid, but they do not define who you are. We are here to accompany you through this phase.',
      "It's okay to feel tired today. Remember that you have come so far already.",
      'Every storm will pass. Don\'t be too hard on yourself — you deserve to rest.',
      'Great job maintaining your positive energy! Keep up this wonderful rhythm.',
      'You have been doing amazing things lately. Let\'s celebrate every small victory!',
    ];

    setDailyQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    fetchJournals();
    fetchBurnout();
  }, []);

  const fetchJournals = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) { navigate('/login'); return; }
      const response = await API.get('/journals');
      setHistory(response.data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }
      console.log(error);
    }
  };

  const fetchBurnout = async () => {
    try {
      const response = await API.get('/burnout/latest');
      setBurnout(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getScoreColor = (sentiment) => {
    if (sentiment === 'positive') return 'text-success';
    if (sentiment === 'negative') return 'text-danger';
    if (sentiment === 'neutral') return 'text-warning';
    return 'text-dark';
  };

  return (
    <div className="d-flex flex-column gap-4 pb-5">
      <header>
        <h2 className="fw-bold" style={{ color: 'var(--color-blue)' }}>Dashboard</h2>
        <p className="text-secondary small">Summary of your emotion analysis results</p>
      </header>

      {/* Daily Quote + Burnout Analysis in top card */}
      <div
        className="card border-0 p-4 text-white shadow-sm"
        style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', borderRadius: '1.5rem' }}
      >
        <h4 className="fw-bold mb-3 text-center">✨ Today's Message For You ✨</h4>
        <p className="fw-medium lh-lg text-center mb-0" style={{ opacity: 0.95 }}>
          "{dailyQuote}"
        </p>

        {burnout && (
          <div
            className="mt-4 p-3 rounded-3"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
          >
            <h6 className="fw-bold mb-2">🧠 Burnout Analysis</h6>
            <p className="mb-1 small">
              <strong>Status:</strong> {burnout.emotional_state}
            </p>
            <p className="small m-0" style={{ opacity: 0.85 }}>{burnout.ai_message}</p>
          </div>
        )}
      </div>

      {/* Journal History */}
      {history.length > 0 ? (
        <div className="d-flex flex-column gap-3 mt-2">
          <h5 className="fw-bold mb-1" style={{ color: 'var(--color-blue)' }}>
            Your Journal History
          </h5>

          {history.map((entry) => (
            <div
              key={entry.id}
              className="card border-0 p-4 shadow-sm"
              style={{ backgroundColor: '#EBFBFF', borderRadius: '1.5rem' }}
            >
              <div className="row g-4 align-items-center">
                <div className="col-md-4 col-lg-3 border-end border-info border-opacity-25">
                  <p className="text-secondary fw-bold small mb-1">Sentiment Category</p>
                  <h3 className={`fw-bold m-0 ${getScoreColor(entry.label)}`}>{entry.label}</h3>
                </div>

                <div className="col-md-8 col-lg-9 pl-md-4">
                  <h6 className="fw-bold text-secondary small mb-2">
                    Your Note ({new Date(entry.created_at).toLocaleDateString('en-US')}):
                  </h6>
                  <p className="m-0 text-dark fst-italic lh-base">"{entry.content}"</p>

                  {entry.translated_text && (
                    <p className="mt-2 small text-secondary">
                      Translation: {entry.translated_text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="card border-0 p-4 shadow-sm text-center"
          style={{ backgroundColor: '#f8f9fa', borderRadius: '1.5rem' }}
        >
          <p className="text-secondary m-0">
            No journals analyzed yet. Please write one in the Diary menu!
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
