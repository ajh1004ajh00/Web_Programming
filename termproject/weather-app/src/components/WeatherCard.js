import React, { useState, useEffect } from 'react';

const WeatherCard = () => {
  return (
    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Seoul</h1>
      <p className="text-2xl">8°C</p>
      <p className="text-lg">overcast clouds</p>
      <div className="flex justify-between mt-4">
        <div>
          <p className="text-sm text-gray-200">습도</p>
          <p>87%</p>
        </div>
        <div>
          <p className="text-sm text-gray-200">풍속</p>
          <p>3.09 m/s</p>
        </div>
      </div>
    </div>
  );
};


export default WeatherCard;
