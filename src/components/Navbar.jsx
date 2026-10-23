import React, { useState } from 'react';
import { Popcorn, Search, Home, Sparkles, Bookmark, User, Check } from 'lucide-react';

export default function Navbar({ search, setSearch, activeTab, setActiveTab, onHomeClick }) {
  const [userProfile, setUserProfile] = useState('GeoffreyTheDev');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="header-bar">
      {/* Brand Logo */}
      <div className="brand" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
        <Popcorn size={32} color="#c084fc" />
        <span>MoviesAndChill</span>
      </div>

      {/* Search Input */}
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

      {/* Navigation Tabs */}
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
          <Sparkles size={16} color="#38bdf8" /> Vibe Matcher
        </button>
        <button
          className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          <Bookmark size={16} /> Watchlist
        </button>
      </nav>

      {/* Profile & Guest Toggle */}
      <div style={{ position: 'relative' }}>
        <button
          className="user-profile-btn"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <User size={16} color="#c084fc" />
          <span>{userProfile}</span>
        </button>

        {showProfileMenu && (
          <div className="profile-dropdown">
            <div
              className={`profile-option ${userProfile === 'GeoffreyTheDev' ? 'active' : ''}`}
              onClick={() => {
                setUserProfile('GeoffreyTheDev');
                setShowProfileMenu(false);
              }}
            >
              <User size={14} /> GeoffreyTheDev (Admin)
              {userProfile === 'GeoffreyTheDev' && <Check size={14} color="#38bdf8" />}
            </div>
            <div
              className={`profile-option ${userProfile === 'Guest User' ? 'active' : ''}`}
              onClick={() => {
                setUserProfile('Guest User');
                setShowProfileMenu(false);
              }}
            >
              <User size={14} /> Guest User
              {userProfile === 'Guest User' && <Check size={14} color="#38bdf8" />}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}