import React, { useState, useEffect, useRef } from "react";
import "./ChatBot.css";

const ChatBot = ({ processedWeatherData }) => {
  // 대화 상태: 초기 상태로 시스템 메시지를 설정
  const [messages, setMessages] = useState([{
    role: "system",
    content: 
      "안녕! 나는 날씨를 알려주는 정령 '즌다몬'인 것이다.\n" + 
      '날씨에 대해 궁금한 점이 있다면 무엇이든 물어보는 것이다!\n'
      },
]);
  const [userInput, setUserInput] = useState(""); // 사용자 입력
  const [emotion, setEmotion] = useState("neutral"); // 기본 키워드
  const messagesEndRef = useRef(null); // 스크롤 참조

  // 페르소나 정의
  const persona = `
    나는 명랑하고 친절한 날씨 정령 즌다몬인 것이다.
    나는 항상 "~인 것이다"라는 말투로 대화하는 것이다.
    내 역할은 사용자에게 날씨 정보를 바탕으로 즐겁고 유익한 대화를 나누는 것이다.
  `;

  useEffect(() => {
    // 새로운 메시지가 추가될 때마다 스크롤을 하단으로 이동
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 사용자 메시지 처리
  const handleSend = async () => {
    if (!userInput.trim()) return; // 빈 문자열이면 무시

    // 사용자 메시지를 즉시 메시지 상태에 추가
    const newMessages = [
      ...messages, // 이전 메시지 유지
      { role: "user", content: userInput },
    ];
    setMessages(newMessages); // 메시지 업데이트

    setUserInput(""); // 입력 초기화

    // 사용자 메시지를 기반으로 챗봇 응답 생성
    const botResponse = await generateBotResponse(userInput, processedWeatherData, persona);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "bot", content: botResponse.content },
    ]);

    setEmotion(botResponse.emotion); // 감정 업데이트
    setUserInput(""); // 입력 프롬프트 창 초기화
  };

  // Enter 키로 입력 이벤트 처리
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend(); // 메시지 전송
    }
  };

  // 챗봇 응답 생성
  const generateBotResponse = async (input, weatherData, persona) => {
    try {
      // 날씨 데이터에서 오늘과 예보 정보 추출
      const { today, forecast } = weatherData;

      // 오늘 날짜
      const todayDate = today.date;

      // 시간별 날씨 설명 생성
      const hourlyWeatherDescription = today.hourlyData.map((item) => (
        `시간: ${item.time}, 기온: ${item.temperature}°C, 상태: ${item.description}`
      )).join('\n');

      // 5일 예보 설명 생성
      const forecastDescription = forecast.map((day) => (
        `날짜: ${day.date}, 최고 기온: ${day.maxTemp}°C, 최저 기온: ${day.minTemp}°C, 상태: ${day.description}`
      )).join('\n');

      // 수정된 시스템 메시지
      const systemMessage = `
        ${persona}
        오늘은 ${todayDate}인 것이다.
        아래 정보를 참고하여 사용자와 대화하는 것이다:
        오늘 하루의 시간별 날씨:
        ${hourlyWeatherDescription}
        5일 예보:
        ${forecastDescription}
        **중요**: 반드시 **응답의 마지막에** 해당하는 감정 키워드 중 하나를 **괄호 안에 포함**하는 것이다: (neutral), (cold), (hot), (rainy), (cloudy), (snowy).
        예시: "오늘은 맑은 날씨인 것이다. (neutral)"
      `;

      // API 호출
      const response = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: input },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API 응답 오류: ${response.status}`);
      }

      const data = await response.json(); // JSON 데이터로 변환

      // 감정 키워드 추출
      const matchEmotion = data.content.match(/\((neutral|cold|hot|rainy|cloudy|snowy)\)$/i);
      const detectedEmotion = matchEmotion ? matchEmotion[1].toLowerCase() : "neutral"; // 감정 키워드가 없으면 중립으로 설정

      // 응답에서 감정 키워드 제거
      const content = data.content.replace(/\s*\((neutral|cold|hot|rainy|cloudy|snowy)\)$/i, '').trim();

      // 응답과 감정 반환
      return {
        content,
        emotion: detectedEmotion,
      };
    } catch (error) {
      console.error("Error generating bot response:", error);
      return { content: "죄송합니다. 현재 응답을 생성할 수 없는 것이다.", emotion: "neutral" };
    }
  };

  // 캐릭터 이미지 경로 매핑
  const getCharacterImage = () => {
    const imageMap = {
      neutral: "/assets/characters/neutral.png",
      cold: "/assets/characters/cold.png",
      hot: "/assets/characters/hot.png",
      rainy: "/assets/characters/rainy.png",
      cloudy: "/assets/characters/cloudy.png",
      snowy: "/assets/characters/snowy.png",
    };
    return imageMap[emotion] || imageMap["neutral"];
  };

  // 챗봇 컴포넌트 렌더링
  return (
    <div className="chatbot-container">
  {/* 상단 헤더 */}
    <div className="chatbot-header">
        <h2 className="text-blue-700">캐릭터와 대화하기</h2>
        <p className="text-gray-600">
        이 화면에서는 날씨를 기반으로 캐릭터와 대화할 수 있습니다.
        </p>
    </div>
    {/* 캐릭터 이미지 */}
      <div className="character-container">
        <img
          src={getCharacterImage()}
          alt="캐릭터"
          className="character-image"
        />
      </div>

      {/* 대화 상자 파트 */}
      <div className="dialogue-box">
        <div className="dialogue-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.role === "user" ? "user" : "bot"}`}
            >
              {message.content}
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* 스크롤 위치 참조 */}
        </div>

        {/* 입력 창(프롬프트) */}
        <div className="dialogue-input">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown} // Enter 키 이벤트 처리
            placeholder="여기에 입력하세요..."
            className="dialogue-text-input"
          />
          <button onClick={handleSend} className="dialogue-send-button">
            보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
