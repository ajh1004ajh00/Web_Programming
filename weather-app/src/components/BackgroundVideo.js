import React from "react";

const BackgroundVideo = ({ currentWeather, videoSource, setVideoSource }) => {

  // 날씨에 따라 적합한 비디오 소스를 반환하는 함수
  const getVideoSource = (weatherData) => {

    // 날씨 데이터가 없으면 기본값 clear 반환
    if (!weatherData?.weather?.[0]?.main) return "/assets/videos/clear.mp4"; // 기본값

    switch (weatherData.weather[0].main) {
      case "Rain": // 비
        return "/assets/videos/rain.mp4";
      case "Clear": // 맑음
        return "/assets/videos/clear.mp4";
      case "Snow": // 눈
        return "/assets/videos/snow.mp4";
      case "Clouds": // 구름
        return "/assets/videos/clouds.mp4";
      default: // 기본값
        return "/assets/videos/clear.mp4";
    }
  };

  return (
    <div
      className="relative w-full aspect-w-16 aspect-h-16 overflow-hidden rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-500"
    >
      {/* 어두운 오버레이 효과 */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 transition-all duration-500 hover:bg-opacity-60 rounded-lg"></div>
      
      {/* 비디오 플레이어 */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 ease-in-out hover:scale-105 hover:brightness-75 hover:blur-sm"
        autoPlay // 자동 재생
        loop // 반복 재생
        muted // 음소거 없어도 됨
      >
        {/* 비디오 소스 */}
        <source src={videoSource} type="video/mp4" />
      </video>
    </div>
  );
};

export default BackgroundVideo;
