import React from 'react';
import { colors } from '../theme';

const Footer = () => {
  return (
    <footer
      style={{
        background: colors.darkBg,
        color: 'white',
        padding: '1rem',
        textAlign: 'center',
        fontSize: '0.9rem',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <p>
          Khoj Yatri - Find your people in crowded places
          <span style={{ margin: '0 8px' }}>•</span>
          <span className="animate-pulse" style={{ display: 'inline-block' }}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill={colors.primary} 
              width="16" 
              height="16"
              style={{ verticalAlign: 'middle', marginRight: '5px' }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Made with care
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;