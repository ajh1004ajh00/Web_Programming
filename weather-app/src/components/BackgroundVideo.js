import React from 'react';
//import chan from '../css/weather.module.css';


const BackgroundVideo = ({ condition }) => {
  const getVideoSource = (condition) => {
    switch (condition) {
      case 'Rain':
        return '/assets/videos/rain.mp4';
      case 'Clear':
        return '/assets/videos/rain.mp4';
      case 'Snow':
        return '/assets/videos/rain.mp4';
      default:
        return '/assets/videos/rain.mp4';
    }
  };

  const videoSource = getVideoSource(condition);

  return (
    <video
      style={{ width: "50rem", height: "25rem" }}
      className="absolute top-4 left-4 object-cover z-10 rounded-lg shadow-md"
      autoPlay
      loop
      muted
    >
      <source src={getVideoSource(condition)} type="video/mp4" />
    </video>
  );
};

export default BackgroundVideo;
