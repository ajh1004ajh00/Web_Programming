import React, { useEffect, useState } from "react";

// 시간별 날씨 데이터를 기반으로 한 날씨 조언 컴포넌트
const DailyWeatherAdvice = ({ hourlyWeather }) => {
  const [advice, setAdvice] = useState({
    morning: "", // 아침 조언
    afternoon: "", // 점심 조언
    evening: "", // 저녁 조언
  });

  useEffect(() => {
    // 시간별 날씨 데이터가 없으면 조언을 종료
    if (!hourlyWeather || hourlyWeather.length === 0) return;

    // 각 시간별 날씨 데이터를 기반으로 한 조언 생성
    const generateAdvice = (timeData, timePeriod) => {
      if (!timeData || !timeData.weather || timeData.weather.length === 0) {
        return `오늘 ${timePeriod}의 기상 정보를 확인할 수 없습니다.`;
      }

      // 기상 데이터 분석
      const mainWeather = timeData.weather[0]?.main.toLowerCase(); // 날씨 상태
      const temperature = Math.round(timeData.main.temp - 273.15); // 화씨를 섭씨로 변환
      const rainChance = timeData.pop > 0.2; // 20% 이상 강수 확률
      const windSpeed = timeData.wind.speed; // 풍속

      let adviceText = `오늘 ${timePeriod} 날씨는 `;

      // 날씨 상태 설명
      const weatherDescriptions = {
        rain: "비가 내릴 예정입니다",
        snow: "눈이 올 가능성이 있습니다",
        thunderstorm: "천둥번개가 예상됩니다",
        clouds: "구름이 많아 흐린 날씨입니다",
        clear: "맑고 쾌청한 날씨입니다",
        drizzle: "이슬비가 내릴 예정입니다",
        mist: "안개가 낀 날씨입니다",
      };

      adviceText +=
        weatherDescriptions[mainWeather] ||
        "기상 정보를 확인할 수 없습니다.";

      adviceText += `, 기온은 약 ${temperature}°C 입니다. `;

      // 추가 조언
      if (mainWeather.includes("rain")) {
        adviceText += "우산을 꼭 챙기세요. ";
      } else if (mainWeather.includes("snow")) {
        adviceText += "추위에 대비해 따뜻하게 입으세요. ";
      } else if (mainWeather.includes("thunderstorm")) {
        adviceText += "실내에 머무르시는 것이 안전합니다. ";
      }

      if (rainChance) {
        adviceText += "강수 확률이 높으니 외출 시 우산 챙기세요. ";
      }

      if (temperature < 0) {
        adviceText += "기온이 매우 낮으니 방한 준비를 철저히 하세요. ";
      } else if (temperature > 30) {
        adviceText += "더운 날씨입니다. 수분 섭취를 충분히 하세요. ";
      }

      if (windSpeed > 5) {
        adviceText += "바람이 강하게 불 예정이니 주의하세요.";
      }

      return adviceText.trim();
    };

    // 아침, 점심, 저녁 시간대의 날씨 데이터 추출
    const morningData = hourlyWeather.find((item) =>
      new Date(item.dt_txt).getHours() >= 6 &&
      new Date(item.dt_txt).getHours() < 12
    );
    const afternoonData = hourlyWeather.find((item) =>
      new Date(item.dt_txt).getHours() >= 12 &&
      new Date(item.dt_txt).getHours() < 18
    );
    const eveningData = hourlyWeather.find((item) =>
      new Date(item.dt_txt).getHours() >= 18 &&
      new Date(item.dt_txt).getHours() <= 24
    );

    setAdvice({
      morning: morningData
        ? generateAdvice(morningData, "아침")
        : "아침 기상 데이터가 없습니다.",
      afternoon: afternoonData
        ? generateAdvice(afternoonData, "점심")
        : "점심 기상 데이터가 없습니다.",
      evening: eveningData
        ? generateAdvice(eveningData, "저녁")
        : "저녁 기상 데이터가 없습니다.",
    });
  }, [hourlyWeather]); // 시간별 날씨 데이터가 변경될 때마다 실행

  return (
    <div className="w-full bg-white bg-opacity-90 p-6 rounded-xl shadow-xl mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        오늘의 날씨 조언
      </h2>
      <div className="space-y-4">
        {/* 아침 조언 */}
        <div className="bg-blue-100 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <h3 className="text-xl font-semibold text-blue-600">아침</h3>
          <p className="text-gray-700">{advice.morning}</p>
        </div>
        {/* 점심 조언 */}
        <div className="bg-blue-100 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <h3 className="text-xl font-semibold text-blue-600">점심</h3>
          <p className="text-gray-700">{advice.afternoon}</p>
        </div>
        {/* 저녁 조언 */}
        <div className="bg-blue-100 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <h3 className="text-xl font-semibold text-blue-600">저녁</h3>
          <p className="text-gray-700">{advice.evening}</p>
        </div>
      </div>
    </div>
  );
};

export default DailyWeatherAdvice;