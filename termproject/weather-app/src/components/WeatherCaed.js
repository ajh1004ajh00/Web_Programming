import React, { useState, useEffect } from 'react';

const WeatherCard = () => {
  const [character, setCharacter] = useState('');

  useEffect(() => {
    const updateCharacter = () => {
      const width = window.innerWidth;
      if (width < 768) setCharacter('/assets/characters/pixelArt.png');
      else if (width < 1200) setCharacter('/assets/characters/pixelArt.png');
      else setCharacter('/assets/characters/pixelArt.png');
    };
    updateCharacter();
    window.addEventListener('resize', updateCharacter);
    return () => window.removeEventListener('resize', updateCharacter);
  }, []);

  return (
    <div className="absolute bottom-10 right-10">
      <img src={character} alt="Weather Character" className="w-24 h-24" />
    </div>
  );
};

export default WeatherCard;
