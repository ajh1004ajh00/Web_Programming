import React from 'react';

const WeatherInfo = ({ data }) => {
  const { name, main, weather } = data;
  const tempCelsius = Math.round(main.temp - 273.15);

  return (
    <div className="absolute bottom-10 left-10 bg-white bg-opacity-70 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-lg">{weather[0].description}</p>
      <p className="text-xl font-semibold mt-2">온도: {tempCelsius}°C</p>
      <p className="text-sm text-gray-600">습도: {main.humidity}%</p>
    </div>
  );
};

export default WeatherInfo;
