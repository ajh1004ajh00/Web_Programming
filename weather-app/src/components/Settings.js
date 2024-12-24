import React, { useState } from "react";

const Settings = ({ setCity, setVideoSource }) => {
  const [selectedRegion, setSelectedRegion] = useState(""); // 선택된 지역
  const [selectedCity, setSelectedCity] = useState(""); // 선택된 도시
  const [selectedAnimation, setSelectedAnimation] = useState(""); // 선택된 애니메이션

  // 지역 및 도시 목록
  const regions = [
    { name: "한국", cities: [
      { name: "서울", value: "Seoul" },
      { name: "부산", value: "Busan" },
      { name: "대구", value: "Daegu" },
      { name: "인천", value: "Incheon" },
      { name: "광주", value: "Gwangju" },
      { name: "대전", value: "Daejeon" },
      { name: "천안", value: "Cheonan" },
    ]},
    { name: "해외", cities: [
      { name: "뉴욕", value: "New York" },
      { name: "파리", value: "Paris" },
      { name: "런던", value: "London" },
      { name: "도쿄", value: "Tokyo" },
      { name: "시드니", value: "Sydney" },
    ]}
  ];

  // 애니메이션 목록
  const animations = [
    { name: "맑은 날", value: "/assets/videos/clear.mp4" },
    { name: "비 오는 날", value: "/assets/videos/rain.mp4" },
    { name: "눈 오는 날", value: "/assets/videos/snow.mp4" },
    { name: "구름 낀 날", value: "/assets/videos/clouds.mp4" },
  ];

  // 지역 변경 이벤트 처리
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
    setSelectedCity(""); // 지역을 바꾸면 선택된 도시 초기화
  };

  // 도시 변경 이벤트 처리
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  // 애니메이션 변경 이벤트 처리
  const handleAnimationChange = (event) => {
    setSelectedAnimation(event.target.value);
    setVideoSource(event.target.value); // 애니메이션 변경 시 비디오 소스도 업데이트
  };

  // 설정 적용 완료
  const applySettings = () => {
    if (selectedCity || selectedAnimation) {
      if (selectedCity) setCity(selectedCity); // 선택한 도시 설정
      if (selectedAnimation) setVideoSource(selectedAnimation); // 선택한 애니메이션 설정
      alert("설정이 완료되었습니다!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">설정</h2>

        {/* 지역 설정 */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-600 mb-2">
            지역 선택
          </label>
          <select
            value={selectedRegion}
            onChange={handleRegionChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700"
          >
            <option value="">지역을 선택하세요</option>
            {regions.map((region) => (
              <option key={region.name} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        {/* 도시 선택 */}
        {selectedRegion && (
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-600 mb-2">
              도시 선택
            </label>
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-700"
            >
              <option value="">도시를 선택하세요</option>
              {regions
                .find((region) => region.name === selectedRegion)
                ?.cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* 애니메이션 설정 */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-600 mb-2">
            애니메이션 선택
          </label>
          <select
            value={selectedAnimation}
            onChange={handleAnimationChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700"
          >
            <option value="">애니메이션을 선택하세요</option>
            {animations.map((animation) => (
              <option key={animation.value} value={animation.value}>
                {animation.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={applySettings}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-800 transition duration-300"
        >
          설정 적용
        </button>
      </div>
    </div>
  );
};

export default Settings;
