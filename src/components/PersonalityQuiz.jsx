import React, { useState } from 'react';
import { Sparkles, Brain, Zap, HeartHandshake, Ghost, Laugh, RefreshCw } from 'lucide-react';
import { fetchVibeMovies } from '../services/api';

const VIBES = [
  { id: 'mind-bender', title: 'Mind-Bender', desc: 'Complex plots, high concepts & plot twists', icon: Brain, color: '#8b5cf6' },
  { id: 'adrenaline', title: 'Adrenaline Junkie', desc: 'Fast-paced action, edge-of-your-seat thrillers', icon: Zap, color: '#ef4444' },
  { id: 'chill', title: 'Chill & Feel Good', desc: 'Heartwarming, lighthearted or comforting movies', icon: HeartHandshake, color: '#10b981' },
  { id: 'spooky', title: 'Dark & Spooky', desc: 'Supernatural horror, suspense & dark vibes', icon: Ghost, color: '#f59e0b' },
  { id: 'deep-story', title: 'Deep & Emotional', desc: 'Inspiring dramas & deep character studies', icon: Laugh, color: '#06b6d4' }
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
        <h2><Sparkles size={24} color="#06b6d4" /> Smart Vibe & Personality Matcher</h2>
        <p>Not sure what to watch tonight? Choose your current mood or personality type to get tailored recommendations powered by live API searches.</p>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>🎯 Recommended Movies For You ({recommendations.length})</h3>
            <button
              className="cat-pill"
              onClick={() => handleVibeSelect(selectedVibe)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw size={14} /> Refresh Recommendations
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
              Finding the best matches for your vibe...
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
                    <h4>{movie.Title} ({movie.Year})</h4>
                    <p>{movie.Plot || 'Click to view details, ratings, and full synopsis.'}</p>
                    <span className="badge">{movie.Type || movie.Genre || 'Movie'}</span>
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