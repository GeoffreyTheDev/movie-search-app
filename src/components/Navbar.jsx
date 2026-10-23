import React, { useState, useEffect } from 'react';
import { Popcorn, Search, Home, Sparkles, Bookmark, User, Check, Edit3 } from 'lucide-react';

export default function Navbar({ search, setSearch, activeTab, setActiveTab, onHomeClick }) {
  // Defaults to "Guest User" for any new visitor, and remembers their choice
  const [userProfile, setUserProfile] = useState(() => {
    return localStorage.getItem('movies_user_profile') || 'Guest User';
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [customNameInput, setCustomNameInput] = useState('');

  useEffect(() => {
    localStorage.setItem('movies_user_profile', userProfile);
  }, [userProfile]);

  const handleCustomNameSubmit = (e) => {
    e.preventDefault();
    if (customNameInput.trim()) {
      setUserProfile(customNameInput.trim());
      setIsEditing(false);
      setShowProfileMenu(false);
      setCustomNameInput('');
    }
  };

  return (
    <header className="header-bar">
      {/* Brand Logo */}
      <div className="brand" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
        <Popcorn size={32} color="#c084fc" />
        <span>Movies Search Place</span>
      </div>

      {/* Search Bar */}
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

      {/* Profile & Name Personalization Dropdown */}
      <div style={{ position: 'relative' }}>
        <button
          className="user-profile-btn"
          onClick={() => {
            setShowProfileMenu(!showProfileMenu);
            setIsEditing(false);
          }}
        >
          <User size={16} color="#c084fc" />
          <span>{userProfile}</span>
        </button>

        {showProfileMenu && (
          <div className="profile-dropdown">
            <div
              className={`profile-option ${userProfile === 'Guest User' ? 'active' : ''}`}
              onClick={() => {
                setUserProfile('Guest User');
                setShowProfileMenu(false);
              }}
            >
              <User size={14} /> Guest User (Default)
              {userProfile === 'Guest User' && <Check size={14} color="#38bdf8" />}
            </div>

            <div
              className={`profile-option ${userProfile === 'GeoffreyTheDev' ? 'active' : ''}`}
              onClick={() => {
                setUserProfile('GeoffreyTheDev');
                setShowProfileMenu(false);
              }}
            >
              <User size={14} /> GeoffreyTheDev (Creator)
              {userProfile === 'GeoffreyTheDev' && <Check size={14} color="#38bdf8" />}
            </div>

            {/* Custom Name Option */}
            {!isEditing ? (
              <div
                className="profile-option"
                onClick={() => setIsEditing(true)}
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: '#38bdf8' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Edit3 size={14} /> Set Custom Name
                </span>
              </div>
            ) : (
              <form onSubmit={handleCustomNameSubmit} style={{ padding: '0.6rem 0.8rem' }}>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  value={customNameInput}
                  onChange={(e) => setCustomNameInput(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '6px',
                    border: '1px solid #8b5cf6',
                    background: '#0f0c1b',
                    color: '#fff',
                    fontSize: '0.82rem',
                    outline: 'none',
                    marginBottom: '0.4rem'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '0.35rem',
                    borderRadius: '6px',
                    background: '#8b5cf6',
                    border: 'none',
                    color: '#fff',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Save Name
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </header>
  );
}