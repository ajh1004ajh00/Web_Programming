import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BackgroundVideo from "./components/BackgroundVideo";
import TodayWeather from "./components/TodayWeather";
import HourlyForecast from "./components/HourlyForecast";
import WeeklyForecast from "./components/WeeklyForecast";
import ChatBot from "./components/ChatBot";
import Settings from "./components/Settings";
import DailyWeatherAdvice from "./components/DailyWeatherAdvice";
import { processWeatherData } from "./components/processWeatherData";

const App = () => {
  // 상태 관리: 날씨 데이터, 도시, 비디오 소스, 날짜 등
  const [currentWeather, setCurrentWeather] = useState(null); // 현재 날씨 데이터
  const [hourlyWeather, setHourlyWeather] = useState([]);  // 시간별 예보 상태
  const [weeklyWeather, setWeeklyWeather] = useState([]); // 주간 예보 
  const [processedWeatherData, setProcessedWeatherData] = useState(null); // 가공된 데이터
  const [city, setCity] = useState("Seoul"); //기본 도시 설정
  const [videoSource, setVideoSource] = useState("/assets/videos/clear.mp4"); // 배경 비디오 소스
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜

  // 날씨 데이터 가져오기
  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const lang = "kr";
      try {
        // 현재 날씨 데이터 가져오기
        const currentResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=${lang}`
        );
        const currentData = await currentResponse.json();
        setCurrentWeather(currentData);

        // 시간별 예보 데이터 가져오기
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=${lang}`
        );
        const forecastData = await forecastResponse.json(); // 예보 데이터 가져오기

        setHourlyWeather(forecastData.list.slice(0, 8)); // 초기 시간별 예보 설정

        // 주간 예보 데이터 그룹화
        const groupedByDate = forecastData.list.reduce((acc, item) => {
          const date = item.dt_txt.split(" ")[0]; // 날짜 부분만 추출
          if (!acc[date]) acc[date] = []; // 날짜별로 배열 생성
          acc[date].push(item); // 날짜별로 그룹화
          return acc;
        }, {});

        // 주간 예보 데이터 생성
        const dailyForecast = Object.keys(groupedByDate).map((date) => {
          const dayData = groupedByDate[date]; // 날짜별 데이터
          const temperatures = dayData.map((entry) => entry.main.temp);
          const maxTemp = Math.max(...temperatures);
          const minTemp = Math.min(...temperatures);

          // 날짜, 최고/최저 기온, 날씨 정보 반환
          return {
            date,
            maxTemp,
            minTemp,
            weather: dayData[0].weather[0],
          };
        });

        // 주간 예보 상태 업데이트
        setWeeklyWeather(dailyForecast.slice(0, 5));

        // 가공된 데이터 생성
        const processedData = processWeatherData(currentData, forecastData.list);
        setProcessedWeatherData(processedData); // 가공된 데이터 상태 업데이트
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [city]); // city가 변경될 때마다 실행

  // 선택된 날짜가 있을 경우 해당 날짜의 시간별 예보를 가져오기
  useEffect(() => {
    if (!selectedDate) return; // 날짜가 없으면 실행하지 않음

    // 시간별 예보 데이터 가져오기
    const fetchHourlyForecast = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const lang = "kr";
      try {

        // 시간별 예보 데이터 가져오기
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=${lang}`
        );
        const forecastData = await forecastResponse.json(); // 예보 데이터 가져오기
        const selectedDayForecast = forecastData.list.filter(
          (item) => item.dt_txt.split(" ")[0] === selectedDate // 선택된 날짜에 해당하는 데이터 필터링
        );
        setHourlyWeather(selectedDayForecast); // 해당 날짜에 맞는 예보로 업데이트
      } catch (error) {
        console.error("Error fetching hourly weather data:", error);
      }
    };

    fetchHourlyForecast();
  }, [selectedDate, city]); // selectedDate가 변경될 때마다 실행

  return (
    // react-router-dom을 사용하여 /home, /characters, /settings의 경로를 처리합니다.
    <Router>
      <div className="bg-gradient-to-b from-blue-400 to-blue-200 min-h-screen p-4 lg:px-6 flex flex-col items-center">
        {/* 네비게이션 바*/}
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
              챗봇
            </Link>
            <Link
              to="/settings"
              className="text-lg font-semibold text-white hover:text-gray-200 transition duration-300"
            >
              설정
            </Link>
          </div>
        </nav>
        {/* 라우트 처리 */}

        <div className="mt-20 w-full lg:max-w-5xl mx-auto">
          <Routes>
            {/* 홈 화면*/}
            <Route
              path="/"
              element={
                <>
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 w-full mt-6">
                    <div className="w-full lg:w-2/5">
                      <div className="relative w-full aspect-w-16 aspect-h-0 overflow-hidden rounded-lg shadow-lg">
                        <BackgroundVideo //날씨에 맞는 비디오 표시
                          currentWeather={currentWeather}
                          videoSource={videoSource} // videoSource 전달
                          setVideoSource={setVideoSource} // setVideoSource 전달
                        />
                      </div>
                    </div>

                    <TodayWeather // 현재 날씨 표시
                     currentWeather={currentWeather}
                      />
                  </div>
                  <WeeklyForecast // 주간 예보 표시
                    weeklyWeather={weeklyWeather}
                    setSelectedDate={setSelectedDate} // 날짜 선택 함수 전달
                  />
                  <HourlyForecast //시간별 예보 표시 
                  hourlyWeather={hourlyWeather} 
                  />
                  <DailyWeatherAdvice //날씨 조언 표시
                  hourlyWeather={hourlyWeather} 
                  />
                </>
              }
            />
            

            {/* 캐릭터 */}
            <Route
              path="/characters"
              element={
                <ChatBot //챗봇 추가 기능
                  currentWeather={currentWeather}
                  weeklyForecast={weeklyWeather}
                  processedWeatherData={processedWeatherData}
                />
              }
            />
            {/* 설정 */}
            <Route
              path="/settings" // 설정 페이지
              element={<Settings setCity={setCity} setVideoSource={setVideoSource} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
