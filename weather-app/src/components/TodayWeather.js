import React from "react";

const TodayWeather = ({ currentWeather }) => {
  if (!currentWeather) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full lg:w-1/2 bg-white bg-opacity-90 p-6 rounded-xl shadow-xl text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {currentWeather.name || "Unknown Location"}
      </h1>
      <p className="text-7xl font-extrabold text-blue-600 mb-4">
        {Math.round(currentWeather.main.temp - 273.15)}°C
      </p>
      <p className="text-lg capitalize text-gray-500 mb-4">
        {currentWeather.weather[0]?.description || "No description available"}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">습도</p>
          <p className="text-xl font-semibold">{currentWeather.main.humidity}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">풍속</p>
          <p className="text-xl font-semibold">{currentWeather.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default TodayWeather;
