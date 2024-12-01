import React from 'react';

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

  return (
    <video
      className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      autoPlay
      loop
      muted
    >
      <source src={getVideoSource(condition)} type="video/mp4" />
    </video>
  );
};

export default BackgroundVideo;
