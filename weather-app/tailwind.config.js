/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // src 디렉토리의 React 파일 스캔
  ],
  extend: {},
  plugins: [require('@tailwindcss/aspect-ratio')],
};
