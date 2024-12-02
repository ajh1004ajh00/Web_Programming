/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // src 디렉토리의 React 파일 스캔
  ],
  extend: {
    spacing: {
     // '41': '9.25rem', // 기존 w-40 (10rem)보다 약간 큰 크기
     // '42': '10.5rem',
    },
  },
  plugins: [],
};
