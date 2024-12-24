import React from "react";

const WeeklyForecast = ({ weeklyWeather, setSelectedDate }) => {
  if (!weeklyWeather || weeklyWeather.length === 0) {
    return <p className="text-center text-gray-600">일주일 예보 데이터를 로드 중...</p>;
  }

  // 날짜 클릭 시 해당 날짜로 설정
  const handleDateClick = (date) => {
    setSelectedDate(date); // 날짜 클릭 시 해당 날짜로 설정
  };

  return (
    <div className="w-full max-w-6xl bg-white bg-opacity-90 p-6 rounded-xl shadow-xl mt-6">
      {/* 제목 */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">5일 예보</h2>
      {/* 5일 예보 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {weeklyWeather.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(day.date)} // 날짜 클릭 시 handleDateClick 호출
            className="bg-blue-200 p-4 rounded-lg shadow-md text-center transition-all transform hover:scale-105 hover:bg-blue-300 hover:shadow-2xl hover:text-gray-900 duration-300"
          >

            {/* 날짜 및 요일 */}
            <p className="text-lg font-semibold text-gray-700">
              {new Date(day.date).toLocaleDateString("ko-KR", {
                weekday: "long", // 요일 표시
              })}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(day.date).toLocaleDateString("ko-KR")}
            </p>

            {/* 최고/최저 기온 */}
            <p className="text-lg font-bold text-blue-600">
              {Math.round(day.maxTemp - 273.15)}°C / {Math.round(day.minTemp - 273.15)}°C
            </p>
            <p className="text-sm capitalize text-gray-500 mt-2">
              {day.weather?.main || "No data"}
            </p>
            {/* 날씨 상태 및 아이콘 */}
            <img
              src={`http://openweathermap.org/img/wn/${day.weather?.icon}@2x.png`} // 날씨 상태 아이콘
              alt={day.weather?.description}
              className="mx-auto mt-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
