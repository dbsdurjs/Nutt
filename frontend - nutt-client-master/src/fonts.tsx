import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Pretendard';
        font-weight: 900;
        font-display: swap;
        src: local('Pretendard Black'), url('./fonts/Pretendard/static/woff2Pretendard-Black.woff2') format('font-woff2'), url('./fonts/Pretendard/static/woff/Pretendard-Black.woff') format('woff');
      }
      
      @font-face {
        font-family: 'Pretendard';
        font-weight: 800;
        font-display: swap;
        src: local('Pretendard ExtraBold'), url('./fonts/Pretendard/static/woff2Pretendard-ExtraBold.woff2') format('font-woff2'), url('./fonts/Pretendard/static/woff/Pretendard-ExtraBold.woff') format('woff');
      }
      
      @font-face {
        font-family: 'Pretendard';
        font-weight: 700;
        font-display: swap;
        src: local('Pretendard Bold'), url('./fonts/Pretendard/static/woff2Pretendard-Bold.woff2') format('font-woff2'), url('./fonts/Pretendard/static/woff/Pretendard-Bold.woff') format('woff');
      }
      
      @font-face {
        font-family: 'Pretendard';
        font-weight: 600;
        font-display: swap;
        src: local('Pretendard SemiBold'), url('./fonts/Pretendard/static/woff2Pretendard-SemiBold.woff2') format('font-woff2'), url('./fonts/Pretendard/static/woff/Pretendard-SemiBold.woff') format('woff');
      }
      
      @font-face {
        font-family: 'Pretendard';
        font-weight: 500;
        font-display: swap;
        src: local('Pretendard Medium'), url('./fonts/Pretendard/static/woff2Pretendard-Medium.woff2') format('font-woff2'), url('./fonts/Pretendard/static/woff/Pretendard-Medium.woff') format('woff');
      }
      
      @font-face {
        font-family: 'Pretendard';
        font-weight: 400;
        font-display: swap;
        src: local('Pretendard Regular'), url('./fonts/Pretendard/static/woff2Pretendard-Regular.woff2') format('font-woff2'), url('./fonts/Pretendard/static/woff/Pretendard-Regular.woff') format('woff');
      }
      
      @font-face {
        font-family: 'Pretendard';
        font-weight: 300;
        font-display: swap;
        src: local('Pretendard Light'), url('./fonts/Pretendard/static/woff2Pretendard-Light.woff2') format('font-woff2'), url('./fonts/Pretendard/static/woff/Pretendard-Light.woff') format('woff');
      }
      
      @font-face {
        font-family: 'Pretendard';
        font-weight: 200;
        font-display: swap;
        src: local('Pretendard ExtraLight'), url('./fonts/Pretendard/static/woff2Pretendard-ExtraLight.woff2') format('font-woff2'), url('./fonts/Pretendard/static/woff/Pretendard-ExtraLight.woff') format('woff');
      }
      
      @font-face {
        font-family: 'Pretendard';
        font-weight: 100;
        font-display: swap;
        src: local('Pretendard Thin'), url('./fonts/Pretendard/static/woff2Pretendard-Thin.woff2') format('font-woff2'), url('./fonts/Pretendard/static/woff/Pretendard-Thin.woff') format('woff');
      }
      `}
  />
);

export default Fonts;
