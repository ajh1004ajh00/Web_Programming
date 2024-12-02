import React from "react";

const HourlyForecast = ({ hourlyWeather }) => {
  return (
    <div className="w-full max-w-6xl bg-white bg-opacity-90 p-6 rounded-xl shadow-xl mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">시간별 예보</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {hourlyWeather.map((hour, index) => (
          <div
            key={index}
            className="bg-blue-200 p-4 rounded-lg shadow-md text-center"
          >
            {/* 시간 */}
            <p className="text-md font-semibold text-gray-700">
              {new Date(hour.dt_txt).getHours()}시
            </p>

            {/* 날씨 아이콘 */}
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt={hour.weather[0].main}
              className="mx-auto w-12 h-12"
            />

            {/* 온도 */}
            <p className="text-2xl font-bold text-blue-600">
              {Math.round(hour.main.temp - 273.15)}°C
            </p>

            {/* 강수 확률 */}
            <p className="text-sm text-gray-500">
              강수: {Math.round(hour.pop * 100)}%
            </p>

            {/* 바람 */}
            <p className="text-sm text-gray-500">
              바람: {hour.wind.speed} m/s
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
