import React from 'react';
import { colors } from '../theme';

const LoadingSpinner = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      zIndex: 9999,
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        border: `4px solid ${colors.lightGray}`,
        borderRadius: '50%',
        borderTop: `4px solid ${colors.primary}`,
        animation: 'spin 1s linear infinite',
      }}></div>
      <div style={{
        marginTop: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: colors.primary,
      }}>
        Loading Khoj Yatri...
      </div>
      <div style={{
        marginTop: '10px',
        fontSize: '14px',
        color: colors.gray,
        textAlign: 'center',
        maxWidth: '300px',
      }}>
        Connecting to your location and group members
      </div>
    </div>
  );
};

export default LoadingSpinner;