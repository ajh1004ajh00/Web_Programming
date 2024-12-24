export const processWeatherData = (currentWeather, forecastData) => {
    if (!currentWeather || !forecastData) return null;
  
    // 현재 날짜 정보 가져오기
    const currentDateObj = new Date();
    const year = currentDateObj.getFullYear();
    const month = ('0' + (currentDateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDateObj.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
  
    // 오늘 날짜에 해당하는 예보 데이터 필터링
    const todayForecast = forecastData.filter((item) => item.dt_txt.startsWith(formattedDate));
  
    // 오늘의 시간별 날씨 데이터 가공
    const hourlyData = todayForecast.map((item) => ({
      time: item.dt_txt.split(' ')[1].slice(0, 5), // 시간 부분만 추출 (HH:MM)
      temperature: Math.round(item.main.temp - 273.15),
      description: item.weather[0].description,
      humidity: item.main.humidity, // 습도
      windSpeed: item.wind.speed,
    }));
  
    // 오늘 하루의 정보
    const todayWeather = {
      date: formattedDate,
      hourlyData: hourlyData,
    };
  
    // 5일 예보 가공
    const groupedByDate = forecastData.reduce((acc, item) => {
      const date = item.dt_txt.split(' ')[0]; // YYYY-MM-DD 형식의 날짜 추출
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});
  
    // 날짜별 최고/최저 기온, 날씨 정보 요약 생성
    const processedWeeklyForecast = Object.keys(groupedByDate).map((date) => {
      const dayData = groupedByDate[date];
      const temperatures = dayData.map((entry) => entry.main.temp);
      const maxTemp = Math.max(...temperatures);
      const minTemp = Math.min(...temperatures);
  
      return {
        date: date,
        maxTemp: Math.round(maxTemp - 273.15),
        minTemp: Math.round(minTemp - 273.15),
        description: dayData[0].weather[0].description,
      };
    });
  
    // 오늘 날씨와 5일 예보 반환
    return {
      today: todayWeather,
      forecast: processedWeeklyForecast,
    };
  };
  