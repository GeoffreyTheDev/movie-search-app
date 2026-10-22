import React, { useState, useEffect } from 'react';
import { Heart, Star, Film } from 'lucide-react';

export default function MovieCard({ movie, isFav, toggleFav, onClick }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [movie.Poster]);

  const hasValidPoster = movie.Poster && movie.Poster !== 'N/A' && !imgError;

  return (
    <div className="movie-card" onClick={() => onClick(movie.imdbID)}>
      <div className="poster-container">
        {hasValidPoster ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="poster-img"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="poster-fallback">
            <Film size={40} color="#8b5cf6" />
            <span className="fallback-title">{movie.Title}</span>
          </div>
        )}
        <button
          className={`fav-btn ${isFav ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFav(movie);
          }}
          title={isFav ? "Remove from Watchlist" : "Add to Watchlist"}
        >
          <Heart size={18} fill={isFav ? '#ef4444' : 'none'} />
        </button>
      </div>
      <div className="card-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <div className="movie-meta">
          <span>{movie.Year}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b' }}>
            <Star size={14} fill="#f59e0b" /> {movie.imdbRating || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}