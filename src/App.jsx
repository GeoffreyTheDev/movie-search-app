import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import PersonalityQuiz from './components/PersonalityQuiz';
import Footer from './components/Footer';
import { fetchMovies } from './services/api';

const CATEGORIES = ['All', 'Sci-Fi', 'Action', 'Drama', 'Comedy', 'Horror', 'Animation'];

export default function App() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'match', 'favorites'
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('moviesAndChill_favs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('moviesAndChill_favs', JSON.stringify(favorites));
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

  // Filter movies by category if selected
  const filteredMovies = movies.filter((m) => {
    if (selectedCategory === 'All') return true;
    return m.Genre && m.Genre.includes(selectedCategory);
  });

  const displayedMovies = activeTab === 'favorites' ? favorites : filteredMovies;

  return (
    <div className="app-layout">
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
            {/* Category Filter Pills */}
            {activeTab === 'all' && !search && (
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
            )}

            {displayedMovies.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#9ca3af' }}>
                <h3>No movies found.</h3>
                <p>Try searching for titles like "Interstellar", "Batman", or "Matrix".</p>
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