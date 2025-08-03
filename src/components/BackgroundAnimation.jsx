import React from 'react';
import { colors } from '../theme';

const BackgroundAnimation = () => {
  // Generate random positions for the background elements
  const generateElements = (count) => {
    const elements = [];
    for (let i = 0; i < count; i++) {
      elements.push({
        id: i,
        size: Math.random() * 30 + 10,
        x: Math.random() * 100,
        y: Math.random() * 100,
        animationDuration: Math.random() * 20 + 10,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
    return elements;
  };

  const elements = generateElements(15);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1,
      }}
    >
      {elements.map((element) => (
        <div
          key={element.id}
          style={{
            position: 'absolute',
            width: `${element.size}px`,
            height: `${element.size}px`,
            borderRadius: '50%',
            backgroundColor: colors.primary,
            opacity: element.opacity,
            left: `${element.x}%`,
            top: `${element.y}%`,
            animation: `float ${element.animationDuration}s infinite ease-in-out`,
          }}
        />
      ))}

      <style jsx="true">{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(10px, 10px) rotate(5deg);
          }
          50% {
            transform: translate(0, 20px) rotate(0deg);
          }
          75% {
            transform: translate(-10px, 10px) rotate(-5deg);
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default BackgroundAnimation;