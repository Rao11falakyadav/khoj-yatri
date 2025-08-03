import React from 'react';
import { colors } from '../theme';

const MapStats = ({ members, roomId }) => {
  const onlineMembers = members.filter(m => m.lat && m.lng).length;
  const totalMembers = members.length;
  
  const handleShareRoom = () => {
    // Create share data
    const shareData = {
      title: 'Join my Khoj Yatri room',
      text: `Join me on Khoj Yatri with room code: ${roomId}`,
      url: window.location.href
    };

    // Use Web Share API if available
    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData)
        .catch(err => {
          console.error('Error sharing:', err);
          // Fallback to copying to clipboard
          copyToClipboard();
        });
    } else {
      // Fallback to copying to clipboard
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    const text = `Join me on Khoj Yatri with room code: ${roomId}\nURL: ${window.location.href}`;
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Room details copied to clipboard! Share it with your friends.');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        alert(`Room code: ${roomId}`);
      });
  };
  
  return (
    <div className="map-stats animate-fade-in" style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '8px',
      padding: '10px 15px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '250px',
      backdropFilter: 'blur(5px)',
      border: `1px solid ${colors.lightGray}`
    }}>
      <div style={{ marginBottom: '5px', fontWeight: 'bold', color: colors.dark }}>
        Room: <span style={{ color: colors.primary }}>{roomId}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <div style={{ 
          width: '10px', 
          height: '10px', 
          borderRadius: '50%', 
          backgroundColor: colors.success,
          marginRight: '8px'
        }}></div>
        <span style={{ fontSize: '14px', color: colors.dark }}>
          {onlineMembers} of {totalMembers} members online
        </span>
      </div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '8px'
      }}>
        <div style={{ fontSize: '12px', color: colors.gray }}>
          Share room code with others
        </div>
        <button 
          onClick={handleShareRoom}
          style={{
            backgroundColor: colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.2s ease'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          Share
        </button>
      </div>
    </div>
  );
};

export default MapStats;