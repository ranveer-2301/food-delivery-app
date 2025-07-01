import React from 'react';

const FloatingParticle = ({ count = 40 }) => {
  const particles = Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 2 + 2, 
  }));

  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none z-0'>
      {particles.map((p, i) => (
        <div
          key={i}
          className='absolute w-1 h-1 bg-amber-400/40 rounded-full animate-floating'
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            animationDuration: `float ${p.duration}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticle;
