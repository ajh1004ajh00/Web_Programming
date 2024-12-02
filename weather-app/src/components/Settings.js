import React, { useState } from "react";

const Settings = ({ setCity }) => {
  const [selectedCity, setSelectedCity] = useState("");

  const cities = [
    { name: "서울", value: "Seoul" },
    { name: "부산", value: "Busan" },
    { name: "대구", value: "Daegu" },
    { name: "인천", value: "Incheon" },
    { name: "광주", value: "Gwangju" },
    { name: "대전", value: "Daejeon" },
  ];

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const applySettings = () => {
    if (selectedCity) {
      setCity(selectedCity); // 선택한 도시를 설정
      alert("설정이 완료되었습니다!");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">설정</h2>
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-600 mb-2">
          지역 선택
        </label>
        <select
          value={selectedCity}
          onChange={handleCityChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        >
          <option value="">지역을 선택하세요</option>
          {cities.map((city) => (
            <option key={city.value} value={city.value}>
              {city.name}
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
  );
};

export default Settings;
