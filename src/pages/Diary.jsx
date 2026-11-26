import React, { useState } from 'react';
import API from '../api';

const Diary = () => {
  const [content, setContent] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const submitJournal = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await API.post('/journals', { content });
      setAnalysis(response.data.burnout_analysis);
      setContent('');
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Failed to submit journal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div
        className="card border-0 shadow-lg p-4 mx-auto"
        style={{ maxWidth: '750px', borderRadius: '1.5rem', backgroundColor: '#ffffff' }}
      >
        <div className="mb-4">
          <h2 className="fw-bold mb-2" style={{ color: 'var(--color-blue)' }}>Diary</h2>
          <p className="text-secondary m-0">
            Write your feelings today and let AI help analyze them.
          </p>
          {errorMsg && (
            <div className="mt-2 small fw-semibold" style={{ color: '#dc3545' }}>
              ⚠️ {errorMsg}
            </div>
          )}
        </div>

        <form onSubmit={submitJournal}>
          <textarea
            className="form-control mb-3"
            style={{ minHeight: '180px', borderRadius: '1rem', resize: 'none', padding: '1rem', fontSize: '1rem' }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your journal for today..."
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100 py-3 fw-bold"
            style={{ borderRadius: '1rem', backgroundColor: 'var(--color-purple)', borderColor: 'var(--color-purple)' }}
          >
            {loading ? 'Submitting...' : 'Submit Journal'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Diary;
