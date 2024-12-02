import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import BackgroundVideo from "./components/BackgroundVideo";
import TodayWeather from "./components/TodayWeather";
import HourlyForecast from "./components/HourlyForecast";
import WeeklyForecast from "./components/WeeklyForecast";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [weeklyWeather, setWeeklyWeather] = useState([]); // 5일 예보 데이터
  const [city] = useState("Seoul");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const lang = "kr";
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

        setHourlyWeather(forecastData.list.slice(0, 8)); // 상위 8개 데이터 (24시간)
  
        // 5일 예보 데이터를 날짜별로 그룹화
        const groupedByDate = forecastData.list.reduce((acc, item) => {
          const date = item.dt_txt.split(" ")[0]; // 날짜만 추출
          if (!acc[date]) acc[date] = [];
          acc[date].push(item);
          return acc;
        }, {});
  
        // 날짜별 최고/최저 온도를 계산하고 대표 날씨를 설정
        const dailyForecast = Object.keys(groupedByDate).map((date) => {
          const dayData = groupedByDate[date];
          const temperatures = dayData.map((entry) => entry.main.temp);
          const maxTemp = Math.max(...temperatures);
          const minTemp = Math.min(...temperatures);
  
          return {
            date,
            maxTemp,
            minTemp,
            weather: dayData[0].weather[0], // 첫 번째 시간대의 날씨 데이터 사용
          };
        });
  
        setWeeklyWeather(dailyForecast.slice(0, 5)); // 상위 5일 데이터만 사용
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
        <div className="relative w-full aspect-w-16 aspect-h-0 overflow-hidden rounded-lg shadow-lg">
            <BackgroundVideo currentWeather={currentWeather} />
          </div>
        </div>

        {/* 오늘의 날씨 */}
        <TodayWeather currentWeather={currentWeather} />
      </div>

      {/* 시간별 예보 */}
      <HourlyForecast hourlyWeather={hourlyWeather} />

      {/* 주간 예보 */}
      <WeeklyForecast weeklyWeather={weeklyWeather} />
    </div>
  );
};

export default App;
