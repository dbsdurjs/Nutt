## Tech Stack

- Language: HTML, CSS, TypeScript
- Library: React, Redux, Axios, Chakra UI, Tensorflow
- Server: Linux, Docker

### Using Basic Method

1. [`Node.js 16.20.2`](https://nodejs.org/ko/download/releases) 설치
2. `.env.template` 파일명을 `.env`로 변경
3. `.env` 수정

   _예시:_

   ```
   REACT_APP_OPENAI_API_KEY=sk-abc123def456ghi789jkl012mno345pqr678stu9vwx0yz
   REACT_APP_NUTT_API_URL=https://api.nutt.app
   REACT_APP_PHOTO_DETECTION_URL=https://detection.nutt.app
   ```

4. 프로덕션을 위한 빌드 스크립트 실행

   ```
   npm run build
   ```
