import React, { useState, useEffect } from 'react';

const iconSun = '/images/icon-sun.svg';
const iconMoon = '/images/icon-moon.svg';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(
    () => {
      if (isDarkMode) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
      }
    },
    [isDarkMode]
  );

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <header>
      <h1 className="josefin-sans-700">TODO</h1>
      <button className="theme-toggle-button" onClick={toggleTheme}>
        <img
          src={isDarkMode ? iconSun : iconMoon}
          alt={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
        />
      </button>
    </header>
  );
};

export default Header;
