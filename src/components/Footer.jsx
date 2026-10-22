import React from 'react';

export default function Footer() {
  return (
    <footer className="app-footer">
      <p>Developed with ❤️ by <strong>GeoffreyTheDev</strong></p>
      <p className="sub-text">© {new Date().getFullYear()} MoviesAndChill. All movie data powered by OMDb API.</p>
    </footer>
  );
}