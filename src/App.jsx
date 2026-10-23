import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import PersonalityQuiz from './components/PersonalityQuiz';
import Footer from './components/Footer';
import { fetchMovies } from './services/api';
import { Flame, Film, Sparkles } from 'lucide-react';

const CATEGORIES = ['All', 'Sci-Fi', 'Action', 'Drama', 'Comedy', 'Horror', 'Animation', 'Crime', 'Biography'];

export default function App() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('moviesSearchPlace_favs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('moviesSearchPlace_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies(search).then((data) => setMovies(data || []));
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const toggleFav = (movie) => {
    const exists = favorites.some((f) => f.imdbID === movie.imdbID);
    if (exists) {
      setFavorites(favorites.filter((f) => f.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const handleHomeClick = () => {
    setSearch('');
    setSelectedCategory('All');
    setActiveTab('all');
  };

  const filteredMovies = movies.filter((m) => {
    if (selectedCategory === 'All') return true;
    return m.Genre && m.Genre.includes(selectedCategory);
  });

  const displayedMovies = activeTab === 'favorites' ? favorites : filteredMovies;

  return (
    <div className="app-layout">
      {/* Background Layers */}
      <div className="night-sky"></div>
      <div className="stars-overlay"></div>
      <div className="moon"></div>

      <div className="app-container">
        <Navbar
          search={search}
          setSearch={setSearch}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onHomeClick={handleHomeClick}
        />

        {activeTab === 'match' ? (
          <PersonalityQuiz onSelectMovie={(id) => setSelectedId(id)} />
        ) : (
          <>
            {/* Home Hero Banner */}
            {activeTab === 'all' && !search && (
              <>
                <section className="hero-banner">
                  <div className="hero-badge">
                    <Sparkles size={14} color="#38bdf8" /> Discover Unlimited Cinema
                  </div>
                  <h1 className="hero-title">
                    Welcome to <span className="highlight-text">Movies Search Place</span>
                  </h1>
                  <p className="hero-subtitle">
                    Explore top-rated film titles, browse trending collections, and unlock personalized recommendations tailored directly to your personal vibe.
                  </p>
                </section>

                {/* Category Pills */}
                <div className="category-bar">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <h2 className="section-title">
                  <Flame size={22} color="#ef4444" /> Trending & Essential Movies
                </h2>
              </>
            )}

            {activeTab === 'favorites' && (
              <h2 className="section-title">
                <Film size={22} color="#c084fc" /> My Watchlist ({favorites.length})
              </h2>
            )}

            {displayedMovies.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#9ca3af' }}>
                <h3>No movies found.</h3>
                <p>Try searching for titles like "Oppenheimer", "Dune", "Batman", or "Gladiator".</p>
              </div>
            ) : (
              <div className="movies-grid">
                {displayedMovies.map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    isFav={favorites.some((f) => f.imdbID === movie.imdbID)}
                    toggleFav={toggleFav}
                    onClick={(id) => setSelectedId(id)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {selectedId && <MovieModal id={selectedId} onClose={() => setSelectedId(null)} />}
      </div>

      <Footer />
    </div>
  );
}