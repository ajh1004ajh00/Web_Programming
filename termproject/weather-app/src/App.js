import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WeatherInfo from './components/WeatherInfo.js';
import BackgroundVideo from './components/BackgroundVideo';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Seoul');

  const fetchWeatherData = async () => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await response.json();
    setWeatherData(data);
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  return (
    <div className="relative h-screen">
      <Header />
      {weatherData && (
        <>
          <BackgroundVideo condition={weatherData.weather[0].main} />
          <WeatherInfo data={weatherData} />
        </>
      )}
    </div>
  );
};

export default App;
