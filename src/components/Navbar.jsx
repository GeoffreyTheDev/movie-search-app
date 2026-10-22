import React from 'react';
import { Popcorn, Search, Home, Sparkles, Bookmark } from 'lucide-react';

export default function Navbar({ search, setSearch, activeTab, setActiveTab, onHomeClick }) {
  return (
    <header className="header-bar">
      <div className="brand" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
        <Popcorn size={30} color="#8b5cf6" />
        <span>MoviesAndChill</span>
      </div>

      <div className="search-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search movies by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (activeTab !== 'all') setActiveTab('all');
          }}
        />
      </div>

      <nav className="nav-tabs">
        <button
          className={`tab-btn ${activeTab === 'all' && !search ? 'active' : ''}`}
          onClick={onHomeClick}
        >
          <Home size={16} /> Home
        </button>
        <button
          className={`tab-btn ${activeTab === 'match' ? 'active' : ''}`}
          onClick={() => setActiveTab('match')}
        >
          <Sparkles size={16} color="#06b6d4" /> Vibe Matcher
        </button>
        <button
          className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          <Bookmark size={16} /> Watchlist
        </button>
      </nav>
    </header>
  );
}