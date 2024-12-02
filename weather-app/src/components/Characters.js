import React from "react";

const Characters = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">캐릭터 화면</h1>
      <p className="text-lg text-gray-600">날씨에 맞는 캐릭터를 만나보세요.</p>
      <div className="flex justify-center gap-4 mt-6">
        <img
          src="/assets/characters/sunny-character.png"
          alt="Sunny"
          className="w-32 h-32 rounded-full shadow-lg"
        />
        <img
          src="/assets/characters/rainy-character.png"
          alt="Rainy"
          className="w-32 h-32 rounded-full shadow-lg"
        />
      </div>
    </div>
  );
};

export default Characters;
