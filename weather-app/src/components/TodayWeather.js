import React from "react";

const TodayWeather = ({ currentWeather }) => {
  if (!currentWeather) {
    return <p>Loading...</p>;
  }

  // 일출 및 일몰 시간 변환 (UTC -> 로컬 시간)
  const convertUnixToTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sunrise = convertUnixToTime(currentWeather.sys.sunrise); // 일출 시간
  const sunset = convertUnixToTime(currentWeather.sys.sunset); // 일몰 시간

  // 날씨 상태 아이콘 URL 생성
  const weatherIcon = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;

  // 강수 확률 (OpenWeatherMap의 rain 데이터에서 1시간 강수량)
  const rain = currentWeather.rain ? currentWeather.rain["1h"] || 0 : 0; // 1시간 강수량 (mm)

  return (
    <div className="w-full lg:w-3/4 bg-white bg-opacity-90 p-8 rounded-xl shadow-xl text-center mx-auto">
      {/* 도시 이름 */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        {currentWeather.name || "Unknown Location"}
      </h1>

      {/* 날씨 아이콘과 온도 */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-6">
        <img
          src={weatherIcon}
          alt={currentWeather.weather[0]?.main || "Weather icon"}
          className="w-28 h-28"
        />
        <div>
          <p className="text-7xl font-extrabold text-blue-600">
            {Math.round(currentWeather.main.temp - 273.15)}°C
          </p>
          <p className="text-lg capitalize text-gray-500 mt-2">
            {currentWeather.weather[0]?.main || "No description available"}
          </p>
        </div>
      </div>

      {/* 추가 정보 */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-600">체감 온도</p>
          <p className="text-xl font-semibold">
            {Math.round(currentWeather.main.feels_like - 273.15)}°C
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">습도</p>
          <p className="text-xl font-semibold">{currentWeather.main.humidity}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">풍속</p>
          <p className="text-xl font-semibold">{currentWeather.wind.speed} m/s</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">일출</p>
          <p className="text-xl font-semibold">{sunrise}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">일몰</p>
          <p className="text-xl font-semibold">{sunset}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">강수 확률</p>
          <p className="text-xl font-semibold">{rain > 0 ? `${rain} mm/h` : "없음"}</p>
        </div>
      </div>
    </div>
  );
};

export default TodayWeather;
