
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Dashboard = () => {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [burnout, setBurnout] = useState(null);

  useEffect(() => {
    fetchJournals();
    fetchBurnout();
  }, []);

  const fetchJournals = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      const response = await API.get('/journals');

      // Pastikan data journal berbentuk array
      const journals = response.data.data || [];
      setHistory(journals);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }

      console.error('Failed to fetch journals:', error);
    }
  };

  const fetchBurnout = async () => {
    try {
      const response = await API.get('/burnout/latest');

      setBurnout(response.data.data || null);
    } catch (error) {
      console.error('Failed to fetch burnout feedback:', error);
      setBurnout(null);
    }
  };

  const getScoreColor = (sentiment) => {
    if (sentiment === 'positive') return 'text-success';
    if (sentiment === 'negative') return 'text-danger';
    if (sentiment === 'neutral') return 'text-warning';

    return 'text-dark';
  };

  // Feedback hanya ditampilkan jika journal sudah mencapai 7
  const shouldShowFeedback =
    history.length >= 7 &&
    burnout?.ai_message;

  return (
    <div className="d-flex flex-column gap-4 pb-5">
      {/* Dashboard Header */}
      <header>
        <h2
          className="fw-bold"
          style={{ color: 'var(--color-blue)' }}
        >
          Dashboard
        </h2>
      </header>

      {/* Today's Message For You */}
      <div
        className="card border-0 p-4 text-white shadow-sm"
        style={{
          background:
            'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          borderRadius: '1.5rem',
          minHeight: '116px',
          justifyContent: 'center',
        }}
      >
        <h4 className="fw-bold mb-0 text-center">
          Today's Message For You
        </h4>

        {shouldShowFeedback && (
          <p
            className="text-center mb-0 mt-3"
            style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              whiteSpace: 'pre-line',
            }}
          >
            {burnout.ai_message}
          </p>
        )}
      </div>

      {/* Journal History */}
      {history.length > 0 ? (
        <div className="d-flex flex-column gap-3 mt-2">
          <h5
            className="fw-bold mb-1"
            style={{ color: 'var(--color-blue)' }}
          >
            Your Journal History
          </h5>

          {history.map((entry) => (
            <div
              key={entry.id}
              className="card border-0 p-4 shadow-sm"
              style={{
                backgroundColor: '#EBFBFF',
                borderRadius: '1.5rem',
              }}
            >
              <div className="row g-4 align-items-center">
                <div className="col-md-4 col-lg-3 border-end border-info border-opacity-25">
                  <p className="text-secondary fw-bold small mb-1">
                    Sentiment Category
                  </p>

                  <h3
                    className={`fw-bold m-0 ${getScoreColor(
                      entry.label
                    )}`}
                  >
                    {entry.label}
                  </h3>
                </div>

                <div className="col-md-8 col-lg-9 pl-md-4">
                  <h6 className="fw-bold text-secondary small mb-2">
                    Your Note (
                    {new Date(entry.created_at).toLocaleDateString(
                      'en-US'
                    )}
                    ):
                  </h6>

                  <p className="m-0 text-dark fst-italic lh-base">
                    "{entry.content}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="card border-0 p-4 shadow-sm text-center"
          style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '1.5rem',
          }}
        >
          <p className="text-secondary m-0">
            No journals analyzed yet. Please write one in the
            Diary menu!
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
