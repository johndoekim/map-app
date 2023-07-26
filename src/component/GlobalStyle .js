import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard Variable';
    src: local('Pretendard Variable'),
         url('./font/PretendardVariable.woff2') format('woff2');
    font-weight: 100 900;
    font-display: swap;
  }

  body {
    font-family: 'Pretendard Variable', 'Noto Sans KR', sans-serif;
    word-break: keep-all;
  }
`;

export default GlobalStyle;
