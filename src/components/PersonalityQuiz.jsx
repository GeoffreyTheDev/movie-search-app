import React, { useState } from 'react';
import { Sparkles, Brain, Zap, HeartHandshake, Ghost, Flame, Eye, Laugh, RefreshCw } from 'lucide-react';
import { fetchVibeMovies } from '../services/api';

const VIBES = [
  { id: 'mind-bender', title: 'Mind-Bender', desc: 'Complex plots, high concepts & plot twists', icon: Brain, color: '#a78bfa' },
  { id: 'adrenaline', title: 'Adrenaline Rush', desc: 'Fast-paced action & edge-of-your-seat thrillers', icon: Zap, color: '#ef4444' },
  { id: 'visual', title: 'Visual Masterpiece', desc: 'Breathtaking cinema, epic visuals & world building', icon: Eye, color: '#38bdf8' },
  { id: 'chill', title: 'Chill & Feel-Good', desc: 'Comforting, lighthearted & heartwarming stories', icon: HeartHandshake, color: '#10b981' },
  { id: 'spooky', title: 'Dark & Spooky', desc: 'Supernatural horror, psychological thrill & suspense', icon: Ghost, color: '#f59e0b' },
  { id: 'deep-story', title: 'Deep & Emotional', desc: 'Inspiring dramas & timeless character journeys', icon: Flame, color: '#ec4899' },
  { id: 'comedy', title: 'Laugh Out Loud', desc: 'Hilarious comedies & fun weekend relaxed movies', icon: Laugh, color: '#facc15' }
];

export default function PersonalityQuiz({ onSelectMovie }) {
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleVibeSelect = async (vibeId) => {
    setSelectedVibe(vibeId);
    setLoading(true);
    const movies = await fetchVibeMovies(vibeId);
    setRecommendations(movies);
    setLoading(false);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2><Sparkles size={26} color="#38bdf8" /> Smart Vibe & Personality Matcher</h2>
        <p>Select your current mood or movie preference to get instant curated recommendations.</p>
      </div>

      <div className="vibe-grid">
        {VIBES.map((v) => {
          const Icon = v.icon;
          const isSelected = selectedVibe === v.id;
          return (
            <div
              key={v.id}
              className={`vibe-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleVibeSelect(v.id)}
            >
              <Icon size={32} color={v.color} />
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          );
        })}
      </div>

      {selectedVibe && (
        <div className="quiz-results">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3>🎯 Tailored Recommendations ({recommendations.length})</h3>
            <button
              className="cat-pill"
              onClick={() => handleVibeSelect(selectedVibe)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw size={14} /> Refresh List
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
              Scanning cinema database for matching vibes...
            </div>
          ) : (
            <div className="results-list">
              {recommendations.map((movie) => (
                <div key={movie.imdbID} className="recommendation-item" onClick={() => onSelectMovie(movie.imdbID)}>
                  <img
                    src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/100x150?text=No+Poster'}
                    alt={movie.Title}
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '4px' }}>{movie.Title} ({movie.Year})</h4>
                    <p style={{ fontSize: '0.88rem', color: '#9ca3af', lineHeight: '1.4', marginBottom: '8px' }}>
                      {movie.Plot || 'Click to explore full synopsis, runtime, director details and ratings.'}
                    </p>
                    <span className="badge">{movie.Genre || movie.Type || 'Featured'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}