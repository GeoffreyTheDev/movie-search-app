import React, { useEffect, useState } from 'react';
import { X, Star } from 'lucide-react';
import { fetchMovieDetails } from '../services/api';

export default function MovieModal({ id, onClose }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetails(id).then((data) => {
      setMovie(data);
      setLoading(false);
    });
  }, [id]);

  if (!id) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', width: '100%' }}>Loading details...</div>
        ) : (
          <>
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
              alt={movie.Title}
              className="modal-poster"
              referrerPolicy="no-referrer"
            />
            <div className="modal-details">
              <h2>{movie.Title}</h2>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', margin: '0.5rem 0' }}>
                <span className="badge">{movie.Year}</span>
                <span className="badge">{movie.Runtime || '120 min'}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '0.9rem' }}>
                  <Star size={16} fill="#f59e0b" /> {movie.imdbRating || 'N/A'}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#a78bfa' }}>{movie.Genre || 'Cinema'}</p>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#d1d5db', margin: '0.5rem 0' }}>
                {movie.Plot}
              </p>
              {movie.Director && (
                <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
                  <strong>Director:</strong> {movie.Director}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}