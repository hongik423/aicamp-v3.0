/**
 * PostCSS 설정 (CommonJS)
 * Next.js 13/14 개발 서버에서 Tailwind 지시어(@tailwind)가 파싱되지 않는 이슈를 방지합니다.
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};


