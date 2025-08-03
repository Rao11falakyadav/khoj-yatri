import React from 'react';
import { colors } from '../theme';

const MembersList = ({ members, username, onSelectMember, selectedMember }) => {
  return (
    <div className="members-list animate-fade-in" style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '8px',
      padding: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '250px',
      maxHeight: '300px',
      overflow: 'auto',
      backdropFilter: 'blur(5px)',
      border: `1px solid ${colors.lightGray}`
    }}>
      <h3 style={{ 
        margin: '0 0 10px 0', 
        fontSize: '16px', 
        color: colors.dark,
        borderBottom: `1px solid ${colors.lightGray}`,
        paddingBottom: '5px'
      }}>
        Group Members
      </h3>
      <ul style={{ 
        listStyle: 'none', 
        padding: 0, 
        margin: 0 
      }}>
        {members.map(member => (
          <li key={member.name} 
            onClick={() => member.lat && member.lng && onSelectMember(member)}
            style={{
              padding: '8px',
              margin: '5px 0',
              borderRadius: '4px',
              backgroundColor: member.name === username 
                ? 'rgba(0, 0, 0, 0.05)' 
                : selectedMember && selectedMember.name === member.name 
                  ? `rgba(${parseInt(colors.secondary.slice(1, 3), 16)}, ${parseInt(colors.secondary.slice(3, 5), 16)}, ${parseInt(colors.secondary.slice(5, 7), 16)}, 0.2)` 
                  : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: member.lat && member.lng ? 'pointer' : 'default',
              transition: 'background-color 0.2s ease'
            }}>
            {selectedMember && selectedMember.name === member.name && member.name !== username && (
              <div style={{
                position: 'absolute',
                left: '-5px',
                width: '3px',
                height: '70%',
                backgroundColor: colors.secondary,
                borderRadius: '3px'
              }}></div>
            )}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: member.lat && member.lng ? colors.success : colors.error,
                marginRight: '8px'
              }}></div>
              <span style={{ 
                fontWeight: member.name === username ? 'bold' : 'normal',
                color: colors.dark
              }}>
                {member.name === username ? 'You' : member.name}
              </span>
            </div>
            <span style={{ 
              fontSize: '12px', 
              color: member.lat && member.lng ? colors.success : colors.error,
              fontWeight: '500'
            }}>
              {member.lat && member.lng ? 'Online' : 'Offline'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembersList;