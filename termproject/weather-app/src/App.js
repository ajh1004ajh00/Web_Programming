import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import BackgroundVideo from "./components/BackgroundVideo";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [city] = useState("Seoul");

  const fetchWeatherData = async () => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    try {
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const currentData = await currentResponse.json();
      setCurrentWeather(currentData);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      );
      const forecastData = await forecastResponse.json();
      setHourlyWeather(forecastData.list.slice(0, 6)); // 상위 6개 데이터만 사용
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        const data = await response.json();
        setCurrentWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
  
    fetchWeatherData(); // 함수 호출
  }, [city]); // 의존성 배열에 city 포함

  return (
    <div className="bg-gradient-to-b from-blue-500 to-blue-200 min-h-screen flex flex-col items-center p-4">
      {/* Header */}
      <Header />

      {currentWeather && (
        <>
          {/* Background Video */}
          <BackgroundVideo condition={currentWeather.weather[0].main} />

          {/* 현재 날씨 정보 */}
          <section className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl text-center mb-8 w-full max-w-md">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {currentWeather.name}
            </h1>
            <p className="text-7xl font-extrabold text-blue-600 mb-4">
              {Math.round(currentWeather.main.temp - 273.15)}°C
            </p>
            <p className="text-lg capitalize text-gray-500">
              {currentWeather.weather[0].description}
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div>
                <p className="text-sm text-gray-600">습도</p>
                <p className="text-xl font-semibold">{currentWeather.main.humidity}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">풍속</p>
                <p className="text-xl font-semibold">{currentWeather.wind.speed} m/s</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">체감온도</p>
                <p className="text-xl font-semibold">
                  {Math.round(currentWeather.main.feels_like - 273.15)}°C
                </p>
              </div>
            </div>
          </section>
          <div className="bg-blue-500 text-white p-4">
            Tailwind CSS가 작동합니다!
          </div>

          {/* 시간별 예보 */}
          <section className="bg-white bg-opacity-90 p-6 rounded-xl shadow-xl w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              시간별 예보
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                    강수: {hour.pop * 100}%
                  </p>
                  <p className="text-sm text-gray-500">
                    바람: {hour.wind.speed} m/s
                  </p>
                </div>
                
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default App;
