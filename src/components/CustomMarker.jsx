import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { colors } from '../theme';
import './MapStyles.css';

const createCustomIcon = (isCurrentUser, name) => {
  // Create a custom icon with different colors for current user vs others
  const markerHtmlStyles = `
    background-color: ${isCurrentUser ? colors.primary : colors.secondary};
    width: 2rem;
    height: 2rem;
    display: block;
    left: -1rem;
    top: -1rem;
    position: relative;
    border-radius: 2rem 2rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF;
    box-shadow: 0 0 8px rgba(0,0,0,0.3);
  `;

  const pulseStyles = `
    background-color: ${isCurrentUser ? colors.primary : colors.secondary};
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    position: absolute;
    left: -1rem;
    top: -1rem;
    animation: pulse 1.5s infinite;
    opacity: 0.6;
  `;

  const nameStyles = `
    position: absolute;
    width: 100px;
    text-align: center;
    left: -50px;
    bottom: -25px;
    font-size: 12px;
    font-weight: bold;
    color: #333;
    text-shadow: 1px 1px 1px white;
    pointer-events: none;
  `;

  return L.divIcon({
    className: 'custom-marker',
    iconAnchor: [0, 24],
    popupAnchor: [0, -36],
    html: `
      <div style="${pulseStyles}"></div>
      <div style="${markerHtmlStyles}"></div>
      ${isCurrentUser ? `<div style="${nameStyles}">You</div>` : ''}
    `
  });
};

const CustomMarker = ({ position, name, isCurrentUser }) => {
  if (!position || !position.lat || !position.lng) return null;
  
  return (
    <Marker 
      position={[position.lat, position.lng]} 
      icon={createCustomIcon(isCurrentUser, name)}
    >
      <Popup>
        <div className="custom-popup">
          <div style={{ 
            backgroundColor: isCurrentUser ? colors.primary : colors.secondary,
            color: 'white',
            padding: '8px 12px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            {isCurrentUser ? 'Your Location' : name}
          </div>
          <div style={{ padding: '8px 12px' }}>
            <p style={{ margin: '0 0 5px 0', fontSize: '12px' }}>
              <strong>Lat:</strong> {position.lat.toFixed(6)}
            </p>
            <p style={{ margin: '0', fontSize: '12px' }}>
              <strong>Lng:</strong> {position.lng.toFixed(6)}
            </p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default CustomMarker;