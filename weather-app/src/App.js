import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import BackgroundVideo from "./components/BackgroundVideo";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [city] = useState("Seoul");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      try {
        const currentResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        const currentData = await currentResponse.json();
        console.log("Current Weather Data:", currentData); // 구조 확인
        setCurrentWeather(currentData);
  
        const hourlyResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        );
        const hourlyData = await hourlyResponse.json();
        console.log("Hourly Forecast Data:", hourlyData); // 구조 확인
        setHourlyWeather(hourlyData.list.slice(0, 8));
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
  
    fetchWeatherData();
  }, [city]);
  
  return (
    <div className="bg-gradient-to-b from-blue-500 to-blue-200 min-h-screen p-4 lg:px-6 flex flex-col items-center">
      <Header />

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 w-full max-w-6xl mt-6">
        {/* 애니메이션 */}
        <div className="w-full lg:w-2/5">
          {currentWeather?.weather?.[0]?.main && (
            <div className="relative w-full h-64 lg:h-96 rounded-lg overflow-hidden shadow-lg">
              <BackgroundVideo condition={currentWeather.weather[0].main} />
            </div>
          )}
        </div>

        {/* 오늘의 날씨 */}
        <div className="w-full lg:w-1/2 bg-white bg-opacity-90 p-20 rounded-xl shadow-xl text-center">
          {currentWeather ? (
            <>
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
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      {/* 시간별 예보 */}
      <div className="w-full max-w-6xl bg-white bg-opacity-90 p-6 rounded-xl shadow-xl mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">시간별 예보</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {hourlyWeather.map((hour, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-md text-center"
            >
              <p className="text-md font-semibold text-gray-700">
                {new Date(hour.dt_txt).getHours()}시
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(hour.main.temp - 273.15)}°C
              </p>
              <p className="text-sm text-gray-500">
                강수: {Math.round(hour.pop * 100)}%
              </p>
              <p className="text-sm text-gray-500">
                바람: {hour.wind.speed} m/s
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;