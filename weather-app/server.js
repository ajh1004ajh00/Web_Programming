const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");

const app = express();
const port = 3001; // 서버 포트

// Middleware 설정
app.use(cors()); //CORS 활성화로 프론트엔드에서 서버에 접근 가능하도록 설정
app.use(bodyParser.json()); // JSON 요청 본문을 파싱

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 환경 변수에 API 키 저장
});

app.post("/chat", async (req, res) => {
  const { messages } = req.body; // 프론트엔드에서 받은 메시지 배열
  try {

    // OpenAI API로 메시지 배열 전달
    const response = await openai.chat.completions.create({
      model: "gpt-4", // 사용하는 GPT 모델
      messages, // 메시지 배열
    });

    // OpenAI의 응답 중에서 필요한 부분만 프론트엔드로 반환
    res.json({
      content: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).send("Error processing request");
  }
});

// 서버 실행 NODE SERVER.JS를 통해 실행
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
