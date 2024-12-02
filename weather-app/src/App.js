import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BackgroundVideo from "./components/BackgroundVideo";
import TodayWeather from "./components/TodayWeather";
import HourlyForecast from "./components/HourlyForecast";
import WeeklyForecast from "./components/WeeklyForecast";
import Characters from "./components/Characters";
import Settings from "./components/Settings";
import DailyWeatherAdvice from "./components/DailyWeatherAdvice";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [weeklyWeather, setWeeklyWeather] = useState([]);
  const [city, setCity] = useState("Seoul");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const lang = "kr";
      try {
        const currentResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=${lang}`
        );
        const currentData = await currentResponse.json();
        setCurrentWeather(currentData);

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=${lang}`
        );
        const forecastData = await forecastResponse.json();
        setHourlyWeather(forecastData.list.slice(0, 8));

        const groupedByDate = forecastData.list.reduce((acc, item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!acc[date]) acc[date] = [];
          acc[date].push(item);
          return acc;
        }, {});

        const dailyForecast = Object.keys(groupedByDate).map((date) => {
          const dayData = groupedByDate[date];
          const temperatures = dayData.map((entry) => entry.main.temp);
          const maxTemp = Math.max(...temperatures);
          const minTemp = Math.min(...temperatures);

          return {
            date,
            maxTemp,
            minTemp,
            weather: dayData[0].weather[0],
          };
        });

        setWeeklyWeather(dailyForecast.slice(0, 5));
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [city]);

  return (
    <Router>
      <div className="bg-gradient-to-b from-blue-400 to-blue-200 min-h-screen p-4 lg:px-6 flex flex-col items-center">
        <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl p-4 bg-blue-600 shadow-md z-20 flex justify-between items-center rounded-b-lg">
          <Link
            to="/"
            className="text-3xl font-bold text-white hover:text-gray-200 transition duration-300"
          >
            오늘의 날씨
          </Link>
          <div className="flex gap-6">
            <Link
              to="/characters"
              className="text-lg font-semibold text-white hover:text-gray-200 transition duration-300"
            >
              캐릭터
            </Link>
            <Link
              to="/settings"
              className="text-lg font-semibold text-white hover:text-gray-200 transition duration-300"
            >
              설정
            </Link>
          </div>
        </nav>


        <div className="mt-20 w-full lg:max-w-5xl mx-auto">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 w-full mt-6">
                    <div className="w-full lg:w-2/5">
                      <div className="relative w-full aspect-w-16 aspect-h-0 overflow-hidden rounded-lg shadow-lg">
                        <BackgroundVideo currentWeather={currentWeather} />
                      </div>
                    </div>

                    <TodayWeather currentWeather={currentWeather} />
                  </div>

                  <HourlyForecast hourlyWeather={hourlyWeather} />

                  <WeeklyForecast weeklyWeather={weeklyWeather} />

                  <DailyWeatherAdvice hourlyWeather={hourlyWeather} />
                </>
              }
            />
            <Route path="/characters" element={<Characters />} />
            <Route path="/settings" element={<Settings setCity={setCity} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
