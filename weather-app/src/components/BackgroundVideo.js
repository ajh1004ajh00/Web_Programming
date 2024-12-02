import React from "react";

const BackgroundVideo = ({ currentWeather }) => {
  // currentWeather 객체에서 상태 확인
  const getVideoSource = (weatherData) => {
    if (!weatherData?.weather?.[0]?.main) return null;

    switch (weatherData.weather[0].main) {
      case "Rain":
        return "/assets/videos/rain.mp4";
      case "Clear":
        return "/assets/videos/rain.mp4";
      case "Snow":
        return "/assets/videos/rain.mp4";
      case "Clouds":
        return "/assets/videos/rain.mp4";
      default:
        return "/assets/videos/rain.mp4";
    }
  };

  const videoSource = getVideoSource(currentWeather);

  // 비디오가 없을 경우 아무것도 렌더링하지 않음
  if (!videoSource) return null;

  return (
    <div className="relative w-full aspect-w-16 aspect-h-16 overflow-hidden rounded-lg shadow-lg">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src={videoSource} type="video/mp4" />
      </video>
    </div>
  );
};

export default BackgroundVideo;